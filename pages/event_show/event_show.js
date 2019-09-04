const app = getApp()
const AV = require('../../libs/av-weapp-min.js');
const DF = require('../../utils/util.js')

// pages/signup_show/signup_show.js
Page({

  /**
   * Page initial data
   */
  data: {
    attendOptions: ['yes', 'maybe', 'no'],
    attend: null
  },

  navToAttendees() {
    wx.navigateTo({
      url: `/pages/attendees/attendees?eventId=${this.options.id}`,
    })
  },

  submit() {
    wx.showLoading({ title: 'Loading' })
    
    const attend = this.data.attend
    const user = AV.User.current()

    if (this.data.userAttendEvent) {
      console.log('already attending')
      console.log('id', this.data.userAttendEvent.objectId)
      let signup = AV.Object.createWithoutData('Signup', this.data.userAttendEvent.objectId);
      console.log('signup', signup)
      signup.set('attend', attend);
      signup.save();
      setTimeout(() => { wx.showToast({ title: 'Thanks', icon: 'success' }) }, 1000)
      this.onShow()
    } else {
      console.log('not attending')
      let signup = new AV.Object('Signup')
      new AV.Query('Event').get(this.options.id).then((event) => {    
        signup.set('user', user)
        signup.set('event', event)
        signup.set('attend', attend)
        signup.save();
        setTimeout(() => { wx.showToast({ title: 'Thanks', icon: 'success' }) }, 1000)
        this.onShow()
      })
    }
  },

  selectAttend(e) {
    let attend = e.target.dataset.attend
    attend = this.data.attend === attend ? null : attend
    this.setData({ attend })
  },

  showMap() {
    const page = this
    wx.openLocation({
      latitude: this.data.event.geolocation.latitude,
      longitude: this.data.event.geolocation.longitude,
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
    new AV.Query('Event').get(this.options.id).then(event => {
      this.loadEventData(event)
      this.loadAttendeesData(event)
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

  },

  loadEventData(event) {
    const page = this
    event = event.toJSON()
    event.dateTimeStart = DF.formatTimeText(new Date(event.dateTimeStart))
    event.dateTimeEnd = DF.formatTimeText(new Date(event.dateTimeEnd))
    this.setData({ event: event })
    const image = event.flyer.url

    wx.getSystemInfo({
      success: function (res) {
        const screenWidth = res.screenWidth
        wx.getImageInfo({
          src: image,
          success: (res) => {
            const flyerRes = {
              width: screenWidth,
              height: screenWidth / res.width * res.height
            }
            page.setData({ flyerRes })
            wx.hideLoading()
          }
        })
      },
    })
  },

  loadAttendeesData(event) {
    const currentUserId = AV.User.current().toJSON().objectId
    const signups = new AV.Query('Signup')
    signups.include('user')
    signups.equalTo('event', event)
    signups.find().then((res) => {
      const attendees = res.map((signup) => signup.toJSON())
      this.setData({ attendees })

      const userAttendEvent = attendees.find(a => a.user.objectId === currentUserId)
      if (userAttendEvent !== undefined) {
        this.setData({ userAttendEvent, attend: userAttendEvent.attend })
      }
      console.log('data', this.data)
    })
  }
})