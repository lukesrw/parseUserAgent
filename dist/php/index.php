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
        $regexes = json_decode(file_get_contents("./regex.json"), true);
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
            } elseif (array_key_exists('v', $info)) {
                $result['version'] = $info['v'];
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

function parseIsMobile($user_agent = null) 
{
    $browser = parseBrowser($user_agent);
    $os = parseOperatingSystem($user_agent);

    return (
        in_array($os['operating_system_name'], array(
            'Android',
            'iOS',
            'BlackBerry OS',
            'PlayStation Portable System Software'
        )) ||
        in_array($browser['browser_name'], array(
            'Nokia Web Browser',
            'Opera Mini'
        )) ||
        preg_match('/(^|\s|\(|ie)mobile(safari)?/iu', $user_agent)
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
        parseOperatingSystem($user_agent),
        array(
            'is_mobile' => parseIsMobile($user_agent)
        )
    );
}

function parseWindowsVersion($old_version) {
    $version = $old_version;
    if (is_array($version)) {
        $version = $version['operating_system_version'];
    }

    switch (round($version, 1, PHP_ROUND_HALF_DOWN)) {
        case 4:
            $version = "95";
            break;

        case 4.1:
            $version = "98";
            break;

        case 5:
            $version = "2000";
            break;

        case 4.9:
            $version = "Me";
            break;

        case 5.1:
        case 5.2:
            $version = "XP";
            break;

        case 6:
            $version = "Vista";
            break;

        case 6.1:
            $version = "7";
            break;

        case 6.2:
            $version = "8";
            break;

        case 6.3:
            $version = "8.1";
            break;
    }

    if (is_array($old_version)) {
        $old_version['operating_system_version'] = $version;

        return $old_version;
    }

    return $version;
}