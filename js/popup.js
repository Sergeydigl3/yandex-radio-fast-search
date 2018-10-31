function showHide() {
    console.log(document.getElementById('create_sets').style.display);
    if (document.getElementById('create_sets').style.display === "none") {
        document.getElementById('create_sets').style.display = "block";
        document.getElementById('new_sets').style.background = "#ffdb4d";
    } else {
        document.getElementById('create_sets').style.display = "none";
        document.getElementById('new_sets').style.background = "#ffffff";
    }
}

function hideCreateSet(value) {
    document.getElementById(value).addEventListener("focus", function () {
        document.getElementById('create_sets').style.display = "none";
        document.getElementById('new_sets').style.background = "#ffffff";
    });
}

document.getElementById('create_sets').style.display = "none";
document.getElementById('new_sets').addEventListener("click", showHide);

hideCreateSet('vk');
hideCreateSet('sc');
hideCreateSet('ya');

const vkLink = 'https://vk.com/audios318245880?q={0}';
const vkName = 'VK';
const scLink = 'https://soundcloud.com/search?q={0}';
const scName = 'SoundCloud';
const yaLink = 'https://music.yandex.ru/search?text={0}';
const yaName = 'Yandex.Music';

//input control
function set_input_error(text) {
    document.getElementById('error_text').innerHTML = text
}
function set_input_border(border) {
    document.getElementById('set_link').style.border = border;
}

//preset control
function setPreset(value) {
    chrome.storage.sync.set({"default_link": value});
    localStorage['default_link'] = value;
    console.log(localStorage['default_link']);
}
function setName(value) {
    chrome.storage.sync.set({"default_name": value});
    localStorage['default_name'] = value;
    console.log(localStorage['default_name']);
}
function check_rules(input) {
    if (!(input.startsWith('http://') || input.startsWith('https://'))) return 1;
    if (!(input.includes('{0}'))) return 2;
    return 3;
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

//input listners
const input = document.getElementById('set_link');
input.addEventListener("input", function () {
    if (input.value === "") {
        set_input_error('');
        set_input_border("3px solid #ffdb4d");
    }
    else {
        const result = check_rules(input.value);
        switch (result) {
            case 1:
                set_input_border("3px solid #ff3432");
                set_input_error('Строка не начинается с http:// или https://');
                break;

            case 2:
                set_input_border("3px solid #ff3432");
                set_input_error('Строка не содержит {0}');
                break;

            case 3:
                set_input_border("3px solid #228b22");
                set_input_error('');
                break;
        }
        console.log(result);
    }
});
input.addEventListener("blur", function () {
    const temp_border = input.style.border;
    switch (temp_border) {
        case "3px solid rgb(255, 219, 77)": //yellow
            input.style.border = "1px dashed rgb(255, 219, 77)";
            break;
        case "3px solid rgb(255, 52, 50)": //red
            input.style.border = "1px dashed rgb(255, 52, 50)";
            break;
        case "3px solid rgb(34, 139, 34)": //green
            input.style.border = "1px dashed rgb(34, 139, 34)";
            break;
    }
});
input.addEventListener("focus", function () {
    const temp_border = input.style.border;
    switch (temp_border) {
        case "1px dashed rgb(255, 219, 77)": //yellow
            input.style.border = "3px solid rgb(255, 219, 77)";
            break;
        case "1px dashed rgb(255, 52, 50)": //red
            input.style.border = "3px solid rgb(255, 52, 50)";
            break;
        case "1px dashed rgb(34, 139, 34)": //green
            input.style.border = "3px solid rgb(34, 139, 34)";
            break;
    }
});

// Save button
document.getElementById('save_btn').addEventListener("click", function () {
    if (check_rules(input.value) === 3) {
        setPreset(input.value);
        setName(input.value.replace('https://','').replace('http://','').split('/')[0]);
        console.log('SAVED');
    }});
