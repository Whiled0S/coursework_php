<?php

include "./lib/helpers.php";
include "./classes/ImageLoader.php";

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

// Uploading images to the server

$response = [
    'success' => false,
    'empty' => false,
    'incorrect' => false,
    'small' => false,
    'internal' => false
];

$files = makeFilesArrayFromPost($_FILES['files']);

$ImageLoader = new ImageLoader($files);

try {
    $ImageLoader->uploadFiles();

    $response['success'] = true;
} catch (Exception $exception) {
    $code = $exception->getMessage();

    switch ($code) {
        case 1:
            $response['empty'] = true;
            break;
        case 2:
            $response['incorrect'] = true;
            break;
        case 3:
            $response['small'] = true;
            break;
        default:
            $response['internal'] = true;
    }
}

print(json_encode($response));