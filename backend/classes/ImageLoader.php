<?php

include_once "{$_SERVER['DOCUMENT_ROOT']}/coursework_php/backend/lib/helpers.php";

class ImageLoader
{
    const RESOLUTION = [
        'width' => 300,
        'height' => 400
    ];

    private $images_arr = array();

    public function __construct($images_arr)
    {
        $this->images_arr = $images_arr;
    }

    public function uploadFiles()
    {
        $this->validate();
        $this->saveFiles();
    }

    private function validate()
    {
        if (count($this->images_arr) == 0)
            throw new Exception(1);

        foreach ($this->images_arr as $image) {
            $image_size = getimagesize($image['tmp_name']);
            list ($width, $height) = $image_size;

            if ($image_size['mime'] != 'image/jpeg')
                throw new Exception(2);


            if (
                $width < self::RESOLUTION['width'] ||
                $height < self::RESOLUTION['height']
            )
                throw new Exception(3);
        }
    }

    private function resizeImage($image)
    {
        $resized_image = imagecreatetruecolor(self::RESOLUTION['width'], self::RESOLUTION['height']);
        $uploaded_image = imagecreatefromjpeg($image['tmp_name']);
        list($width, $height) = getimagesize($image['tmp_name']);

        imagecopyresampled(
            $resized_image,
            $uploaded_image,
            0, 0, 0, 0,
            self::RESOLUTION['width'],
            self::RESOLUTION['height'],
            $width,
            $height
        );

        return $resized_image;
    }

    private function saveFiles()
    {
        foreach ($this->images_arr as $image) {
            $info = pathinfo($image['name']);

            $directory = "images/" . $info['filename'];
            $filename = generateUniqueName($info['extension']);

            $image = $this->resizeImage($image);

            if (!is_dir($directory)) mkdir($directory);

            imagejpeg($image, $directory . '/' . $filename);
            imagedestroy($image);
        }
    }
}