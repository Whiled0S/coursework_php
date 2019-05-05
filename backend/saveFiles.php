<?php

function generateUniqueName($ext)
{
    $filename = hash('md5', uniqid());

    return "{$filename}.{$ext}";
}

function saveFiles($names, $files)
{
    $resolution = [
        'width' => 300,
        'height' => 400
    ];

    for ($i = 0; $i < count($names); $i++) {
        $info = pathinfo($files['name'][$i]);

        $filename = $info['filename'];
        $extension = $info['extension'];
        $tmp_name = $files['tmp_name'][$i];
        $targetDirName = 'images/' . $filename;

        list($width, $height) = getimagesize($tmp_name);

        if (getimagesize($tmp_name)['mime'] !== 'image/jpeg') {
            if ($extension === 'jpg' || $extension === 'jpeg')
                throw new Exception("file is corrupted");
            throw new Exception("incorrect format");
        }

        if ($width < $resolution['width'] || $height < $resolution['height'])
            throw new Exception("small");

        $image = imagecreatetruecolor($resolution['width'], $resolution['height']);
        $uploadImage = imagecreatefromjpeg($tmp_name);

        imagecopyresampled(
            $image,
            $uploadImage,
            0, 0, 0, 0,
            $resolution['width'],
            $resolution['height'],
            $width,
            $height
        );

        if (is_dir($targetDirName)) {
            $newFileName = generateUniqueName($extension);

            imagejpeg($image, $targetDirName . $newFileName);
            imagedestroy($image);
        } else {
            mkdir($targetDirName);

            $newFileName = generateUniqueName($extension);

            imagejpeg($image, $targetDirName . '/' . $newFileName);
            imagedestroy($image);
        }
    }
}