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
            if (array_key_exists('browser_version', $matches) && $matches['browser_version']) {
                $result['browser_version'] = $matches['browser_version'];
            } elseif (! array_key_exists('browser_version', $result)) {
                $result['browser_version'] = 'Unknown Browser Version';
            }
        }
    }

    unset($result['weight']);

    return $result;
}

foreach ($sample_data as $examples) {
    foreach ($examples['list'] as $example) {
        $result = parseUserAgent($example);

        if (
            $result['browser_name'] == 'Unknown Browser' ||
            $result['browser_version'] == 'Unknown Browser Version'
        ) {
            if ($result['browser_name'] == 'Unknown Browser') {
                ob_end_clean();
            }

            echo '<pre>' . print_r(array_merge(
                $result,
                array(
                    'ua' => $example
                )
            ), true) . '</pre>';

            if ($result['browser_name'] == 'Unknown Browser') {
                die();
            }
        }
    }
}