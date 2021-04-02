import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}
// // 时间存储
// const expriesTime = 'expriesTime'
// export function getTime () {
//   return Cookies.get(expriesTime)
// }

// export function setTime () {
//   return Cookies.set(expriesTime, Date.now())
// }

// export function removeTime () {
//   return Cookies.remove(expriesTime)
// }
