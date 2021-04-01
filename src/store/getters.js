const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  // 判断用户是否已经登录,如用户信息中已有usrId,则为true,反之则为false
  isLogin: state => {
    return state.user.userInfo.userId ? true : false
  },
  // 定义一个userInfo将用户信息保存到计算属性中
  userInfo: state => state.user.userInfo
}
export default getters
