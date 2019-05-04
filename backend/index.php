<?php

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

// Uploading images to the server

$response = [
    'success' => false,
    'empty' => false
];

if (count($_FILES) > 0) {
    $files = $_FILES['files'];
    $names = $files['name'];

    array_pop($names);

    if (count($names) === 0)
        $response['empty'] = true;
    else {
        include_once "./saveFiles.php";

        try {
            saveFiles($names, $files);

            $response['success'] = true;
        } catch (Exception $exception) {
            $response['success'] = false;
        }
    }

    print(json_encode($response));
}
