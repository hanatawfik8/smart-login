let loader = document.querySelector('.loader'),
    icon = document.querySelector('i'),
    passwordInput = document.querySelector('#password')

load(displayNone);

icon.addEventListener('click', function () {
    if (icon.classList.contains('fa-eye')) {
        icon.classList.replace('fa-eye', 'fa-eye-slash')
        passwordInput.setAttribute('type', 'text')

    }
    else if (icon.classList.contains('fa-eye-slash')) {
        icon.classList.replace('fa-eye-slash', 'fa-eye')
        passwordInput.setAttribute('type', 'password')
    }
})


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