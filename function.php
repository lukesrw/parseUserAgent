<?php
/**
 * @param string $user_agent to parse
 *
 * @return array Match data
 */
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
        'w' => 0,
        'browser_name' => 'Unknown Browser',
        'browser_version' => 'Unknown Browser Version'
    );

    foreach ($regexes as $regex => $info) {
        if (
            preg_match($regex, $user_agent, $matches) &&
            $info['w'] > $result['w']
        ) {
            $result = $info;

            $result['browser_name'] = $result['bn'];
            unset($result['bn']);

            if (array_key_exists('bv', $matches) && $matches['bv']) {
                $result['browser_version'] = $matches['bv'];
            } elseif (! array_key_exists('browser_version', $result)) {
                $result['browser_version'] = 'Unknown Browser Version';
            }
        }
    }

    $result['browser_name'] = trim($result['browser_name']);
    $result['browser_version'] = trim($result['browser_version']);

    unset($result['w']);

    return $result;
}