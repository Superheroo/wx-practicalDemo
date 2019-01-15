let timer = null;

Page({
  data: {
    isTopTips: false,
    TopTipscontent: 'TopTip内容'
  },
  onLoad: function (options) {
  
  },
  onShow: function () {

  },
  onUnload: function () {
    clearTimeout(timer);
  },
  onClickButton: function(){
    let that = this;
    that.setData({
      isTopTips: true
    });
    timer = setTimeout(function () {
      that.setData({
        isTopTips: false
      });
    }, 1500);

  }
})




