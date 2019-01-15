
// 获取显示区域长宽
const device = wx.getSystemInfoSync()
const W = device.screenWidth
const H = device.screenHeight - 50
let cropper = require('../../welCropper/welCropper.js');

Page({

  data: {

  },

  onLoad: function (options) {
    var that = this
    // 初始化组件数据和绑定事件
    cropper.init.apply(that, [W, H]);
  },

  onShow: function () {

  },

  onShareAppMessage: function () {

  },

  onClickSelect() {
    let that = this;

    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        let tempFilePath = res.tempFilePaths[0];

        // 将选取图片传入cropper，并显示cropper
        // mode=rectangle 返回图片path
        // mode=quadrangle 返回4个点的坐标，并不返回图片。这个模式需要配合后台使用，用于perspective correction
        let modes = ["rectangle", "quadrangle"]
        let mode = modes[0]   //rectangle, quadrangle
        that.showCropper({
          src: tempFilePath,
          mode: mode,
          sizeType: ['original', 'compressed'],   //'original'(default) | 'compressed'
          callback: (res) => {
            if (mode == 'rectangle') {
              console.log("crop callback:" + res)
              wx.previewImage({
                current: '',
                urls: [res]
              })
            }
            else {
              wx.showModal({
                title: '',
                content: JSON.stringify(res),
              })

              console.log(res)
            }

            // that.hideCropper() //隐藏，我在项目里是点击完成就上传，所以如果回调是上传，那么隐藏掉就行了，不用previewImage
          }
        })
      }
    })
  }
})


