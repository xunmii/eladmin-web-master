import { getInfo, login, logout } from '@/api/login'
import { getToken, removeToken, setToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    user: {},
    roles: [],
    // 第一次加载菜单时用到
    loadMenus: false
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_LOAD_MENUS: (state, loadMenus) => {
      state.loadMenus = loadMenus
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      // console.log(userInfo)
      const rememberMe = userInfo.rememberMe
      return new Promise((resolve, reject) => {
        login(userInfo.username, userInfo.password, userInfo.uuid).then(res => {
          console.log(res.token)
          setToken(res.token, rememberMe)
          commit('SET_TOKEN', res.token)
          setUserInfo(res, commit)
          // 第一次加载菜单时用到， 具体见 src 目录下的 permission.js
          commit('SET_LOAD_MENUS', true)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit }, userInfo) {
      console.log('不知道这里执行了吗？')
      return new Promise((resolve, reject) => {
        getInfo(userInfo.username).then(res => {
          setUserInfo(res, commit)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then(res => {
          logOut(commit)
          resolve()
        }).catch(error => {
          logOut(commit)
          reject(error)
        })
      })
    },

    updateLoadMenus({ commit }) {
      return new Promise((resolve, reject) => {
        commit('SET_LOAD_MENUS', false)
      })
    }
  }
}

export const logOut = (commit) => {
  commit('SET_TOKEN', '')
  commit('SET_ROLES', [])
  removeToken()
}

function transformerRes(userInfo) {
  return {
    authorities: { 0: { authority: 'admin' }},
    dataScopes: {},
    roles: { 0: 'admin' },
    user: {
      avatarName: '',
      avatarPath: '',
      createTime: '',
      dept: {
        id: 2,
        name: '研发部'
      },
      email: '201507802@qq.com',
      enabled: true,
      gender: '男',
      id: 1,
      isAdmin: true,
      jobs: {
        0: {
          id: 11,
          name: '全栈开发'
        }
      },
      nickName: '超级管理员',
      password: userInfo.password,
      phone: '18888888888',
      pwdResetTime: '2020-05-03 16:38:31',
      roles: {
        0: {
          dataScope: '全部',
          id: 1,
          level: 1,
          name: '超级管理员'
        }
      },
      updateBy: 'admin',
      updateTime: '2020-09-05 10:43:31',
      username: 'admin'
    }
  }
}

export const setUserInfo = (res, commit) => {
  // 如果没有任何权限，则赋予一个默认的权限，避免请求死循环
  res = transformerRes(res)
  if (Object.keys(res.roles).length === 0) {
    commit('SET_ROLES', ['ROLE_SYSTEM_DEFAULT'])
  } else {
    commit('SET_ROLES', res.roles)
  }
  commit('SET_USER', res.user)
}

export default user
