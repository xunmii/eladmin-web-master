import store from '@/store'

export default {
  inserted(el, binding) {
    const { value } = binding
    const roles = store.getters && store.getters.roles
    if (value && value instanceof Array) {
      if (value.length > 0) {
        const permissionRoles = value
        const hasPermission = roles.some(role => { // some方法 有一个满足条件，则返回true
          return permissionRoles.includes(role)
        })
        if (!hasPermission) { // 没有权限
          el.parentNode && el.parentNode.removeChild(el)
        }
      }
    } else {
      throw new Error(`使用方式： v-permission="['admin','editor']"`)
    }
  }
}
