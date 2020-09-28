<?php
$sample_data = file_get_contents('./data/user-agents.json');
$sample_data = json_decode($sample_data, true);

function parseUserAgent($user_agent = null, $debug = false)
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
            if ($debug) {
                echo '<pre>' . print_r($info, true) . '</pre>';
            }

            $result['info'] = $info;
            $result['matches'] = $matches;
        }
    }

    return $result;
}

$user_agent = '';

if ($user_agent) {
    parseUserAgent($user_agent, true);
} else {
    foreach ($sample_data as $browser => $info) {
        $browser = str_replace(
            array(
                ' mobile',
                'mobile '
            ),
            array(
                '',
                ''
            ),
            strtolower($browser)
        );

        foreach ($info['list'] as $user_agent) {
            $result = parseUserAgent($user_agent);

            if (
                $browser != strtolower($result['info']['browser_name']) &&
                substr($browser, 0, strlen($result['info']['browser_name'])) != strtolower($result['info']['browser_name'])
            ) {
                echo sprintf(
                    'Incorrect for "%1$s" with "%2$s" - said %3$s',
                    $browser,
                    $user_agent,
                    $result['info']['browser_name']
                ) . '<br/>';
            }
        }
    }
}