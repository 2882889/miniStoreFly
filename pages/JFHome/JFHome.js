const app = getApp()

Page({
  data: {
    pagePath: "https://qwd.jd.com/cps/pool/query?g_tk=1317743838&sourceId=1",
    currentPage: 0,
    pageSize: 30,
    skuArray:[],

    scrollH: 0,
    imgWidth: 0,
    loadingCount: 0,
    col1: [],
    col2: []
  },

  onLoad: function () {

    wx.getSystemInfo({
      success: (res) => {
        let ww = res.windowWidth
        let wh = res.windowHeight
        let imgWidth = ww * 0.48
        let scrollH = wh;
        this.setData({
          scrollH: scrollH,
          imgWidth: imgWidth
        })

        var thisPage = this
        this.getPageData(0, function (images) {
         
          thisPage.loadImages(images,1)
        })
      }
    })
  },
  
  //
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading()

    var thisPage = this

    this.getPageData(0, function(res) {
      wx.stopPullDownRefresh()
      wx.hideNavigationBarLoading()
      thisPage.loadImages(res, 1)
    })
  },

  onReachBottom: function () {
    let that = this;
    var currentPage = this.data.currentPage
    this.getPageData(currentPage, function (res) {
      that.loadImages(res, 0)
    })
  },

  getPageData: function (pageNum, e) {
    var thisPage = this
    this.getJFGoodsListId(pageNum ,function (resId) {
      var skuStr = resId.skuIds.toString()
      thisPage.getJFGoodsList(skuStr, function (res) {
        e(res)
        console.log(res)
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

  onImageLoad: function (e) {
    let imageId = e.currentTarget.id;
    let oImgW = e.detail.width;         //图片原始宽度
    let oImgH = e.detail.height;        //图片原始高度
    let imgWidth = this.data.imgWidth;  //图片设置的宽度
    let scale = imgWidth / oImgW;        //比例计算
    let imgHeight = oImgH * scale;      //自适应高度

    let images = this.data.skuArray;
    let imageObj = null;

    for (let i = 0; i < images.length; i++) {
      let img = images[i];
      if (img.id === imageId) {
        imageObj = img;
        break;
      }
    }

    imageObj.height = imgHeight
    let loadingCount = this.data.loadingCount - 1
    let col1 = this.data.col1
    let col2 = this.data.col2

    //判断当前图片添加到左列还是右列
    if (col1.length <= col2.length) {
      col1.push(imageObj)
    } else {
      col2.push(imageObj)
    }

    let data = {
      loadingCount: loadingCount,
      col1: col1,
      col2: col2
    };

    //当前这组图片已加载完毕，则清空图片临时加载区域的内容
    if (!loadingCount) {
      data.images = []
    }

    this.setData(data)
  },

  loadImages: function (images,isFirst) {

    var currentPage = this.data.currentPage
    var skuArray =[]
    if (isFirst == 0) {
      skuArray = this.data.skuArray.concat(images)
      currentPage += 1
    }else {
      currentPage = 1
      skuArray = images
    }

    let baseId = "img-" + (+new Date());

    for (let i = 0; i < skuArray.length; i++) {
      skuArray[i].id = baseId + "-" + i;
    }
    console.log(currentPage)
    this.setData({
      loadingCount: skuArray.length,
      skuArray: skuArray,
      currentPage:currentPage
    });
  },

  ditailDidClick: function(e) {
    console.log(e)
    var urlStr = '../GoodsDetail/GoodsDetail?skuId=' + e.currentTarget.dataset.skuid
    wx.navigateTo({
      url: urlStr,
    })
  }
})