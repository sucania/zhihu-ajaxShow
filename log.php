<?php
//对填入的账号和密码进行验证（一般在密码input文本框验证，登陆时用），是否和user数据库里的一致。

 require 'config.php';

 $_pass = sha1($_POST['log_pass']);   //密码加密
//加密后的密码和账号用时验证
 $query = mysql_query("SELECT user,pass FROM user WHERE user='{$_POST['log_user']}'
           AND pass='{$_pass}'") or die('SQL 错误!');
//如果登陆的数据存在，就可以登陆。
  if (mysql_fetch_array($query,MYSQL_ASSOC)) {
    echo 'true';
  }   else {
    echo 'false';
  }

 mysql_close();

 ?>
