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

    $user_agent = strtolower($user_agent);
    $result = array(
        'info' => array(
            'weight' => 0
        )
    );

    foreach ($regexes as $regex => $info) {
        if (
            preg_match($regex, $user_agent, $matches) &&
            $info['weight'] > $result['info']['weight']
        ) {

            $result['info'] = $info;
            $result['matches'] = $matches;
        }
    }

    if ($result['info']['weight'] == 0) {
        $result['info']['browser_name'] = 'Unknown Browser';
    }

    return $result;
}