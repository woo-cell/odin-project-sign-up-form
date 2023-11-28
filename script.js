const pass = document.getElementById("password");
const confirmation = document.getElementById("confirm-password");
const match = document.getElementById("match");
const button = document.getElementById("submit");

confirmation.addEventListener("input",compare);
function compare(e) {
    if (String(e.target.value)!=String(pass.value)) {
        match.textContent = "Passwords don't match";
        match.style.cssText = "color: red;"
        button.disabled = true;
    } else if (String(e.target.value)===String(pass.value)) {
        match.textContent = "Passwords match";
        match.style.cssText = "color: white;"
        button.disabled = false;
    }
}