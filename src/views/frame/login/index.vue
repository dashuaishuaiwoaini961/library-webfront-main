<template>
  <public-layout>
    <template #header>
      {{ loginContent.title }}
    </template>
    <template #left>
      <div class="qrcode-wrap">
        <img ref="qrcode">
      </div>
      <div class="login-main-left-footer">
        请使用微信扫描二维码登录
      </div>
    </template>
    <template #right>
      <div v-show="loginContent.type === 'account'">
        <account-login @on-change="loginTypeChange" />
      </div>
      <div v-show="loginContent.type === 'phone'">
        <phone-login @on-change="loginTypeChange" />
      </div>
    </template>
  </public-layout>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive } from "vue"
import publicLayout from "/@/views/frame/components/publicLayout.vue"
import accountLogin from "./account.vue"
import phoneLogin from "./phone.vue"
import config from "/@/config/"
import { toDataURL } from "qrcode"

// import useM essage from "@/hooks/web/useMessage";

export default defineComponent({
  name: "Login",
  components: { accountLogin, phoneLogin, publicLayout },
  setup() {
    const loginContent = reactive({ type: "account", title: `${config.shortTitle}账号登录` })
    const qrcode = ref<null | HTMLImageElement>(null)
    const renderValue = String("Hello world")
    const width = 160
    // const { notification } = useMessage.init();

    onMounted(async () => {
      const url = await toDataURL(renderValue, {
        width
      })
      qrcode.value!.src = url
    })

    // 账户登录改变
    const loginTypeChange = (value: string) => {
      if (value === "account") {
        loginContent.type = "phone"
        loginContent.title = "短信验证码登录"
      } else if (value === "phone") {
        loginContent.type = "account"
        loginContent.title = `${config.shortTitle}账号登录`
      }
    }

    return {
      qrcode,
      config,
      loginContent,
      loginTypeChange
    }
  }
})
</script>


<style lang="less" scoped>
@titleColor: #191919;

.login {
  min-width: 800px;

  &-title {
    padding: 80px 0 64px;
    font-size: 25.6px;
    color: @titleColor;
  }

  &-main {
    &-left-footer {
      margin: 50px 0 0;
      font-size: 12px;
      color: #838383;
      text-align: center;
    }
  }
}

.qrcode {
  &-wrap {
    width: 200px;
    height: 200px;
    padding: 20px;
    margin: 0 auto;
    background: #f7f7f7;
    border-radius: 8px;
  }
}
</style>
