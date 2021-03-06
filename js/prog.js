String.prototype.format = String.prototype.f = function () {
    var args = arguments;
    return this.replace(/\{(\d+)\}/g, function (m, n) {
        return args[n] ? args[n] : m;
    });
};

chrome.storage.sync.get(['default_link','default_name'], function (result) {
    console.log(1);
    localStorage['temp_link'] = result.default_link;
    localStorage['temp_name'] = result.default_name;
});
console.log(localStorage['temp_link'],'\n',localStorage['temp_name']);
if (localStorage['temp_link'] == null) {localStorage['temp_link'] = 'https://soundcloud.com/search?q={0}'; console.log('Set link')}
if (localStorage['temp_name'] == null) {localStorage['temp_name'] = 'SoundCloud'; console.log('Set name')}

$(".head__right").prepend("<a id=\"getsearch\" class=\"getsearch\">Найти в " + localStorage['temp_name'] + "</a>");
$(".head__right").prepend("<style>.getsearch{padding: 0 1vh;text-decoration:none;cursor: default;outline:none;display:inline-block;height:4vh;line-height:4vh;border-radius:4.1vh;margin:1vh 1.9vh;font-family:Arial, Helvetica, sans-serif;font-size:1.25vh;text-transform:uppercase;text-align:center;letter-spacing:0.27vh;font-weight:600;color:#524f4e;background:white;box-shadow:0 0.74vh 1.38vh rgba(0,0,0,.1);transition:.3s}.getsearch:hover{background:#ffdb4d;box-shadow:0 1.38vh 1.9vh rgba(255, 219, 77,.4);color:#000;transform:translateY(-0.64vh)}</style>");
document.getElementById('getsearch').addEventListener("click", function () {
    generate_link(get_name())
});


function get_name() {
    // mus=externalAPI.getCurrentTrack();
    // if(mus != null){return mus.title+' '+mus.artists[0].title}
    // else return false;

    var title_music = document.getElementsByClassName('player-controls__title')[0].getAttribute('title');
    var artist_music = document.getElementsByClassName('player-controls__artists')[0].getElementsByTagName('span')[0].innerText;
    return title_music + ' ' + artist_music;
}

function generate_link(full_request) {
    if(full_request === false){alert('Трек не играет');return;}
    chrome.storage.sync.get(['default_link'], function (result) {
        localStorage['temp_link'] = result.default_link
    });
    console.log(localStorage['temp_link']);
    console.log(full_request);
    var full_link = localStorage['temp_link'].format(full_request);
    window.open(full_link)
}


