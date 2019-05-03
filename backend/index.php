<?php

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

// Uploading images to the server

$files = $_FILES['files'];
$names = $files['name'];

array_pop($names);

function generateUniqueName($name, $ext)
{
    $id = uniqid();
    $filename = hash('sha256', $name);

    return "{$filename}-{$id}.{$ext}";
}

for ($i = 0; $i < count($names); $i++) {
    $info = pathinfo($files['name'][$i]);
    $basename = $info['basename'];
    $filename = $info['filename'];
    $extension = $info['extension'];

    $targetFileName = 'images/' . $basename;
    $targetDirName = 'images/' . $filename;

    if (file_exists($targetFileName) && is_file($targetFileName)) {
        mkdir($targetDirName);

        $oldFileName = generateUniqueName($filename, $extension);
        $newFileName = generateUniqueName($filename, $extension);

        rename(
            $targetFileName,
            "$targetDirName/{$oldFileName}"
        );
        move_uploaded_file(
            $files['tmp_name'][$i],
            "$targetDirName/{$newFileName}"
        );
    } else if (is_dir($targetDirName)) {
        $newFileName = generateUniqueName($filename, $extension);

        move_uploaded_file(
            $files['tmp_name'][$i],
            "{$targetDirName}/{$newFileName}"
        );
    } else {
        move_uploaded_file(
            $files['tmp_name'][$i],
            "{$targetFileName}"
        );
    }
}