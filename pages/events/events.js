const app = getApp()
const AV = require('../../libs/av-weapp-min.js');

// pages/signups/signups.js
Page({
  /**
   * Page initial data
   */
  data: {

  },

  test() {

  },

  navToShow() {
    wx.navigateTo({
      url: '/pages/event_show/event_show',
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var query = new AV.Query('events');
    query.find().then((res) => {
      // this.setData({test: res})
      console.log(res[0].toJSON())
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})