<?php
/**
 * Strip JSON pretty print from regex_raw
 */
file_put_contents(
    './data/regex.json',
    json_encode(
        json_decode(
            file_get_contents('./data/regex_raw.json'),
            true
        )
    )
);