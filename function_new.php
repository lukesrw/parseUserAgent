<?php
$sample_data = file_get_contents('./data/user-agents.json');
$sample_data = json_decode($sample_data, true);

$found_words = array();

$regex_matches = array(
    '/2345explorer/' => '2345 Explorer',
    '/360[s|e]e/' => '360 Browser',
    '/nintendo 3ds/' => 'Nintendo 3DS Browser',
    '/kuaiso/' => '7 Star Browser',
    '/abolimba/' => 'Abolimba',
    '/abrowse\b/' => 'ABrowse',
    '/acoo browser/' => 'Acoo Browser',
    '/alienforce/' => 'Alienforce',
    '/amaya/' => 'Amaya',
    '/amiga-aweb/' => 'Amiga Aweb',
    '/amigavoyager/' => 'Amiga Voyager',
    '/amigo/' => 'Amigo',
    '/antfresco/' => 'ANT Fresco',
    '/antgalio/' => 'ANT Galio',
    '/aol\b/' => 'AOL Explorer',
    '/aolshield/' => 'AOL Shield',
    '/arora/' => 'Arora',
    '/avant(\s|b)/' => 'Avant Browser',
    '/avast|asw/' => 'Avast Secure Browser',
    '/aviator/' => 'Aviator',
    '/avirascout/' => 'Avira Scout',
    '/baidubrowser/' => 'Baidu Browser',
    '/spark\//' => 'Baidu Spark',
    '/basilisk/' => 'Basilisk',
    '/beamrise/' => 'Beamrise',
    '/beonex/' => 'Beonex',
    '/blackbird/' => 'Blackbird',
    '/blackhawk/' => 'BlackHawk',
    '/bolt/' => 'Bolt',
    '/brave/' => 'Brave',
    '/briskbard/' => 'BriskBard',
    '/browzar/' => 'Browzar',
    '/bunjalloo/' => 'Bunjalloo',
    '/camino|chimera/' => 'Camino',
    '/charon/' => 'Charon',
    '/chedot/' => 'Chedot',
    '/cheshire/' => 'Cheshire',
    '/headlesschrome/' => 'Chrome Headless',
    '/chromium/' => 'Chromium',
    '/\sdragon\b/' => 'Chromodo',
    '/classilla/' => 'Classila',
    '/lbbrowser|acheetahi|liebaofast/' => 'CM Browser',
    '/corom|coc_coc_browser/' => 'Coc Coc',
    '/columbus/' => 'Columbus',
    '/cometbird/' => 'CometBird',
    '/comodo_dragon/' => 'Comodo Dragon',
    '/conkeror/' => 'Conkeror',
    '/coolnovo/' => 'CoolNovo',
    '/crazy browser/' => 'Crazy Browser',
    '/cuam/' => 'Cuam',
    '/cunaguaro/' => 'Cunaguaro',
    '/cyberdog/' => 'Cyberdog',
    '/cyberfox/' => 'Cyberfox',
    '/deepnet explorer/' => 'Deepnet Explorer',
    '/demeter/' => 'Demeter',
    '/deskbrowse/' => 'DeskBrowse',
    '/dillo/' => 'Dillo',
    '/doczilla/' => 'DocZilla',
    '/dooble/' => 'Dooble',
    '/dplus/' => 'DPlus',
    '/edbrowse/' => 'Edbrowse',
    '/elinks/' => 'Elinks',
    '/enigma browser/' => 'Enigma Browser',
    '/epic/' => 'Epic',
    '/escape/' => 'Espial TV Browser',
    '/firebird/' => 'Firebird',
    '/bonecho|granparadiso|lorentz|minefield|namoroka|shiretoko/' => 'Firefox',
    '/fireweb navigator/' => 'Fireweb Navigator',
    '/flock/' => 'Flock',
    '/fluid/' => 'Fluid',
    '/framafox/' => 'Framafox',
    '/navigateur web/' => 'Freebox Browser',
    '/freeu/' => 'FreeU',
    '/galeon/' => 'Galeon',
    '/globalmojo/' => 'GlobalMojo',
    '/epiphany/' => 'GNOME Web',
    '/greenbrowser/' => 'GreenBrowser',
    '/hotjava/' => 'HotJava',
    '/hv3/' => 'Hv3',
    '/hydra browser/' => 'Hydra Browser',
    '/ibm webexplorer/' => 'IBM WebExplorer',
    '/ibrowse\b/' => 'IBrowse',
    '/icab/' => 'iCab',
    '/ice\s?browser/' => 'ICE Browser',
    '/iceape/' => 'IceApe',
    '/icecat/' => 'IceCat',
    '/icedragon/' => 'IceDragon',
    '/iceweasel/' => 'IceWeasel',
    '/internetsurfboard/' => 'InternetSurfboard',
    '/irider/' => 'iRider',
    '/iridium/' => 'Iridium',
    '/iron/' => 'Iron',
    '/k-meleon/' => 'K-Meleon',
    '/k-ninja/' => 'K-Ninja',
    '/kapiko/' => 'Kapiko',
    '/kazehakase/' => 'Kazehakase',
    '/kinza/' => 'Kinza',
    '/strata/' => 'Kirix Strata',
    '/kkman/' => 'KKman',
    '/konqueror/' => 'Konqueror',
    '/kylo/' => 'Kylo',
    '/lbrowser/' => 'LBrowser',
    '/cern-linemode/' => 'Line Mode Browser',
    '/links\s/' => 'Links',
    '/lobo/' => 'Lobo',
    '/lolifox/' => 'lolifox',
    '/lovense/' => 'Lovense Browser',
    '/lunascape/' => 'Lunascape',
    '/lynx/' => 'Lynx',
    '/madfox/' => 'Madfox',
    '/maple/' => 'Maple Browser',
    '/maxthon|mxbrowser|myie2/' => 'Maxthon',
    '/edge/' => 'Microsoft Edge',
    '/midori/' => 'Midori',
    '/min\//' => 'Min',
    '/minibrowser/' => 'Mini Browser',
    '/multi-browser/' => 'Multi-Browser XP',
    '/multizilla/' => 'MultiZilla',
    '/mxnitro/' => 'MxNitro',
    '/myibrow/' => 'My Internet Browser'
);

$skip_browsers = array(
    'Amigo',
    'Chrome',
    'Firefox',
    'Internet Explorer',
    'Mozilla'
);

$regex = false;
// $regex = '/myibrow/';

$last_browser = false;

echo '<pre>';

foreach ($sample_data as $browser => $data) {
    if (in_array($browser, $skip_browsers)) {
        continue;
    }

    foreach ($data['list'] as $example) {
        $example = strtolower($example);

        foreach (array_keys($regex_matches) as $regex_match) {
            if (preg_match($regex_match, $example)) {
                continue 2;
            }
        }

        if (!$regex || preg_match($regex, $example, $matches)) {
            if (isset($matches)) {
                foreach ($matches as $match) {
                    $example = str_replace(
                        $match,
                        '<b>' . $match . '</b>',
                        $example
                    );
                }
            }

            if ($last_browser != $browser) {
                if ($last_browser) {
                    echo '<hr/>';
                }
                $last_browser = $browser;
            }

            echo sprintf(
                'Matching "%1$s" (%2$s)' . "\n",
                $browser,
                $example
            );
        }
    }
}