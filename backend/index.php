<?php

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

// Uploading images to the server

if (count($_FILES) > 0) {
    $files = $_FILES['files'];
    $names = $files['name'];

    array_pop($names);

    if (count($names) === 0)
        print(json_encode(['empty' => true]));
    else {
        include_once "./saveFiles.php";

        try {
            saveFiles($names, $files);

            print(json_encode(['success' => true]));
        } catch (Exception $exception) {
            print(json_encode(['success' => false]));
        }
    }
} else {
    print(count($_FILES));
}
