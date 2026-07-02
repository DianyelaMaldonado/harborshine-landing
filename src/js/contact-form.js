export function contactForm() {
  const form = document.getElementById("contact-form");
  const successMessage = document.getElementById("success-message");

  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Reset validations hints
    const errorFirst = document.getElementById("error-first-name");
    const errorEmail = document.getElementById("error-email");
    if (errorFirst) errorFirst.classList.add("hidden");
    if (errorEmail) errorEmail.classList.add("hidden");

    // Basic frontend custom validation check
    const firstNameInput = document.getElementById("first-name");
    const emailInput = document.getElementById("email");
    let hasError = false;

    if (firstNameInput && !firstNameInput.value.trim()) {
      if (errorFirst) errorFirst.classList.remove("hidden");
      hasError = true;
    }

    if (emailInput && !emailInput.value.trim()) {
      if (errorEmail) errorEmail.classList.remove("hidden");
      hasError = true;
    }

    // Stop execution if front-end constraints fail
    if (hasError) return;

    // Prepare processing layout form submit state
    const formData = new FormData(form);
    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        // 🎉 Success workflow triggers
        if (successMessage) {
          successMessage.classList.remove("hidden");
        }
        form.reset();
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("❌ Submission error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      // Restore initial interactive interface controls
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}
