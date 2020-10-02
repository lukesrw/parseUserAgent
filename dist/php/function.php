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

    $weight = 0;
    $result = array(
        'browser_name' => 'Unknown Browser',
        'browser_version' => 'Unknown Browser Version'
    );

    foreach ($regexes as $regex => $info) {
        if (preg_match($regex, $user_agent, $matches) && $info['w'] > $weight) {
            $weight = $info['w'];

            $result['browser_name'] = $info['bn'];

            if (array_key_exists('bv', $matches) && $matches['bv']) {
                $result['browser_version'] = $matches['bv'];
            } elseif (! array_key_exists('browser_version', $result)) {
                $result['browser_version'] = 'Unknown Browser Version';
            }
        }
    }

    $result['browser_name'] = trim($result['browser_name']);
    $result['browser_version'] = trim($result['browser_version']);

    return $result;
}