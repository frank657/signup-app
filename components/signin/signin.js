const app = getApp()
const AV = require('../../libs/av-weapp-min.js');
const DF = require('../../utils/util.js')

// pages/signin/signin.js
Page({

  /**
   * Page initial data
   */
  data: {

  },

  getUserInfo(e) {
    const signIn = e.currentTarget.dataset.signIn
    const page = this.currentPage()
    console.log(signIn)
    if (signIn) {
      const currentUser = AV.User.current();
      wx.getUserInfo({
        success: (res) => {
          currentUser.set(e.detail.userInfo).save().then(user => {
            // 成功，此时可在控制台中看到更新后的用户信息
            user = user.toJSON()
            app.globalData.user = user;
            page.setData({ user })
          }).catch(console.error);
        },
        fail: (res) => {
          console.log('fail', res)
          wx.showModal({
            title: 'Sign in to continue',
            content: 'Allow Valval to obtain your data to continue ;)',
          })
        }
      })
    }
    this.hideSignIn()
  },

  hideSignIn() {
    this.currentPage().setData({ showSignIn: false })
  },

  currentPage() {
    return getCurrentPages().slice(- 1)[0]
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