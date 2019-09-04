const app = getApp()
const AV = require('../../libs/av-weapp-min.js');
const DF = require('../../utils/util.js')

// pages/attendees/attendees.js
Page({

  /**
   * Page initial data
   */
  data: {
    selectedAttendee: null
  },

  selectAttendee(e) {
    const selectedAttendee = e.currentTarget.dataset.selectedAttendee
    if (this.data.selectedAttendee !== null && selectedAttendee.objectId === this.data.selectedAttendee.objectId) {
      this.setData({ selectedAttendee: null })
    } else {
      this.setData({ selectedAttendee })
    }
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const eventId = options.eventId
    // const eventId = '5d6e2bb4d37616007455159d'
    new AV.Query('Event').get(eventId).then((event) => {
      const signups = new AV.Query('Signup')
      signups.equalTo('event', event)
      signups.include('user')
      signups.find().then((signups) => {
        signups = signups.map(signup => signup.toJSON())
        this.setData({
          yes: signups.filter(signup => signup.attend === 'yes'),
          maybe: signups.filter(signup => signup.attend === 'maybe'),
          no: signups.filter(signup => signup.attend === 'no')
        })
      })
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