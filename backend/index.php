<?php

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

// Uploading images to the server

$response = [
    'success' => false,
    'empty' => false,
    'incorrect' => false,
    'small' => false,
    'corrupted' => false
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
            $message = $exception->getMessage();

            switch ($message) {
                case "incorrect format":
                    $response['incorrect'] = true;
                    break;
                case "small":
                    $response['small'] = true;
                    break;
                case "file is corrupted":
                    $response['corrupted'] = true;
                    break;
                default:
                    break;
            }
        }
    }

    print(json_encode($response));
}
