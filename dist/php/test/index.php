<?php
require_once '../index.php';

$user_agents = json_decode(
    file_get_contents('../../../data/user-agents.json'),
    true
);

foreach ($user_agents as $browser_name => $info) {
    foreach ($info['list'] as $user_agent) {
        $result = parseUserAgent($user_agent);

        $browser_name = trim(
            preg_replace(
                '/\s{2}/u',
                " ",
                preg_replace(
                    '/\bmobile\b/ui',
                    '',
                    $browser_name
                )
            )
        );

        if (strtolower($result['browser_name']) !== strtolower($browser_name)) {
            echo sprintf(
                'Said "%1$s" instead of "%2$s" for "%3$s"' . "\n",
                $result['browser_name'],
                $browser_name,
                $user_agent
            );
        }
    }
}