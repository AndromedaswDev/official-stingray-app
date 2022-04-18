const form = document.querySelector('form');
const input = document.querySelector('input');

form.addEventListener('submit', async event => {
    event.preventDefault();
    window.navigator.serviceWorker.register('./sw.js', {
        scope: __uv$config.prefix
    }).then(() => {
        let url = input.value.trim();
        if (!isUrl(url)) url = 'https://www.google.com/search?q=' + url;
        else if (!(url.startsWith('https://') || url.startsWith('http://'))) url = 'http://' + url;


        window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
    });
});

function isUrl(val = ''){
    if (/^http(s?):\/\//.test(val) || val.includes('.') && val.substr(0, 1) !== ' ') return true;
    return false;
};

function iconCloak() {
  if (!arguments[0]) return false;
  (document.querySelector('link[rel="icon"]')|| document.querySelector('link[rel="shortcut icon"]')).href = arguments[0];
  localStorage['icon'] = arguments[0];
}

function titleCloak() {
  if (!arguments[0]) return false;
  document.title = arguments[0];
  localStorage['title'] = arguments[0];
}

function tabReset() {
  delete localStorage['title'];
  delete localStorage['icon'];
  location.reload();
}

addEventListener('load', () => {
  titleCloak(localStorage['title'])
  iconCloak(localStorage['icon'])
})