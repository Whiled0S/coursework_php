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

//if (count($_FILES) > 0) {
//    $files = $_FILES['files'];
//    $names = $files['name'];
//
//    array_pop($names);
//
//    if (count($names) === 0)
//        $response['empty'] = true;
//    else {
//        include_once "./saveFiles.php";
//
//        try {
//            saveFiles($names, $files);
//
//            $response['success'] = true;
//        } catch (Exception $exception) {
//            $message = $exception->getMessage();
//
//            switch ($message) {
//                case "incorrect format":
//                    $response['incorrect'] = true;
//                    break;
//                case "small":
//                    $response['small'] = true;
//                    break;
//                case "file is corrupted":
//                    $response['corrupted'] = true;
//                    break;
//                default:
//                    break;
//            }
//        }
//    }
//
//    print(json_encode($response));
//}
