export function contactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const firstName = document.getElementById("first-name");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");

  // Error span mapping declarations
  const errFirstName = document.getElementById("error-first-name");
  const errEmail = document.getElementById("error-email");
  const errPhone = document.getElementById("error-phone");
  const successMessage = document.getElementById("success-message");

  form.addEventListener("submit", (event) => {
    // 1. CRITICAL: Stop the browser from executing the real POST request to prevent 404 routing errors
    event.preventDefault();

    // 2. Reset visibility states before validation execution loops
    if (errFirstName) errFirstName.classList.add("hidden");
    if (errEmail) errEmail.classList.add("hidden");
    if (errPhone) errPhone.classList.add("hidden");
    if (successMessage) successMessage.classList.add("hidden");

    let isLayoutFormValid = true;

    // 3. First Name structural validation checks (REQUIRED)
    if (firstName && !firstName.value.trim()) {
      if (errFirstName) errFirstName.classList.remove("hidden");
      isLayoutFormValid = false;
    }

    // 4. Email structural validation checks (REQUIRED)
    if (email && !email.validity.valid) {
      if (errEmail) errEmail.classList.remove("hidden");
      isLayoutFormValid = false;
    }

    // 5. Optional Phone structure checks (Only triggers if the user chooses to type inside it)
    if (phone && phone.value.trim() && !phone.validity.valid) {
      if (errPhone) errPhone.classList.remove("hidden");
      isLayoutFormValid = false;
    }

    // Halt logic if constraints are violated
    if (!isLayoutFormValid) {
      console.warn("⚠️ Custom structural form validation check failed.");
      return;
    }

    if (successMessage) {
      successMessage.classList.remove("hidden");

      // Reset all form field inputs cleanly
      form.reset();

      // Automatically hide the feedback block after 5 seconds
      setTimeout(() => {
        successMessage.classList.add("hidden");
      }, 5000);
    }
  });
}
