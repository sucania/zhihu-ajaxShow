<?php
//核心文件

 header('Content-Type:text/html; charset=utf-8');  //防止乱码的utf8

 define('DB_HOST', 'localhost');  //服务器的IP地址
 define('DB_USER', 'root');       //mysql的用户名和密码
 define('DB_PWD', 'surui19860904');
 define('DB_NAME', 'zhiwen');       //mysql的数据库
  //连接数据库
 $conn = @mysql_connect(DB_HOST, DB_USER, DB_PWD) or die ('数据库链接失败: '.mysql_error());
  //连接zhiwen
 @mysql_select_db(DB_NAME) or die ('数据库错误: '.mysql_error());
  //设置字符集为UTF8
 @mysql_query('SET NAMES UTF8') or die ('字符集错误: '.mysql_error());

?>
