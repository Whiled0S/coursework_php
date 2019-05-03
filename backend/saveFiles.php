<?php

function generateUniqueName($ext)
{
    $id = uniqid();
    $filename = hash('md5', uniqid());

    return "{$filename}-{$id}.{$ext}";
}

function saveFiles($names, $files) {
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
}