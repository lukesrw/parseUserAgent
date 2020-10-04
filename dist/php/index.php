<?php
$UNKNOWN = array(
    'browser' => array(
        'name' => 'Unknown Browser'
    ),
    'operating_system' => array(
        'name' => 'Unknown Operating System'
    )
);
$UNKNOWN['browser']['version'] = $UNKNOWN['browser']['name'] . ' Version';
$UNKNOWN['operating_system']['version'] = $UNKNOWN['operating_system']['name'] . ' Version';

/**
 * @param string $category 'browser' or 'operating_system'
 * @param string $user_agent to parse
 *
 * @return array Match data
 */
function parse($category = null, $user_agent = null)
{
    global $UNKNOWN;

    static $regexes = false;
    if (! $regexes) {
        $regexes = json_decode(
            file_get_contents(
                dirname(__DIR__, 2) . '/data/regex.json'
            ),
            true
        );
    }

    $weight = 0;
    $result = array(
        'name' => $UNKNOWN[$category]['name'],
        'version' => $UNKNOWN[$category]['version']
    );

    foreach ($regexes[$category] as $regex => $info) {
        if (preg_match($regex, $user_agent, $matches) && $info['w'] > $weight) {
            $weight = $info['w'];

            $result['name'] = trim($info['n']);

            if (array_key_exists('v', $matches) && $matches['v']) {
                $result['version'] = trim($matches['v']);
            }
        }
    }

    return $result;
}

/**
 * @param string $user_agent to parse
 *
 * @return array Match data
 */
function parseBrowser($user_agent = null)
{
    $result = parse('browser', $user_agent);

    return array(
        'browser_name' => $result['name'],
        'browser_version' => $result['version']
    );
}

/**
 * @param string $user_agent to parse
 *
 * @return array Match data
 */
function parseOperatingSystem($user_agent = null)
{
    $result = parse('operating_system', $user_agent);

    return array(
        'operating_system_name' => $result['name'],
        'operating_system_version' => $result['version']
    );
}

/**
 * @param string $user_agent to parse
 *
 * @return array Match data
 */
function parseUserAgent($user_agent = null)
{
    return array_merge(
        parseBrowser($user_agent),
        parseOperatingSystem($user_agent)
    );
}