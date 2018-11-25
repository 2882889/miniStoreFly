//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    goodsList:{},
    goodsItem:{},
    skuId:""
  },
  //事件处理函数
  bindViewTap: function() {
    
  },
  onLoad: function (option) {
    var thisPage = this
    this.getGoodsList(option.skuId, function (res) {
      console.log(res)
      var array = res.sku
      thisPage.setData({goodsItem:array[0]})
    })
  },

  getGoodsList: function (goodId , e) {    
    wx.request({
      url: 'https://qwd.jd.com/fcgi-bin/qwd_searchitem_ex?g_tk=1319502213&skuid='+goodId, //仅为示例，并非真实的接口地址
      //https://qwd.jd.com/cps/product/searchgoods?xg_tk=1319502213&skuid=
      //https://qwd.jd.com/fcgi-bin/qwd_searchitem_ex?g_tk=1319502213&skuid=19226020017%7C26223183343%7C33304692952%7C1745928736%7C35938862786%7C36531931881%7C35669410619%7C34374046645%7C11588288985%7C22237993164%7C32956941974%7C32766238628%7C35485247701%7C28192916377%7C35092363006%7C24350458363%7C34751734928%7C28242265939%7C34810049398%7C23332524672
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        e(res.data)
      }
    })
  },

  getShare: function (e) {
    wx.request({
      url: 'https://qwd.jd.com/fcgi-bin/qwd_itemshare?skuid=11128470929&spuid=11128470928&type=1&ie=utf-8&source=0&subsource=0&ispg=&cps_ab=cab_ac&requestId=c6e46733-d9f2-4bfb-a881-fc000d0d180a&name=3M%20%E5%8F%A3%E7%BD%A99031%E9%98%B2%E5%B0%98%E9%98%B2%E9%9B%BE%E9%9C%BE9032%E9%98%B2%E6%8A%A4%E9%A2%97%E7%B2%92%E7%89%A9PM2.5%E9%98%B2%E5%B7%A5%E4%B8%9A%E7%B2%89%E5%B0%98%E9%AA%91%E8%A1%8C%E4%B8%8A%E4%B8%8B%E7%8F%AD%E7%94%A8%E7%94%B7%E5%A5%B3%E5%8F%A3%E7%BD%A9%209031%E8%80%B3%E6%88%B4%E5%BC%8F%EF%BC%881%E5%8C%85%2F10%E4%B8%AA%EF%BC%89&pic=jfs%252Ft3976%252F296%252F501720735%252F139103%252Fe108d182%252F5851f166N3cb79afd.jpg&couponid=&callback=__jp0',

      header: {
        'content-type': 'text/html; charset=gbk', // 默认值
        'cookie': '__jda=122270672.1542005858638852026656.1542005858.1542112775.1542338178.9; __jdb=122270672.4.1542005858638852026656|9.1542338178; __jdc=122270672; mba_muid=1542005858638852026656.1.1542338387531; mba_sid=1.4; pin=1232882889_m; jfShareSource=1_10; qwd_chn=99; qwd_schn=2; __jdv=122270672|direct|-|none|-|1542338178892; app_id=161; apptoken=CBAEBC6C66F4C856A4868557944FEF9A3DBDFE99B5CD65FF0A6D0255C94AB1FCDC0DB68795D0E2EB53978FE430BE3FEE8D7ED45556139F86A983D99955BA712E; client_type=apple; clientid=8BDFAA47-99A9-4CA4-A8C3-5689F46F2716; jdpin=1232882889_m; jxjpin=1232882889_m; levelName=%E9%92%BB%E7%9F%B3%E7%94%A8%E6%88%B7; nickname=jd123288; picture_url=; pinType=1; tgt=AAFb6SZ6AECdGk9yp2f1lYXPTjqx9urbXFmSRcdB60BB-eYI8ywr0Svm_1MEnRzixJ95o-XkeNrPqHAh2ZTUbOClhEWePxmK; userLevel=105; wg_skey=zpD03AE6E099BF15E2E2FCE47F58C4061FC7635739B975B90898596697E50C28A3A20832637075747B36053F52C70ECB28845A5B3FF0F0B148DEBDB27E8C67A48E; wg_uin=5439242884; wq_skey=zpD03AE6E099BF15E2E2FCE47F58C4061FC7635739B975B90898596697E50C28A3A20832637075747B36053F52C70ECB28845A5B3FF0F0B148DEBDB27E8C67A48E; wq_uin=5439242884; login_mode=1; __jdu=10111711766468081; shshshfpb=0a716ee23154143ce7645202b75976f85a6fe02679e9f89c15be92b3bc; PPRD_P=UUID.1542005858638852026656; __wga=1542091723231.1542091723231.1542018544411.1542007610510.1.3; shshshfp=be86589e59e82c1d1c746bc0f84b842a; cid=6; retina=1; visitkey=10111711766468081; shshshfpa=31d9f21d-9d54-9a93-d17e-10a48e4f3567-1542007611; sc_width=375; webp=0'
      },
      success(res) {
        e(res.data)
      }
    })
  },

  buyButDidClick: function(e){
    this.getShare(function(res){
      var temp = res
      var topIndex = temp.indexOf("(")
      var topStr = temp.substring(0 ,topIndex+1)
      var leftIndex = temp.indexOf(")")
      var leftStr = temp.substring(leftIndex, temp.length)
      var subStr = temp.replace(topStr,"")
      subStr = subStr.replace(leftStr, "")
      var obj1 = JSON.parse(subStr)
      console.log(obj1)
      var urlStr = '../shareWeb/shareWeb?url=' + obj1.skuurl
      wx.navigateTo({
        url: urlStr,
      })
    })
  }
})
