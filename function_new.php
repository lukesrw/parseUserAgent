<?php
$sample_data = file_get_contents('./data/user-agents.json');
$sample_data = json_decode($sample_data, true);

function parseUserAgent($user_agent = null)
{
    static $regexes = false;
    if (! $regexes) {
        $regexes = json_decode(
            file_get_contents('./data/regex.json'),
            true
        );
    }

    $result = array(
        'weight' => 0,
        'browser_name' => 'Unknown Browser',
        'browser_version' => 'Unknown Browser Version'
    );

    foreach ($regexes as $regex => $info) {
        if (
            preg_match($regex, $user_agent, $matches) &&
            $info['weight'] > $result['weight']
        ) {
            $result = $info;
            if (
                array_key_exists('browser_version', $matches) &&
                $matches['browser_version']
            ) {
                $result['browser_version'] = $matches['browser_version'];
            } elseif (! array_key_exists('browser_version', $result)) {
                $result['browser_version'] = 'Unknown Browser Version';
            }
        }
    }

    $result['browser_name'] = trim($result['browser_name']);
    $result['browser_version'] = trim($result['browser_version']);

    unset($result['weight']);

    return $result;
}