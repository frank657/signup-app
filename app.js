const AV = require('./libs/av-weapp-min.js');
AV.init({
  appId: 'FUNX0gSQhkRDoISr1ABVWxNK-gzGzoHsz',
  appKey: 'dK0lk35N1YDQ88qRUSKmLkOV',
});

//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    AV.User.loginWithWeapp().then(user => {
      this.globalData.user = user.toJSON();
    }).catch(console.error);

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          const user = AV.User.current();
          // 调用小程序 API，得到用户信息
          wx.getUserInfo({
            success: ({ userInfo }) => {
              // 更新当前用户的信息
              user.set(userInfo).save().then(user => {
                // 成功，此时可在控制台中看到更新后的用户信息
                this.globalData.user = user.toJSON();
                // wx.navigateTo({ url: '/pages/events/events' })
              }).catch(console.error);
            }
          });
          // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          // 所以此处加入 callback 以防止这种情况
          if (this.userInfoReadyCallback) {
            this.userInfoReadyCallback(res)
          }
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})