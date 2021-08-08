# parseUserAgent

## Description

parseUserAgent is a function that takes a user agent and returns the name and version of the corresponding browser & operating system.

### The Wheel

There are _many_ libraries and solutions for this problem, but I decided to re-invent the wheel and write my own as I've not found one that did all of the following:

1.  Pattern-based, I don't want to store huge lists of known-good agents
2.  Local, I don't want to send requests to (or pay for) an external API
3.  Reliable, I've tested lots of libraries, many have incorrect results
4.  Specific, I don't just want the main 6~ and then "Other"

### Principles & Methodology

-   Name should be the official name and casing/style used by the developers, for example:
    -   "Edge" should be "Microsoft Edge", as this is what Microsoft calls it
    -   "surf" is the official name of the web browser from suckless.org not "Surf"
-   Name should be the most recent name for that software, for example:
    -   Previously officially called "[Microsoft/Windows] Internet Explorer", it is now just "Internet Explorer"
-   Version should be the release version number, not the official public name, for example:
    -   "Windows XP" is the official public name, which may refer to "Windows 5.1" or "Windows 5.2"
        -   See below for usage of the "parseWindowsVersion" function
-   Version should ideally start with a number, but never start with "v", for example:
    -   "IBM WebExplorer /v0.94" should return "IBM WebExplorer" & "0.94"

## Usage

### PHP

```php
<?php

$user_agent = $_SERVER['HTTP_USER_AGENT'];
// Mozilla/5.0 (Linux; Android 10; BLA-L09) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.96 Mobile Safari/537.36 (Ecosia android@78.0.3904.96)

print_r(
    parseUserAgent($user_agent)
);
```

The above code will output:

```txt
Array
(
    [browser_name] => Ecosia Browser
    [browser_version] => android@78.0.3904.96
    [operating_system_name] => Android
    [operating_system_version] => 10
    [is_mobile] => 1
)
```

### JavaScript

```js
let user_agent = request.headers["user-agent"];
// Mozilla/5.0 (Linux; Android 10; BLA-L09) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.96 Mobile Safari/537.36 (Ecosia android@78.0.3904.96)

console.table(parseUserAgent(user_agent));
```

The above code will output:

```txt
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

### parseWindowsVersion

Included in both PHP and JavaScript versions, is a function to convert Windows versions to public names:

```js
let user_agent = request.headers["user-agent"];
// Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-CN) AppleWebKit/523.15 (KHTML, like Gecko, Safari/419.3) Arora/0.3 (Change: 287 c9dfb30)

let user_agent_parsed = parseUserAgent(user_agent);

console.table(user_agent_parsed);

user_agent_parsed = parseWindowsVersion(user_agent_parsed);

console.table(user_agent_parsed);
```

The above code will output:

```txt
┌──────────────────────────┬───────────┐
│         (index)          │  Values   │
├──────────────────────────┼───────────┤
│       browser_name       │  'Arora'  │
│     browser_version      │   '0.3'   │
│  operating_system_name   │ 'Windows' │
│ operating_system_version │   '5.1'   │
│        is_mobile         │   false   │
└──────────────────────────┴───────────┘
┌──────────────────────────┬───────────┐
│         (index)          │  Values   │
├──────────────────────────┼───────────┤
│       browser_name       │  'Arora'  │
│     browser_version      │   '0.3'   │
│  operating_system_name   │ 'Windows' │
│ operating_system_version │   'XP'    │
│        is_mobile         │   false   │
└──────────────────────────┴───────────┘
```

Function accepts either a JavaScript object/PHP array with "operating_system_version" key, or just a string:

```js
console.log(parseWindowsVersion("5.1")); // XP
```
