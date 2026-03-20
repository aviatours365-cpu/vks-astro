const TELEGRAM_TOKEN = "7989141323:AAHtY0tFEFlU6fr2-Bv79pfx4qmA9n5gxb4";
const TELEGRAM_CHAT_ID = "-4522588762";

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

const sendToTelegram = async (
  name: string,
  contact: string,
  company: string = "—",
  message: string = "—",
) => {
  const text = [
    `📬 <b>Новая заявка с сайта VKS!</b>`,
    ``,
    `👤 <b>Имя:</b> ${name}`,
    `📞 <b>Контакт:</b> ${contact}`,
    `🏢 <b>Компания:</b> ${company}`,
    `💬 <b>Сообщение:</b> ${message}`,
    ``,
    `🌐 <b>Страница:</b> ${window.location.pathname}`,
  ].join("\n");

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: text,
          parse_mode: "HTML",
        }),
      },
    );
    return response.ok;
  } catch (err) {
    console.error("Telegram error:", err);
    return false;
  }
};

const handleFormSubmit = async (
  form: HTMLFormElement,
  successOverlay: Element,
  inputs: NodeListOf<Element>,
) => {
  let isValid = true;
  const data: Record<string, string> = {};

  inputs.forEach((input) => {
    const el = input as HTMLInputElement;
    if (el.hasAttribute("required") && !el.validity.valid) {
      toggleError(el, true);
      isValid = false;
    }
    data[el.name] = el.value.trim();
  });

  if (!isValid) return;

  const submitBtn = form.querySelector(
    'button[type="submit"]',
  ) as HTMLButtonElement;

  if (submitBtn) {
    submitBtn.disabled = true;
    const originalText = submitBtn.innerText;
    submitBtn.innerText = "ОТПРАВКА...";

    // Real Telegram Send
    const success = await sendToTelegram(
      data.name || "—",
      data.contact || "—",
      data.company || "—",
      data.message || "—",
    );

    if (success) {
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
    } else {
      alert("Ошибка отправки. Пожалуйста, попробуйте позже.");
    }

    submitBtn.disabled = false;
    submitBtn.innerText = originalText;
  }
};

const handleReset = (
  form: HTMLFormElement,
  successOverlay: Element,
  inputs: NodeListOf<Element>,
) => {
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
};

export const initLeadForm = () => {
  const form = document.querySelector("#lead-form") as HTMLFormElement;
  const successOverlay = document.querySelector("#form-success");
  const resetBtn = document.querySelector("#form-reset-minimal");

  if (!form || !successOverlay || !resetBtn) return;

  const inputs = form.querySelectorAll("input[required], input[name]");

  inputs.forEach((input) => {
    const el = input as HTMLInputElement;
    el.addEventListener("blur", () => toggleError(el, !el.value.trim()));
    el.addEventListener("input", () => {
      if (el.value.trim()) toggleError(el, false);
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    handleFormSubmit(form, successOverlay, inputs);
  });

  resetBtn.addEventListener("click", () =>
    handleReset(form, successOverlay, inputs),
  );
};
