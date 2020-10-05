# Description

parseUserAgent is a function that takes a user agent and returns the name and version of the corresponding browser & operating system.

## The Wheel

There are _many_ libraries and solutions for this problem, but I decided to re-invent the wheel and write my own as I've not found one that did all of the following:

1. Pattern-based, I don't want to store huge lists of known-good agents
2. Local, I don't want to send requests to (or pay for) an external API
3. Reliable, I've tested lots of libraries, many have incorrect results
4. Specific, I don't just want the main 6~ and then "Other"

# Todo

1. Operating System & Version parsing
2. Explore cache (normal, session, or temp-file) solutions

# Usage

## PHP

```php
<?php

$user_agent = $_SERVER['HTTP_USER_AGENT'];
// Mozilla/5.0 (X11; Linux x86_64; rv:2.0b9pre) Gecko/20110111 Firefox/4.0b9pre

print_r(
    parseUserAgent($user_agent)
);
```

The above code will output:

```
Array
(
    [browser_name] => Firefox
    [browser_version] => 4.0b9pre
)
```

## JavaScript

```js
let user_agent = request.headers["user-agent"];
// Mozilla/5.0 (X11; Linux x86_64; rv:2.0b9pre) Gecko/20110111 Firefox/4.0b9pre

console.table(parseUserAgent(user_agent));
```

The above code will output:

```
┌─────────────────┬────────────┐
│     (index)     │   Values   │
├─────────────────┼────────────┤
│  browser_name   │ 'Firefox'  │
│ browser_version │ '4.0b9pre' │
└─────────────────┴────────────┘
```
