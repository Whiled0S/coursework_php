<?php

function makeFilesArrayFromPost($file_post)
{
    $file_array = array();
    $file_count = count($file_post['name']);
    $file_keys = array_keys($file_post);

    for ($i = 0; $i < $file_count; $i++) {
        foreach ($file_keys as $key) {
            $file_array[$i][$key] = $file_post[$key][$i];
        }
    }

    array_pop($file_array); 

    return $file_array;
}

function generateUniqueName($ext)
{
    return hash('md5', uniqid()) . '.' . $ext;
}
