<?php
  header("Access-Control-Allow-Origin: *");
  header('Content-Type: application/json');

  $response = [
    'name' => $_POST["name"]
  ];
  
  print json_encode($response);
?>