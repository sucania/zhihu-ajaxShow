<?php
 /* 知乎上的：
    标题，描述（可选）
    首页上出现标题和回答中最热门的部分
    评论*/

  /* 标题，描述+评论（用评论代替回答）*/

  // 提问对话框与question数据库的连接，将下面的信息加入到question数据库

  sleep(1);
  require 'config.php';
  // 新增到question
  $query = "INSERT INTO question ( title, content,user,date )
          VALUES ('{$_POST['title']}','{$_POST['content']}','{$_POST['user']}',NOW())";

  mysql_query($query) or die ('新增失败！'.mysql_error());

  echo mysql_affected_rows();

  mysql_close();




 ?>
