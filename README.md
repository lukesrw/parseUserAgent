# Todo

1. Operating System & Version parsing
2. TypeScript and/or JavaScript implementation

# PHP

## Usage

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

# JavaScript

_Coming Soon_
