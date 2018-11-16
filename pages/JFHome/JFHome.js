const app = getApp()

Page({
  data: {
    pagePath: "https://qwd.jd.com/cps/pool/query?g_tk=1317743838&sourceId=1",
    currentPage: 0,
    pageSize: 30,
    skuArray:[]
  },

  onLoad: function () {
    this.getPageData()
  },
  
  //
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading()

    var thisPage = this
    var currentPage = 0
    var skuArray = []
    this.getPageData(0, function (res) {
      currentPage += 1
      skuArray = skuArray.concat(sku)
      thisPage.setData({ currentPage: currentPage, skuArray: skuArray })
    })
  },

  getPageData: function (pageNum, ee) {
    var thisPage = this
    this.getJFGoodsListId(pageNum ,function (resId) {
      var skuStr = resId.skuIds.toString()
      thisPage.getJFGoodsList(skuStr, function (res) {

        // ee(res)
        console.log(thisPage.data.skuArray)
      })
    })
  },


  getJFGoodsListId: function (pageNum, listId) {
    var url = this.data.pagePath + "&pageNo=" + pageNum + "&pageSize=" + this.data.pageSize
      console.log(url)
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
          list(res.data)
        }
      })
    },
})