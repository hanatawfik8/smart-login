let loader = document.querySelector('.loader'),
    icon = document.querySelector('i'),
    passwordInput = document.querySelector('#password'),
    signName = document.querySelector('.signName'),
    signEmail = document.querySelector('.signEmail'),
    signPassword = document.querySelector('.signPassword'),
    signBtn = document.querySelector('.signBtn'),
    signEmailAlert = document.querySelector('.signEmailAlert'),
    signPassAlert = document.querySelector('.signPassAlert'),
    signNameAlert = document.querySelector('.signNameAlert'),
    logInLink = document.querySelector('.logIn'),
    accounts = []

load(displayNone);

checkLocalStorage();

signName.addEventListener('input', onInputSignName)
signEmail.addEventListener('input', onInputSignEmail)
signPassword.addEventListener('input', onInputSignPass)
logInLink.addEventListener('click', directToLoginPage)

signBtn.addEventListener('click', () => {
    let acc = {
        name: signName.value.trim(),
        email: signEmail.value.trim().toLowerCase(),
        pass: signPassword.value.trim()
    }
    if (isValidName(acc.name) && isValidEmail(acc.email) && isValidPassword(acc.pass)) {
        if (!repeatedEmail(acc.email)) {
            accounts.push(acc)
            addToLocalStorage()
            directToLoginPage()
        }
    }
})

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

function getFromLocalStorage() {
    return JSON.parse(localStorage.getItem('accounts'))
}

function checkLocalStorage() {
    accounts = getFromLocalStorage() || [];
}

function isValidEmail(email) {
    let regex = /^[a-z0-9][a-z0-9_-]{0,62}[a-z0-9]@[a-z]{1,63}(\.[a-z]{2,10})+$/
    return regex.test(email)
}

function onInputSignEmail() {
    email = signEmail.value.trim().toLowerCase();
    if (isValidEmail(email)) {
        signEmail.classList.remove('is-invalid')
        signEmail.classList.add('is-valid')
        signEmailAlert.classList.replace('d-block', 'd-none')
    }
    else {
        signEmail.classList.remove('is-valid')
        signEmail.classList.add('is-invalid')
        signEmailAlert.textContent = `Invalid email format. Please ensure the local part contains only letters, numbers, hyphens, 
                                    and underscores, and the domain part follows valid rules (e.g., domain.com).`
        signEmailAlert.classList.replace('d-none', 'd-block')
    }
}

function isValidPassword(pass) {
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,35}$/
    return regex.test(pass)
}

function onInputSignPass() {
    pass = signPassword.value.trim()
    if (isValidPassword(pass)) {
        signPassword.classList.remove('invalid-pass')
        signPassword.classList.add('valid-pass')
        signPassAlert.classList.replace('d-block', 'd-none')
    }
    else {
        signPassword.classList.remove('valid-pass')
        signPassword.classList.add('invalid-pass')
        signPassAlert.textContent = `Password must be 8-35 characters long, have at least 1 lowercase letter, 
                                    have at least 1 uppercase letter, have at least 1 number,
                                    have at least 1 special character (e.g., !, @).`
        signPassAlert.classList.replace('d-none', 'd-block')
    }
}

function isValidName(name) {
    regex = /^[a-zA-Z ]+$/;
    return regex.test(name);
}

function onInputSignName() {
    let name = signName.value.trim()
    if (isValidName(name)) {
        signName.classList.remove('is-invalid')
        signName.classList.add('is-valid')
        signNameAlert.classList.replace('d-block', 'd-none')
    }
    else {
        signName.classList.remove('is-valid')
        signName.classList.add('is-invalid')
        signNameAlert.textContent = `Name can only contain uppercase and lowercase letters and spaces.`
        signNameAlert.classList.replace('d-none', 'd-block')
    }
}

function repeatedEmail(email) {
    for (let i = 0; i < accounts.length; i++) {
        if (email == accounts[i].email) {
            signEmail.classList.remove('is-valid')
            signEmail.classList.add('is-invalid')
            signEmailAlert.textContent = `Email already exists`
            signEmailAlert.classList.replace('d-none', 'd-block')
            return true
        }
    }
    return false
}

function directToLoginPage() {
    window.location.href = '../index.html'
}


