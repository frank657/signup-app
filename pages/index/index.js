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
    // var file = new AV.Query('_File');
    // file.get('5d708150d5de2b0083ef9633').then((f) => {
    //   this.setData({bgImage: f.toJSON().url})
    // })

    new AV.Query('Config').include('landingImage').find().then((config) => {
      const bgImage = config[0].toJSON().landingImage.url
      this.setData({ bgImage })
      app.globalData.landingImage = bgImage
      app.globalData.showEventsPage = config[0].toJSON().showEventsPage
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
  navToApp: function(e) {
    const showEventsPage = app.globalData.showEventsPage
    const url = showEventsPage ? '/pages/events/events' : '/pages/event_show/event_show?id=5d6fde8843e78c0068d99bb9'
    wx.navigateTo({url})
  }
})
