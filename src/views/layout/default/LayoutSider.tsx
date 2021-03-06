import type { Menu as MenuType } from "/@/router/types"
import { defineComponent, reactive, unref, computed, watch } from "vue"
import { Layout, Menu } from "ant-design-vue"
import { menuStore } from "/@/store/modules/menu"
import { useRouter } from "vue-router"
import config from "/@/config/"
import { MenuState } from "./type"
import router from "/@/router"
import { getMenus, getFlatMenus, getAllParentPathName, menuHasChildren } from "/@/utils/helper/menu"
import { ruleMap } from "/@/utils/regExp"
import MenuContent from "./MenuContent"

export default defineComponent({
  name: "DefaultLayoutSider",
  setup() {
    const { currentRoute } = useRouter()
    const menuItem: MenuType[] = getMenus()
    const menuState = reactive<Partial<MenuState>>({
      selectedKeys: [],
      mode: "inline",
      isAppMenu: true,
      openKeys: [],
      collapsedOpenKeys: []
    })

    // 处理点击菜单 -> 导航 跳转
    function handleMenuClick(menu: { key: string }) {
      const { key } = menu
      menuState.selectedKeys = [key]
      router.push({ name: key })
    }



    const getOpenKeys = computed(() => {
      return menuStore.getCollapsedState ? menuState.collapsedOpenKeys : menuState.openKeys
    })

    // 处理打开菜单
    function handleOpenChange(openKeys: string[]): void {
      if (!menuStore.getCollapsedState) {
        menuState.openKeys = openKeys
      } else {
        menuState.collapsedOpenKeys = openKeys
      }
    }

    // 处理点击菜单收缩
    function handleCollapseChange(collapsed: boolean) {
      menuStore.commitCollapsedState(collapsed)
    }

    // 处理菜单改变，拿到展开的子菜单
    function handleMenuChange() {
      const flatItems = getFlatMenus()
      const findMenu = flatItems.find((menu) => menu.name === unref(currentRoute).name)
      if (findMenu) {
        menuState.openKeys = getAllParentPathName(flatItems, findMenu.name as string)
        menuState.selectedKeys = [findMenu.name.replace(ruleMap.dataPage, "list-page")]
      }
    }

    watch(
      () => currentRoute.value.name,
      () => {
        handleMenuChange()
      }
    )

    // 渲染菜单
    function renderMenuItem(menuList?: MenuType[], index = 1) {
      if (!menuList) return
      return menuList.map((menu) => {
        const { title, name, hideInMenu, icon } = menu
        const showTitle = !menuStore.getCollapsedState
        // 不显示菜单
        if (hideInMenu) return

        // 没有子菜单
        if (!menuHasChildren(menu)) {
          return (
            <Menu.Item key={name as string} title={index === 1 && !showTitle ? title : ""}>
              {() => [
                <MenuContent icon={icon} level={index} title={title} showTitle={showTitle} />
              ]}
            </Menu.Item>
          )
        }
        return (
          <Menu.SubMenu key={name as string} class="layout-sider-menu-sub">
            {{
              title: () => [
                <MenuContent icon={icon} level={index} title={title} showTitle={showTitle} />
              ],
              default: () => renderMenuItem(menu.children, index + 1)
            }}
          </Menu.SubMenu>
        )
      })
    }

    // 渲染根菜单
    function renderMenu() {
      const { selectedKeys, mode, isAppMenu } = menuState
      return (
        <Menu
          mode={mode}
          theme={config.theme}
          inlineCollapsed={menuStore.getCollapsedState}
          onOpenChange={handleOpenChange}
          onClick={handleMenuClick}
          forceSubMenuRender={isAppMenu}
          selectedKeys={selectedKeys}
          openKeys={unref(getOpenKeys)}
          class="layout-sider-menu"
        >
          {{ default: () => renderMenuItem(menuItem) }}
        </Menu>
      )
    }

    handleMenuChange()

    return () => {
      const { getCollapsedState, getMenuWidthState, getCollapsedWidth } = menuStore
      return (
        <Layout.Sider
          collapsible
          breakpoint="md"
          collapsed={getCollapsedState}
          collapsedWidth={getCollapsedWidth}
          onCollapse={handleCollapseChange}
          trigger={null}
          theme={config.theme}
          width={getMenuWidthState}
          class="layout-sider"
        >
          {() => (
            <>
              <div class="layout-sider-header index-center-middle index-hidden-newline">
                <img src={config.logo} class="layout-sider-header-logo" />
                <div class={["layout-sider-header-title", getCollapsedState && "index-hidden"]}>
                  {config.title}
                </div>
              </div>
              <div>{renderMenu()}</div>
            </>
          )}
        </Layout.Sider>
      )
    }
  }
})
