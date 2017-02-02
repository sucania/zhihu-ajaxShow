 $(function() {
  //  按钮UI
 $('#search_button').button({
   'icons':{
     'primary':'ui-icon-search',
     //'secondary':'ui-icon-triangle-1-s'
   }
 });
 $('#question_button').button({
   'icons':{
     'primary':'ui-icon-search',
   }
 });

//问题 对话框UI
 $('#question_button').click(function() {
   if( $.cookie('user') ) {      //$.cookie('user')看不懂  ,必须是user
     $('#question').dialog('open');
   } else {
     $('#error').dialog('open')
     setTimeout(function() {
      $('#error').dialog('close')
      $('#log').dialog('open')
     },1000)
   }
 })
 $('#question').dialog({
   'buttons':{
     '发布':function() {
      //  $(this).submit();     //this指的是#question
        $(this).ajaxSubmit({
          'url':'add_content.php',
          'type':'POST',
          'data':{
            'user':$.cookie('user'),//question只有title和内容POST发出去了，这里把user也发出去,发到数据库
            'content':$('#ueditor_0').contents().find('p').html(),  //,通过F12找的.对于iframe框架，后面加.contents()
          },
          'beforeSubmit':function() {
   //alert($('#reg').find('button').eq(0).html())在#reg下面找button是没有的,因为#reg，是一个表单(隐藏的表单)。
   //$('#reg').dialog()才是对话框,$('#reg').dialog('widget').find('button').eq(0).html()是button的
   //内容
            $('#loading').dialog('open');
            $('#question').dialog('widget').find('button').eq(1).button('disable') //，提交成功前，reg整个对话框的第二个button无法启用
            $('#loading').css('background','url(images/interactive.gif) no-repeat 16px center').html('数据交互中')
          },
          'success':function(responseText,statusText) {
            if(responseText) {    //如果它提交成功，就启用这个按钮
              $('#question').dialog('widget').find('button').eq(1).button('enable') //这个按钮
              $('#loading').css('background','url(images/currect1.png) no-repeat 20px center').html('发布成功!')
              setTimeout(function() {  //延时函数，应用成功提交完在延迟1秒后消失
                $('#loading').dialog('close');
                $('#question').dialog('close');
                $('#ueditor_0').contents().find('p').html('请描述内容···')  //发布完成后，还原初始内容
                $('#question').resetForm();
              },1000)
            }
          },
        })
     },
   },
   'width':700,          //对话框宽高
   'height':550,
   'modal':true,         //默认false，true会使对话框外有一层灰纱，无法操作
   'autoOpen':false,        //将对话框初始化，不显示,只有当点击之后才会显示
 });

 //错误提示,后登陆方能提问(和问题对话框结合使用)
 $('#error').dialog({
   'autoOpen':false,
   'modal':true,
   'closeOnEscape':true,
   'resizeable':false,
   'dragger':false,
   'width':165,
   'height':41,    //80
 }).parent().find('.ui-widget-header').hide();

 //JSON文件引用，
 //从数据库里调用出来到html的，是JSON数据，需要转换格式,先在html里写一个div提问，div内容的模板
 $.ajax({
   'url':'show_content.php',
   'type':'POST',
   'success':function(response,status,xhr) {
    //  alert(response);
    // alert(typeof response) //打印出来的是字符串是不能用的,string不能用
    // alert($.parseJSON(response));   //转换格式，打印出对象数组object object，就可以用了
      var json = $.parseJSON(response);   //response是 JSON 字符串, 必须将它转换为对象字面量
      var html = '';   //变量html,输入字符串
      var arr = [];   //arr数组
      $.each(json,function(index,value) {  //each()遍历很重要，也可以用for循环
        //alert(value.title);   三条标题
        //<h4>bnbbs 发表于 2017-1-17</h4>
          html += '<h4>' + value.user + '发表于' + value.date + '</h4>' //+= 一次完成加法和赋值
                  + '<h3>' + value.title + '</h3>'
                  + '<div class="editor">' +  value.content + '</div>'
                  +'<div class="bottom">0条评论 <span class="down">显示全部</span><span class="up">收起</span></div><hr noshade="noshade" size="1" />';
      })
      $('.content').append(html); //输出内容的

      $.each($('.editor'),function(index,value) {
          alert($(value).height());
      })


   },
 })



 //日历UI
 $('#date').datepicker({
   'changeMonth':true,  //月份，年份可以上拉选取
   'changeYear':true,
   'showMonthAfterYear':true,   //把月放在年的后面
   'yearRange':'1950:2020'  //年份选取的区间范围
 });

 // 工具提示UI
 $('#reg input[title]').tooltip({
    'tooltipClass':'red',
    'position':{
      'my':' center-40 left',
      'at':'right-30 center '
    },
    'show':false,
    'hide':false,
  });

  //自动下拉补全UI
var host = ['aa','aalob','apologize','bbb'];
// $('#email').autocomplete({
//  source: host,
// })                    //对话框dialog里面的自动下拉补全，没有作用。
$('#header .search').autocomplete({
  'source': host,        //指定数据源
  // 'disabled':true,    //禁止自动补全
  'autoFocus':true       //设为true，下拉的第一个项目会被自动选定
})

//对话框UI   注册·····················
 $('#reg input[type=radio]').button();   //dialog里的单选框成为按钮

   $('#reg').dialog({
     'title':'知乎注册',
     'buttons':{
       '提交':function() {
         //alert('正在加载中');
         $(this).submit();   //提交到action="123.html",然而后面有个ajaxSubmit(),就提交到它那了
       },
       '取消':function() {
         $('#reg').dialog('close');
       }
     },
     'width':340,          //对话框宽高
     'height':340,
    //  'show':'puff',        //缩放出现消失效果
    //  'hide':'puff',
     'modal':true,         //默认false，true会使对话框外有一层灰纱，无法操作
     'autoOpen':false,        //将对话框初始化，不显示,只有当点击之后才会显示
   });
$('#reg_a').click(function() {       //点击之后显示对话框，并使内容里的文字样式变大
 $('#reg').dialog('open').css('font-size','18px')
})
$('#reg_a').click(function() {        //点击之后出现dialog对话框···
  $('#reg').dialog('open')
})

$('#reg').validate({
  'rules':{
    'user':{
      'required':true,
      'minlength':4,
      'remote':{
        'url':'is_user.php',
        'type':'POST',
      },
    },
    'pass':{
      'required':true,
      'minlength':6,
    },
    'email':{
      'required':true,
      'email':true,
    },
  },
  'messages':{
    'user':{
      'required':'账号不得为空',
      'minlength':'账号长度不得少于{0}位',
      'remote':'账号被占用！'
    },
    'pass':{
      'required':'密码不得为空',
      'minlength':' 密码长度不得少于{0}位',
    },
    'email':{
      'required':'邮箱不得为空',
      'email':'请输入正确的邮箱',
    },
  },

  'highlight':function(element,errorClass) {    //高亮，提交不出去显示有错误的元素，使边框变色
    $(element).css('border','1px solid #630')
    $(element).parent().find('span').html('*').removeClass('succ') //高亮，有错误的元素，它的span的内容为*，移除class为succ
  },
  'unhighlight':function(element,errorClass) {  //不高亮，显示成功的元素,这里的element通过F12可以查到是input
    $(element).css('border','1px solid #CCCCCC')
    //$(element).parent().find('span').html('OK')
    $(element).parent().find('span').html('').addClass('succ')  //成功的元素先清空span里的html文本内容然后
                                                                //给span增加一个class类为succ
  },

  'showErrors':function(errorMap,errorList) {  //获取错误时，提示句柄，不用提交，及时获取值
    var errors = this.numberOfInvalids();
    if(errors > 0) {
      $('#reg').dialog('option','height',errors*30 + 340);
    }
    else{
      $('#reg').dialog('option','height',340);
    }
    this.defaultShowErrors();      //执行默认错误
  },
  'wrapper':'li',  //显示错误信息的外层标签名称
  'errorLabelContainer':'ol.reg-error',  //显示错误信息的容器，根据校验结果隐藏或者显示错误容器

  'submitHandler':function(form) { //submitHandler即当表单通过验证时执行回调函数,在这个回调函数中通过jquery.form来提交表单
    $('form').ajaxSubmit({   //通过ajax提交到数据库
          'url':'add.php',
          'type':'POST',
          'beforeSubmit':function() {
//alert($('#reg').find('button').eq(0).html())在#reg下面找button是没有的,因为#reg，是一个表单(隐藏的表单)。
//$('#reg').dialog()才是对话框,$('#reg').dialog('widget').find('button').eq(0).html()是button的
//内容
            $('#loading').dialog('open');
            $('#reg').dialog('widget').find('button').eq(1).button('disable') //，提交成功前，reg整个对话框的第二个button无法启用
            $('#loading').css('background','url(images/interactive.gif) no-repeat 16px center').html('数据交互中')
          },
          'success':function(responseText,statusText) {
            if(responseText) {    //如果它提交成功，就启用这个按钮
              $('#reg').dialog('widget').find('button').eq(1).button('enable') //这个按钮
              $('#loading').css('background','url(images/currect1.png) no-repeat 20px center').html('数据新增成功!')
              $.cookie('user', $('#user').val())  //提交成功后，生成一个注册时候的cookie
              setTimeout(function() {  //延时函数，应用成功提交完在延迟1秒后消失
                $('#loading').dialog('close');
                $('#reg').dialog('close');
                $('#reg').resetForm();
                $('#reg p span').removeClass('succ').html('*');
                $('#reg_a,#log_a').hide()    //成功提交后执行的是内部的这一块，出现下面3个,起到刷新页面的作用
                $('#number,#logout').show()
                $('#number').html($.cookie('user')) //$('#user').val()不能用它，因为它是当时在文本框上的，现在文本框是空
              },1000)                               //$.cookie('user') 它是用在cookie里储存了，可以一直用的
            }
          },
    })
  },
})

//数据交互中
  $('#loading').dialog({
    'autoOpen':false,
    'modal':true,
    'closeOnEscape':true,   //取消esc事件  (这三个其实应该无所谓)
    'resizeable':false,     //不能修改大小
    'dragger':false,        //不能拖曳移动
    'width':180,
    'height':41,         //80
  }).parent().find('.ui-widget-header').hide() //隐藏标题栏

  //cookie机制 (表单信息完成后提交，到数据库；表单信息完成后提交，cookie将信息存储)
  // alert($.cookie('user'))  //返回的就是bnbbs，说明它有值
  $('#number,#logout').hide();
  if($.cookie('user')) {     //如果$.cookie('user')有值,有的隐藏有的显示
    $('#reg_a,#log_a').hide()
    $('#number,#logout').show()
    $('#number').html($.cookie('user'))  //$.cookie('user')就是输入的文本用户名,重要
  }                                            //cookie里名称的内容
  else{                      //反之，$.cookie('user')为空
    $('#reg_a,#log_a').show()
    $('#number,#logout').hide()
  }

  $('#logout').click(function() {
    $.removeCookie('user')
    window.location.href = '/jquery/46ajaxShow/'   //跳转到这个页面http://localhost:8080/jquery/40cookiePlug/
  })


//  登陆············
  $('#log').dialog({
    'title':'用户登陆',
    'buttons':{
      '登陆':function() {
        //alert('正在加载中');
        //alert($('#expires').is(':checked'))    false  //判断#expires是否选择了，给cookie7天过期
        $(this).submit();   //提交到action="123.html"
      },
      '取消':function() {
        $('#log').dialog('close');
      }
    },
    'width':340,          //对话框宽高
    'height':250,
   //  'show':'puff',        //缩放出现消失效果
   //  'hide':'puff',
    'modal':true,         //默认false，true会使对话框外有一层灰纱，无法操作
    'autoOpen':false,        //将对话框初始化，不显示,只有当点击之后才会显示
  });
  $('#log_a').click(function() {       //点击之后显示对话框，并使内容里的文字样式变大
   $('#log').dialog('open').css('font-size','18px')
  })
  $('#log_a').click(function() {        //点击之后出现dialog对话框···
   $('#log').dialog('open')
  })

  $('#log').validate({
  'rules':{
   'log_user':{
     'required':true,
     'minlength':4,
   },
   'log_pass':{
     'required':true,
     'minlength':6,
     'remote':{       //数据验证，用户密码的
       'url':'log.php',
       'type':'POST',
       'data': {       //数据验证，用户user=name的  ,记住data，不要写错！！！！
         'log_user':function() {
           return $('#log_user').val()  //return 表达式; 语句结束函数执行，返回调用函数，而且把表达式的值作为函数的结果
         }
       },
     },
   },
  },
  'messages':{
   'log_user':{
     'required':'账号不得为空',
     'minlength':'账号长度不得少于{0}位',
   },
   'log_pass':{
     'required':'密码不得为空',
     'minlength':' 密码长度不得少于{0}位',
     'remote':'账号或密码不正确',
   },
  },

  'highlight':function(element,errorClass) {    //高亮，提交不出去显示有错误的元素，使边框变色
   $(element).css('border','1px solid #630')
   $(element).parent().find('span').html('*').removeClass('succ') //高亮，有错误的元素，它的span的内容为*，移除class为succ
  },
  'unhighlight':function(element,errorClass) {  //不高亮，显示成功的元素,这里的element通过F12可以查到是input
   $(element).css('border','1px solid #CCCCCC')
   //$(element).parent().find('span').html('OK')
   $(element).parent().find('span').html('').addClass('succ')  //成功的元素先清空span里的html文本内容然后
                                                               //给span增加一个class类为succ
  },

  'showErrors':function(errorMap,errorList) {  //获取错误时，提示句柄，不用提交，及时获取值
   var errors = this.numberOfInvalids();
   if(errors > 0) {
     $('#log').dialog('option','height',errors*30 + 250);
   }
   else{
     $('#log').dialog('option','height',250);
   }
   this.defaultShowErrors();      //执行默认错误
  },
  'wrapper':'li',  //显示错误信息的外层标签名称
  'errorLabelContainer':'ol.log-error',  //显示错误信息的容器，根据校验结果隐藏或者显示错误容器

  'submitHandler':function(form) { //submitHandler即当表单通过验证时执行回调函数,在这个回调函数中通过jquery.form来提交表单
   $('form').ajaxSubmit({   //通过ajax提交到数据库
         'url':'log.php',
         'type':'POST',
         'beforeSubmit':function() {
  //alert($('#reg').find('button').eq(0).html())在#reg下面找button是没有的,因为#reg，是一个表单(隐藏的表单)。
  //$('#reg').dialog()才是对话框,$('#reg').dialog('widget').find('button').eq(0).html()是button的
  //内容
           $('#loading').dialog('open');
           $('#log').dialog('widget').find('button').eq(1).button('disable') //，提交成功前，reg整个对话框的第二个button无法启用
           $('#loading').css('background','url(images/interactive.gif) no-repeat 16px center').html('数据交互中')
         },
         'success':function(responseText,statusText) {
           if(responseText) {    //如果它提交成功，就启用这个按钮
             $('#log').dialog('widget').find('button').eq(1).button('enable') //这个按钮
             $('#loading').css('background','url(images/currect1.png) no-repeat 20px center').html('登陆成功!')
              if ($('#expires').is(':checked')) {          //#expires checked的话，cookie在7天后过期
                $.cookie('user', $('#log_user').val(),{
                  'expires':7,
                })
              } else {
                $.cookie('user', $('#log_user').val())  //提交成功后，生成一个登陆时候的cookie
              }
             setTimeout(function() {  //延时函数，应用成功提交完在延迟1秒后消失
               $('#loading').dialog('close');
               $('#log').dialog('close');
               $('#log').resetForm();
               $('#log p span').removeClass('succ').html('*');
               $('#reg_a,#log_a').hide()    //成功提交后执行的是内部的这一块，出现下面3个,起到刷新页面的作用
               $('#number,#logout').show()
               $('#number').html($.cookie('user')) //$('#log_user').val()不能用它，因为它是当时在文本框上的，现在文本框是空
                    // alert($.cookie('log_user'))
             },1000)                               //$.cookie('log_user') 它是用在cookie里储存了，可以一直用的
           }
         },
   })
  },
})

//tabUI 选项卡UI
$('#tabs').tabs();
// $('#tabs ul').removeClass('ui-widget-header');  //必须在选项卡引入后，才能去掉上头的背景框

// fold 折叠UI
$('#accordion').accordion({
  'collapsible':true, //点自己也可折叠
  // 'disabled':true,    //禁用
  // 'event':'mouseover',  //事件方式，点击或者
  // 'active':1,        //进入浏览器最开始的那个折叠
  // 'active':true,       //默认最开始折叠或不折叠
  // 'heightStyle':'content',   根据内容伸展高度，基本以不一样高
  // 'heightStyle':'auto',    //默认，都一样高
  // 'header':'h3'  ,  //设置折叠菜单的标签，它改了html里面还是要改,没用
  // 'icons':{   //修改图标
  //   'header':'ui-icon-plus',    //标头所用的图标
  //   'activeHeader':'ui-icon-minus',  //展开后所用的图标
  // }

  // 'create':function(event,ui) {
  //   alert('创建打开')
  //   alert('$(ui.header.get().html())')
  //   alert('$(ui.panel.get().html())')
  // }
});
// $('#accordion').accordion('disable')
// $('#accordion').accordion('enable')
$('#accordion').accordion('option','active',0)










})
