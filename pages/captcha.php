<?php
session_start();
$image = imagecreatetruecolor(80, 30);
$bgcolor = imagecolorallocate($image, 255, 255, 255);
imagefill($image, 0, 0, $bgcolor);
/*
for ($i=0; $i < 4; $i++) {
    $fontsize = 6;
    $fontcolor = imagecolorallocate($image, mt_rand(0,120), mt_rand(0,120), mt_rand(0,120));
    $fontcontent = mt_rand(0,9);
    $x = ($i*80/4) + mt_rand(0,9);
    $y = mt_rand(5,10);
    imagestring($image, $fontsize, $x, $y, $fontcontent, $fontcolor);
}
*/
$captch_code = '';
for ($i=0; $i < 4; $i++) {
    $fontsize = 5;
    $fontcolor = imagecolorallocate($image, mt_rand(0,120), mt_rand(0,120), mt_rand(0,120));
    $data = 'abcedfghijkmnopqrstuvwxy3456789';
    $fontcontent = $data[mt_rand(0,strlen($data)-1)];
    $captch_code .= $fontcontent;
    $x = ($i*80/4) + mt_rand(5,10);
    $y = mt_rand(5,10);
    imagestring($image, $fontsize, $x, $y, $fontcontent, $fontcolor);
}
$_SESSION['authcode'] = $captch_code;
for ($i=0; $i < 200; $i++) {
    $pointcolor = imagecolorallocate($image, mt_rand(50,200), mt_rand(50,200), mt_rand(50,200));
    imagesetpixel($image, mt_rand(1,79), mt_rand(1,29), $pointcolor);
}
for ($i=0; $i < 3; $i++) {
    $linecolor = imagecolorallocate($image, mt_rand(80,220), mt_rand(80,220), mt_rand(80,220));
    imageline($image, mt_rand(1,79), mt_rand(1,29), mt_rand(1,79), mt_rand(1,29), $linecolor);
}
header('content-type: image/png');
imagepng($image);
// 销毁图片回收内存
imagedestroy($image);