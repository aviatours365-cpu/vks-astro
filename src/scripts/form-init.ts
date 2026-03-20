export const initLeadForm = () => {
  const form = document.querySelector("#lead-form") as HTMLFormElement;
  const successOverlay = document.querySelector("#form-success");
  const resetBtn = document.querySelector("#form-reset-minimal");

  if (!form || !successOverlay || !resetBtn) return;

  const inputs = form.querySelectorAll("input[required]");

  const toggleError = (input: HTMLInputElement, show: boolean) => {
    input.classList.toggle("is-invalid", show);
    const errorMessage = input.parentElement?.querySelector(".error-message");
    if (errorMessage) {
      errorMessage.classList.toggle("opacity-0", !show);
      errorMessage.classList.toggle("translate-x-2", !show);
      errorMessage.classList.toggle("opacity-100", show);
      errorMessage.classList.toggle("translate-x-0", show);
    }
  };

  inputs.forEach((input) => {
    const el = input as HTMLInputElement;
    el.addEventListener("blur", () => toggleError(el, !el.value.trim()));
    el.addEventListener("input", () => {
      if (el.value.trim()) toggleError(el, false);
    });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let isValid = true;
    inputs.forEach((input) => {
      const el = input as HTMLInputElement;
      if (!el.validity.valid) {
        toggleError(el, true);
        isValid = false;
      }
    });

    if (!isValid) return;

    const submitBtn = form.querySelector(
      'button[type="submit"]',
    ) as HTMLButtonElement;

    if (submitBtn) {
      submitBtn.disabled = true;
      const originalText = submitBtn.innerText;
      submitBtn.innerText = "ОТПРАВКА...";

      setTimeout(() => {
        form.classList.add(
          "opacity-0",
          "pointer-events-none",
          "scale-95",
          "blur-sm",
        );
        setTimeout(() => {
          successOverlay.classList.remove("opacity-0", "pointer-events-none");
          successOverlay.classList.add("opacity-100");
        }, 300);
        submitBtn.disabled = false;
        submitBtn.innerText = originalText;
      }, 1500);
    }
  });

  resetBtn.addEventListener("click", () => {
    successOverlay.classList.add("opacity-0", "pointer-events-none");
    successOverlay.classList.remove("opacity-100");
    setTimeout(() => {
      form.classList.remove(
        "opacity-0",
        "pointer-events-none",
        "scale-95",
        "blur-sm",
      );
      form.reset();
      inputs.forEach((input) => toggleError(input as HTMLInputElement, false));
    }, 300);
  });
};
