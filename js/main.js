let loader = document.querySelector('.loader')

load(displayNone);

function load(callback) {
    setInterval(() => {
        loader.style.opacity = '0';
        callback();
    }, 1800)
}

function displayNone() {
    setInterval(() => {
        loader.classList.replace('d-flex', 'd-none')
    }, 1000)
}