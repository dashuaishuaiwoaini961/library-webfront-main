import type { AppRouteRecordRaw } from '/@/router/types'


export const LoginRoutes: AppRouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: (): unknown => import('/@/views/frame/login/index.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/login/choose-account',
    name: 'login-choose-account',
    component: (): unknown => import('/@/views/frame/login/choose-account/index.vue'),
    meta: {
      title: '选择登录帐号'

    }
  }
]

export const ResetPasswordRoute: AppRouteRecordRaw = {
  path: '/reset-password',
  name: 'reset-password',
  component: () => import('/@/views/frame/reset-password/index.vue'),
  meta: {
    ignoreTab: true
  }
}