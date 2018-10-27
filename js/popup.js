function showHide() {
    console.log(document.getElementById('create_sets').style.display);
    if (document.getElementById('create_sets').style.display == "none") {
        document.getElementById('create_sets').style.display = "block";
        document.getElementById('new_sets').style.background = "#ffdb4d";
    } else {
        document.getElementById('create_sets').style.display = "none";
        document.getElementById('new_sets').style.background = "#ffffff";
    }
}
function

document.getElementById('create_sets').style.display = "none";
document.getElementById('new_sets').addEventListener("click", showHide);
document.getElementById('vk').addEventListener("click", showHide);
document.getElementById('sc').addEventListener("click", showHide);
document.getElementById('ya').addEventListener("click", showHide);

const vkLink = 'https://vk.com/audios318245880?q={0}';
const vkName = 'VK';
const scLink = 'https://soundcloud.com/search?q={0}';
const scName = 'SoundCloud';
const yaLink = 'https://music.yandex.ru/search?text={0}';
const yaName = 'Yandex.Music';

function setPreset(value) {
    chrome.storage.sync.set({"default_link": value});
    console.log(localStorage['default_link']);
}

function setName(value) {
    chrome.storage.sync.set({"default_name": value});
    console.log(localStorage['default_name']);
}

// On click
document.getElementById('vk').addEventListener("click", function () {
    setName(vkName);
    setPreset(vkLink);
});
document.getElementById('sc').addEventListener("click", function () {
    setName(scName);
    setPreset(scLink);
});
document.getElementById('ya').addEventListener("click", function () {
    setName(yaName);
    setPreset(yaLink);
});
