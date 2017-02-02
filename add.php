<?php
 //将下面这些信息加入到user数据库，一般用于注册。
  sleep(2);
  require 'config.php';   //引入核心文件
  //写一个新增的SQL语句
  $query = "INSERT INTO user(user,pass,email,sex,birthday,date)
            VALUES('{$_POST['user']}',sha1('{$_POST['pass']}'),'{$_POST['email']}','{$_POST['sex']}','{$_POST['birthday']}',NOW())";

  mysql_query($query) or die('新增失败!'.mysql_error()); //执行SQL语句

  echo mysql_affected_rows();

  mysql_close();

 ?>
