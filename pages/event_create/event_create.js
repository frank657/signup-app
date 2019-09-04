const app = getApp()
const AV = require('../../libs/av-weapp-min.js');
const DF = require('../../utils/util.js')

// pages/event_create/event_create.js
Page({

  /**
   * Page initial data
   */
  data: {
    placeholder: 'Pin or input the location'
  },

  startChangeDate(e) { this.setData({ startDate: e.detail.value, endDate: e.detail.value }) },
  startChangeTime(e) { this.setData({ startTime: e.detail.value, endTime: e.detail.value }) },
  endChangeDate(e) { this.setData({ endDate: e.detail.value }) },
  endChangeTime(e) { this.setData({ endTime: e.detail.value }) },
  setTitle(e) { this.setData({ title: e.detail.value }) },
  setLocationName(e) { this.setData({ locationName: e.detail.value }) },

  createEvent() {
    wx.showLoading({ title: 'Loading' })
    const flyerUrl = this.data.flyerUrl,
          title = this.data.title,
          dateTimeStart = new Date(`${this.data.startDate} ${this.data.startTime}`),
          dateTimeEnd = new Date(`${this.data.endDate} ${this.data.endTime}`),
          locationName = this.data.locationName
    let   latitude = '',
          longitude = ''
    if (this.data.selectedLocation) {
      latitude = this.data.selectedLocation.latitude
      longitude = this.data.selectedLocation.longitude
    }

    new AV.File('flyer', {
      blob: {
        uri: flyerUrl,
      },
    }).save().then(file => {
      const event = new AV.Object('Event')
      const user = AV.User.current()
      const geopoint = new AV.GeoPoint(latitude, longitude)
      event.set('owner', user)
      event.set('title', title)
      event.set('dateTimeStart', dateTimeStart)
      event.set('dateTimeEnd', dateTimeEnd)
      event.set('geolocation', geopoint)
      event.set('location', locationName)
      event.set('flyer', file)
      event.save().then((res)=> {
        console.log('id', res)
        wx.redirectTo({
          url: `/pages/event_show/event_show?id=${res.id}`,
        })
      })
    }).catch(console.error);
  },

  pinLocation() {
    const page = this
    wx.chooseLocation({
      success: function(res) {
        console.log(res)
        page.setData({ 
          selectedLocation: res,
          locationName: res.name
        })
      },
    })
  },

  uploadFlyer() {
    const page = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        page.setData({ flyerUrl: res.tempFilePaths[0] })
      },
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const dateTime = new Date()
    this.setData({today: {
      date: DF.formatTime(dateTime, 'date'),
      time: DF.formatTime(dateTime, 'time')
    }})
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