const app = getApp()

Page({
  data: {
    pagePath: "https://qwd.jd.com/cps/pool/query?g_tk=1317743838&sourceId=1",
    currentPage: 0,
    pageSize: 30,
    skuArray:[]
  },

  onLoad: function () {
    var thisPage = this
    var currentPage = 0
    var skuArray = []
    this.getPageData(0 ,function (res) {
      thisPage.setData({ currentPage: currentPage, skuArray: res })
    })
  },
  
  //
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading()

    var thisPage = this
    var currentPage = 0
    var skuArray = []
    this.getPageData(0, function(res) {
      wx.stopPullDownRefresh()
      wx.hideNavigationBarLoading()
      currentPage += 1
      skuArray = skuArray.concat(res)
      thisPage.setData({ currentPage: currentPage, skuArray: skuArray })
    })
  },

  onReachBottom: function () {
    let that = this;
    var currentPage = this.data.currentPage
    this.getPageData(currentPage, function (res) {
      currentPage += 1
      skuArray = skuArray.concat(res)
      thisPage.setData({ currentPage: currentPage, skuArray: skuArray })
      console.log(that.data.skuArray)
    })
  },

  getPageData: function (pageNum, e) {
    var thisPage = this
    this.getJFGoodsListId(pageNum ,function (resId) {
      var skuStr = resId.skuIds.toString()
      thisPage.getJFGoodsList(skuStr, function (res) {
        e(res)
      })
    })
  },


  getJFGoodsListId: function (pageNum, listId) {
    var url = this.data.pagePath + "&pageNo=" + pageNum + "&pageSize=" + this.data.pageSize
    wx.request({
      url: url,
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        listId(res.data)
      }
    })
  },

    getJFGoodsList: function (skuIds, list) {
      var url = "https://qwd.jd.com/cps/product/searchgoods?g_tk=1317743838&skuid=" + skuIds
      console.log(url)
      wx.request({
        url: url,
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          list(res.data.sku)
        }
      })
    },
})