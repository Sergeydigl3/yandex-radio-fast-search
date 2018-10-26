
String.prototype.format = String.prototype.f = function () {
    var args = arguments;
    return this.replace(/\{(\d+)\}/g, function (m, n) {
        return args[n] ? args[n] : m;
    });
};

if (localStorage['default_link'] == null) localStorage['default_link'] = 'https://soundcloud.com/search?q={0}';
if (localStorage['default_name'] == null) localStorage['default_name'] = 'SoundCloud';

$(".head__right").prepend("<a id=\"getsearch\" class=\"getsearch\">Найти в " + localStorage['default_name'] + "</a>");
$(".head__right").prepend("<style>.getsearch{padding: 0 1vh;text-decoration:none;cursor: default;outline:none;display:inline-block;height:4vh;line-height:4vh;border-radius:4.1vh;margin:1vh 1.9vh;font-family:\'Montserrat\',sans-serif;font-size:1.25vh;text-transform:uppercase;text-align:center;letter-spacing:0.27vh;font-weight:600;color:#524f4e;background:white;box-shadow:0 0.74vh 1.38vh rgba(0,0,0,.1);transition:.3s}.getsearch:hover{background:#ffdb4d;box-shadow:0 1.38vh 1.9vh rgba(255, 219, 77,.4);color:#000;transform:translateY(-0.64vh)}</style>");
document.getElementById('getsearch').addEventListener("click", event_link_start);

function get_name() {
    var title_music = document.getElementsByClassName('player-controls__title')[0].getAttribute('title');
    var artist_music = document.getElementsByClassName('player-controls__artists')[0].getElementsByTagName('span')[0].innerText;
    return title_music + ' ' + artist_music;
}

function generate_link(full_request) {
    console.log(localStorage['default_link']);
    console.log(full_request);
    var full_link = localStorage['default_link'].format(full_request);
    window.open(full_link)
}

function event_link_start() {
    generate_link(get_name())
}

