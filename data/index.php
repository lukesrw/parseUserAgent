<?php
/**
 * Strip JSON pretty print from regex_raw
 */
file_put_contents(
    './regex.json',
    json_encode(
        json_decode(
            file_get_contents('./regex_raw.json'),
            true
        )
    )
);