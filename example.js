$(function() {
  // cookie插件
  // $.cookie('user','bnbbs')  //生成一个cookie
 //  $.cookie('user','bnbbs', {
 //    'expires':6,  //过期时间，在7天后
 //   // 'path':'/',    //设置路径，上一层
 //   //  'domain':'www.ycku.com', //设置域名,必须在这个域名下操作，我们这个是在localhost下的，所以没有显示
 //  });

 //  $.cookie('aaa','bbb' ,{
 //    'path':'/',
 //    'secure':true,            //默认false，需要使用安全协议https
 //  }

 // alert($.cookie('user'))   //读取cookie user 的数据
 // alert($.cookie('aaa'))

 // $.removeCookie('user')    //删除cookie user
 // $.removeCookie('user'，{  //删除cookie user  根目录是/的
 //   'path':'/',
 // })

 //cookie机制 (表单信息完成后提交，到数据库；表单信息完成后提交，cookie将信息存储)
 // alert($.cookie('user'))  //返回的就是bnbbs，说明它有值

})
