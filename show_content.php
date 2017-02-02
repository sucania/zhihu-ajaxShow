<?php
 require 'config.php';
 // 选择这四个字段的数据，我们把它拿出来,然后选择question数据表,按日期排序，从新到旧的顺序，每页只
 // 显示五条。
 $query = mysql_query("SELECT title,content,user,date FROM question ORDER BY date DESC LIMIT 0,5")
          or die ('SQL 错误！');

 $json = '';
//转码
 while (!!$row = mysql_fetch_array($query, MYSQL_ASSOC)) {
   foreach ($row as $key => $value) {
     $row[$key] = urlencode(str_replace("\n","",$value));
   }
   $json .= urldecode(json_encode($row)).',';
 }

 echo '['.substr($json,0,strlen($json) - 1).']';

 mysql_close();



 ?>
