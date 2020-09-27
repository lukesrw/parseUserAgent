<?php
require_once 'function_new.php';

$user_agents = file_get_contents('./data/user-agents.json');
$user_agents = json_decode($user_agents, 8);

foreach ($user_agents as $user_agent => $data) {
    foreach ($data['list'] as $test) {
        $result = parse_user_agent($test);

        if ($result['browser_name'] !== $user_agent) {
            echo sprintf(
                'Parsed "%1$s" incorrectly for %2$s - said %3$s<br/>',
                $test,
                $user_agent,
                $result['browser_name']
            );
        }
    }
}