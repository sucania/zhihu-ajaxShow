<?php
//name=user,输入的文本账号名是否被占用（一般注册时），与user数据库连接对比.

   require 'config.php';
 //从这个user表里查找user是否等于传过来的user
   $query = mysql_query("SELECT user FROM user WHERE user='{$_POST['user']}'") or die ('SQL 错误！');
//如果传过来的user有值，就返回false,说明被占用了
   if (mysql_fetch_array($query, MYSQL_ASSOC)) {
     echo 'false';
   } else {
     echo 'true';
   }

   mysql_close();

 ?>
