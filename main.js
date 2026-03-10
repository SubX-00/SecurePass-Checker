const input = document.getElementById("input");
const btn = document.getElementById("btn");
const feedback = document.getElementById("feedback");
const toggle = document.getElementById("toggle");
const strengthFill = document.getElementById("strength-fill");

// Show / Hide Password
toggle.addEventListener("click", () => {
    if(input.type === "password"){
        input.type = "text";
        toggle.textContent = "🙈";
    } else {
        input.type = "password";
        toggle.textContent = "👁️";
    }
});

// Password validation + strength with hints
function getValue() {
    const value = input.value;
    let strength = 0;
    const missing = [];

    // Reset strength bar
    strengthFill.classList.remove("weak", "medium", "strong");

    if(value.length === 0){
        input.classList.remove("input-valid","input-invalid");
        feedback.textContent = "Password cannot be empty";
        feedback.style.color = "orange";
        strengthFill.style.width = "0%";
        return;
    }

    // Check rules
    if(value.length >= 8) strength++; else missing.push("at least 8 characters");
    if(/[A-Z]/.test(value)) strength++; else missing.push("an uppercase letter");
    if(/[0-9]/.test(value)) strength++; else missing.push("a number");
    if(/[\W]/.test(value)) strength++; else missing.push("a special character like @");

    // Update strength bar
    if(strength <= 1){
        strengthFill.style.width = "25%";
        strengthFill.classList.add("weak");
    } else if(strength === 2){
        strengthFill.style.width = "50%";
        strengthFill.classList.add("weak");
    } else if(strength === 3){
        strengthFill.style.width = "75%";
        strengthFill.classList.add("medium");
    } else if(strength === 4){
        strengthFill.style.width = "100%";
        strengthFill.classList.add("strong");
    }

    // Feedback & input border
    if(strength >= 3){
        input.classList.add("input-valid");
        input.classList.remove("input-invalid");
        feedback.textContent = "Strong Password ✅";
        feedback.style.color = "green";
    } else {
        input.classList.add("input-invalid");
        input.classList.remove("input-valid");
        feedback.textContent = "Weak Password ❌. Add: " + missing.join(", ");
        feedback.style.color = "red";
    }
}

input.addEventListener("input", getValue);
btn.addEventListener("click", getValue);