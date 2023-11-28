const pass = document.getElementById("password");
const confirmation = document.getElementById("confirm-password");
const match = document.getElementById("match");

confirmation.addEventListener("input",compare);
function compare(e) {
    if (String(e.target.value)!=String(pass.value)) {
        match.textContent = "Passwords don't match";
        console.log("non");
    } else if (String(e.target.value)===String(pass.value)) {
        match.textContent = "Passwords match";
        console.log("oui");
    }
}