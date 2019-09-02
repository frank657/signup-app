// pages/signup_show/signup_show.js
Page({

  /**
   * Page initial data
   */
  data: {
    attendOptions: ['yes', 'maybe', 'no'],
    attend: null
  },

  selectAttend(e) {
    let attend = e.target.dataset.attend
    attend = this.data.attend === attend ? null : attend
    this.setData({ attend })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const page = this
    wx.getSystemInfo({
      success: function(res) { 
        const screenWidth = res.screenWidth
        const image = '/images/flyer.jpg'
        wx.getImageInfo({
          src: image,
          success: (res) => {
            const flyerRes = {
              width: screenWidth,
              height: screenWidth / res.width * res.height
            }
            page.setData({ flyerRes })
          }
        })
      },
    })
    console.log(this.data)
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