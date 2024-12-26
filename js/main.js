let loader = document.querySelector('.loader'),
    icon = document.querySelector('i'),
    passwordInput = document.querySelector('#password'),
    signName = document.querySelector('.signName'),
    signEmail = document.querySelector('.signEmail'),
    signPassword = document.querySelector('.signPassword'),
    signBtn = document.querySelector('.signBtn'),
    accounts = []


signBtn.addEventListener('click', () => {
    let acc = {
        name: signName.value.trim(),
        email: signEmail.value.trim(),
        pass: signPassword.value.trim()
    }
    accounts.push(acc)
    addToLocalStorage()
})


load(displayNone);

icon.addEventListener('click', () => {
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

function addToLocalStorage() {
    localStorage.setItem('accounts', JSON.stringify(accounts))
}

