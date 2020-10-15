# Description

parseUserAgent is a function that takes a user agent and returns the name and version of the corresponding browser & operating system.

## The Wheel

There are _many_ libraries and solutions for this problem, but I decided to re-invent the wheel and write my own as I've not found one that did all of the following:

1. Pattern-based, I don't want to store huge lists of known-good agents
2. Local, I don't want to send requests to (or pay for) an external API
3. Reliable, I've tested lots of libraries, many have incorrect results
4. Specific, I don't just want the main 6~ and then "Other"

# Usage

## PHP

```php
<?php

$user_agent = $_SERVER['HTTP_USER_AGENT'];
// Mozilla/5.0 (Linux; Android 10; BLA-L09) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.96 Mobile Safari/537.36 (Ecosia android@78.0.3904.96)

print_r(
    parseUserAgent($user_agent)
);
```

The above code will output:

```
Array
(
    [browser_name] => Ecosia Browser
    [browser_version] => android@78.0.3904.96
    [operating_system_name] => Android
    [operating_system_version] => 10
    [is_mobile] => 1
)
```

## JavaScript

```js
let user_agent = request.headers["user-agent"];
// Mozilla/5.0 (Linux; Android 10; BLA-L09) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.96 Mobile Safari/537.36 (Ecosia android@78.0.3904.96)

console.table(parseUserAgent(user_agent));
```

The above code will output:

```
┌──────────────────────────┬────────────────────────┐
│         (index)          │         Values         │
├──────────────────────────┼────────────────────────┤
│       browser_name       │    'Ecosia Browser'    │
│     browser_version      │ 'android@78.0.3904.96' │
│  operating_system_name   │       'Android'        │
│ operating_system_version │          '10'          │
│        is_mobile         │          true          │
└──────────────────────────┴────────────────────────┘
```
