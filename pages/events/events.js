const app = getApp()
const AV = require('../../libs/av-weapp-min.js');

// pages/signups/signups.js
Page({
  /**
   * Page initial data
   */
  data: {

  },

  navToCreate() {
    wx.navigateTo({
      url: '/pages/event_create/event_create',
    })
  },

  navToShow(e) {
    wx.showLoading({ title: 'Loading' })
    const id = e.currentTarget.dataset.eventId
    wx.navigateTo({
      url: `/pages/event_show/event_show?id=${id}`,
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

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
    var query = new AV.Query('Event');
    query.find().then((res) => {
      // this.setData({ events: res) })
      this.setData({ events: res.map((e) => { return e.toJSON() }) })
      console.log(this.data)
    })
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