//index.js
//获取应用实例
const app = getApp()
const AV = require('../../libs/av-weapp-min.js');

Page({
  data: {

  },
  //事件处理函数
  navToEvents: function() {
    wx.switchTab({
      url: '/pages/events/events'
    })
  },
  onLoad: function () {
    var file = new AV.Query('_File');
    file.get('5d708150d5de2b0083ef9633').then((f) => {
      this.setData({bgImage: f.toJSON().url})
    })

    if (app.globalData.user) {
      this.setData({
        user: app.globalData.user,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          user: res.user,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.user = res.user
          this.setData({
            user: res.user,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    const user = AV.User.current();
    user.set(e.detail.userInfo).save().then(user => {
      // 成功，此时可在控制台中看到更新后的用户信息
      user = user.toJSON()
      app.globalData.user = user;
      this.setData({user})
      console.log('data', this.data)
      wx.navigateTo({
        // url: '/pages/events/events',
        url: '/pages/event_show/event_show'
      })
    }).catch(console.error);
  }
})
