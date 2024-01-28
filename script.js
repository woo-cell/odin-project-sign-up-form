const formElement = document.getElementById("form");
const submitButton = document.getElementById("submit-button");
const firstNameInput = document.getElementById("first-name");
const firstNameError = document.getElementById("first-name-error");
const lastNameInput = document.getElementById("last-name");
const lastNameError = document.getElementById("last-name-error");
const emailInput = document.getElementById("email");
const emailError = document.getElementById("email-error");
const phoneInput = document.getElementById("phone");
const phoneFormatError = document.getElementById("phone-format-error");
const phoneLenError = document.getElementById("phone-length-error");
const passwordInput = document.getElementById("password");
const passLenError = document.getElementById("pass-length-error");
const passNumError = document.getElementById("pass-num-error");
const passSpeError = document.getElementById("pass-special-error");
const passwordConfirmInput = document.getElementById("confirm-password");
const passMatchError = document.getElementById("pass-match-error");
const quoteContainer = document.querySelector(".quote-container");
const q = document.querySelector(".quote");
const qe = document.querySelector(".quotee");

// validity booleans
let fVal,
  lVal,
  eVal,
  pVal,
  pwdVal,
  pwdConfVal = false;

function check() {
  // first name validation
  firstNameInput.addEventListener("input", () => {
    let val = firstNameInput.checkValidity();
    let text;
    if (!val || !firstNameInput.value) {
      firstNameInput.classList.add("invalid");
      text = `Min. 3 characters. You're using ${firstNameInput.value.length}`;
      fVal = false;
    } else {
      firstNameInput.classList.remove("invalid");
      text = ``;
      fVal = true;
    }
    firstNameError.textContent = text;

    activateSubmitButton();
  });

  // last name validation
  lastNameInput.addEventListener("input", () => {
    let val = lastNameInput.checkValidity();
    let text;
    if (!val || !lastNameInput.value) {
      lastNameInput.classList.add("invalid");
      text = `Min. 3 characters. You're using ${lastNameInput.value.length}`;
      lVal = false;
    } else {
      lastNameInput.classList.remove("invalid");
      text = ``;
      lVal = true;
    }
    lastNameError.textContent = text;

    activateSubmitButton();
  });

  // mail validation
  emailInput.addEventListener("input", () => {
    let val = emailInput.checkValidity();
    let text;
    if (!val || !emailInput.value) {
      emailInput.classList.add("invalid");
      text = `Use email format: your@mail.com`;
      eVal = false;
    } else {
      emailInput.classList.remove("invalid");
      text = ``;
      eVal = true;
    }
    emailError.textContent = text;

    activateSubmitButton();
  });

  // phone validation
  phoneInput.addEventListener("input", () => {
    let val = phoneInput.checkValidity();
    let text;
    if (!val || !phoneInput.value) {
      phoneInput.classList.add("invalid");
      pVal = false;
    } else {
      phoneInput.classList.remove("invalid");
      text = ``;
      pVal = true;
    }
    if (/[^0-9]/.test(phoneInput.value)) {
      phoneFormatError.textContent = `Only use digits`;
    } else {
      phoneFormatError.textContent = ``;
    }
    if (phoneInput.value.length != 10) {
      phoneLenError.textContent = `Phone number must be 10 digits`;
    } else if (phoneInput.value.length === 10) {
      phoneLenError.textContent = ``;
    }
    activateSubmitButton();
  });

  // password validation
  passwordInput.addEventListener("input", () => {
    let val = passwordInput.checkValidity();
    if (!val || !passwordInput.value) {
      passwordInput.classList.add("invalid");
      pwdVal = false;
    } else {
      passwordInput.classList.remove("invalid");
      pwdVal = true;
    }
    // check length >= 8
    if (passwordInput.value.length < 8) {
      passLenError.textContent = `Password should contain 8 char. min.`;
    } else {
      passLenError.textContent = ``;
    }
    // check pass contains a number
    if (!/\d/.test(passwordInput.value)) {
      passNumError.textContent = `Password should include a number`;
    } else {
      passNumError.textContent = ``;
    }
    // check pass contains a special character
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(passwordInput.value)) {
      passSpeError.textContent = `Password should contain special characters`;
    } else {
      passSpeError.textContent = ``;
    }

    activateSubmitButton();
  });

  // password confirmation
  passwordConfirmInput.addEventListener("input", compare);
  function compare() {
    if (String(passwordConfirmInput.value) != String(passwordInput.value)) {
      passwordConfirmInput.classList.add("invalid");
      passMatchError.textContent = `Passwords don't match`;
      pwdConfVal = false;
    } else if (
      String(passwordConfirmInput.value) === String(passwordInput.value)
    ) {
      passwordConfirmInput.classList.remove("invalid");
      passMatchError.textContent = ``;
      pwdConfVal = true;
    }

    activateSubmitButton();
  }
}

function activateSubmitButton() {
  if (fVal && lVal && eVal && pVal && pwdVal && pwdConfVal) {
    submitButton.disabled = false;
    submitButton.classList.add("active-button");
  } else {
    submitButton.disabled = true;
    submitButton.classList.remove("active-button");
  }
}

check();
activateSubmitButton();
hideQuoteContainer(); // hide the quote container at first

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("you submited");
});

function populateQuoteContainer(data) {
  let quote = data.content;
  let quotee = data.author;

  q.textContent = quote;
  qe.textContent = quotee;
  unhideQuoteContainer(); // unhide the container so the css animation can load
}

function hideQuoteContainer() {
  quoteContainer.style.display = "none";
}

function unhideQuoteContainer() {
  quoteContainer.style.display = "block";
}

fetch("https://api.quotable.io/random?tags=future", { mode: "cors" })
  .then((response) => {
    if (!response.ok) throw new Error("can't fetch the quotes");
    return response.json();
  })
  .then((data) => {
    populateQuoteContainer(data);
  })
  .catch((error) => {
    console.log("Error", error);
  });