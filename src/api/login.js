import request from '@/utils/request'

// export function login(username, password, code, uuid) {
export function login(username, password, uuid) {
  return request({
    url: 'auth',
    method: 'post',
    data: {
      username,
      password,
      // code,
      uuid
    }
  })
}

export function getInfo(username) {
  return request({
    // url: 'auth/info',
    url: 'api/user/v1/user/getByAccount',
    method: 'post',
    data: {
      username
    }
  })
}

// export function getCodeImg() {
//   return request({
//     url: 'auth/code',
//     method: 'get'
//   })
// }

export function logout() {
  return request({
    // url: 'auth/logout',
    url: 'signout',
    method: 'get'
  })
}
