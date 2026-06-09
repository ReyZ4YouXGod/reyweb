<?php

header("Content-Type: application/json");

if(!isset($_FILES['file'])){
    echo json_encode(["error"=>"no file"]);
    exit;
}

$tmp = $_FILES['file']['tmp_name'];

$ch = curl_init();

$post = [
    "fileToUpload" => new CURLFile($tmp),
    "reqtype" => "fileupload"
];

curl_setopt($ch, CURLOPT_URL, "https://catbox.moe/user/api.php");
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$res = curl_exec($ch);
curl_close($ch);

echo json_encode(["link"=>$res]);

?>
