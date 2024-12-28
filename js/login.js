let loader = document.querySelector('.loader'),
    icon = document.querySelector('i'),
    passwordInput = document.querySelector('#password'),
    loginEmail = document.querySelector('.loginEmail'),
    loginPassword = document.querySelector('.loginPassword'),
    loginBtn = document.querySelector('.loginBtn'),
    LoginEmailAlert = document.querySelector('.LoginEmailAlert'),
    LoginPassAlert = document.querySelector('.LoginPassAlert'),
    signUpLink = document.querySelector('.signUp'),
    welcomeMsg = document.querySelector('.welcome'),
    logout = document.querySelector('.logout'),
    accounts = []

load(displayNone);

checkLocalStorage();

if (welcomeMsg) {
    username = getNameFromLocalStorage();
    if (username)
        welcomeMsg.textContent = `Welcome, ${username}!`
    else
        directToLoginPage()
}

if (logout) {
    logout.addEventListener('click', () => {
        directToLoginPage()
        localStorage.removeItem('name')
    })
}

signUpLink.addEventListener('click', directToSignUpPage)

loginBtn.addEventListener('click', () => {
    checkLogin(loginEmail.value.trim().toLowerCase(), loginPassword.value.trim())
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

function getFromLocalStorage() {
    return JSON.parse(localStorage.getItem('accounts'))
}

function checkLocalStorage() {
    accounts = getFromLocalStorage() || [];
}

function checkLogin(email, password) {
    let returnedObject = emailExists(email)
    if (returnedObject) {
        LoginEmailAlert.classList.replace('d-block', 'd-none')
        loginEmail.classList.remove('is-invalid')
        if (password == returnedObject.pass) {
            LoginPassAlert.classList.replace('d-block', 'd-none')
            loginPassword.classList.remove('invalid-pass')
            addNameToLocalStorage(returnedObject.name)
            directToHomePage()
        }
        else {
            LoginPassAlert.textContent = `Password is not correct`
            LoginPassAlert.classList.replace('d-none', 'd-block')
            loginPassword.classList.add('invalid-pass')
        }
    }
    else {
        LoginEmailAlert.textContent = `Email does not exist`
        LoginEmailAlert.classList.replace('d-none', 'd-block')
        loginEmail.classList.add('is-invalid')
        LoginPassAlert.classList.replace('d-block', 'd-none')
        loginPassword.classList.remove('invalid-pass')
    }
}

function directToSignUpPage() {
    window.location.href = 'html/sign-up.html'
}

function directToHomePage() {
    window.location.href = 'html/home.html'
}

function directToLoginPage() {
    window.location.href = '../index.html'
}

function emailExists(email) {
    for (let i = 0; i < accounts.length; i++) {
        if (email == accounts[i].email)
            return accounts[i]
    }
    return false
}

function addNameToLocalStorage(name) {
    localStorage.setItem('name', JSON.stringify(name))
}

function getNameFromLocalStorage() {
    return JSON.parse(localStorage.getItem('name'))
}