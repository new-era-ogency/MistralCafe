const form = document.getElementById("contact-form");
const statusEl = document.getElementById("contact-form-status");
const submitButton = document.getElementById("contact-submit");

const EMAILJS_PUBLIC_KEY = "YOUR_EMAILJS_PUBLIC_KEY";
const EMAILJS_SERVICE_ID = "YOUR_EMAILJS_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_EMAILJS_TEMPLATE_ID";

if (window.emailjs) {
  window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}

const setStatus = (message, isError = false) => {
  if (!statusEl) return;
  statusEl.textContent = message;
  statusEl.classList.toggle("text-red-600", isError);
  statusEl.classList.toggle("text-slate-600", !isError);
};

const validateDate = (dateValue) => {
  if (!dateValue) return false;
  const selected = new Date(dateValue);
  selected.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selected >= today;
};

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  setStatus("");

  const formData = new FormData(form);
  const honeypot = String(formData.get("company") || "").trim();
  if (honeypot) {
    setStatus("Request blocked.");
    return;
  }

  const payload = {
    name: String(formData.get("name") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    phone: String(formData.get("phone") || "").trim(),
    date: String(formData.get("date") || "").trim(),
    message: String(formData.get("message") || "").trim(),
  };

  if (!payload.name || !payload.email || !payload.date || !payload.message) {
    setStatus("Please fill in all required fields.", true);
    return;
  }

  if (!validateDate(payload.date)) {
    setStatus("Please select a valid date (not in the past).", true);
    return;
  }

  if (!window.emailjs || EMAILJS_PUBLIC_KEY.includes("YOUR_")) {
    setStatus("EmailJS is not configured yet. Add your EmailJS keys in js/contact.js.", true);
    return;
  }

  submitButton?.setAttribute("disabled", "true");
  submitButton?.classList.add("opacity-70", "cursor-not-allowed");
  setStatus("Sending...");

  try {
    await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, payload);
    form.reset();
    setStatus("Your request was sent successfully.");
  } catch {
    setStatus("Could not send your request. Please try again.", true);
  } finally {
    submitButton?.removeAttribute("disabled");
    submitButton?.classList.remove("opacity-70", "cursor-not-allowed");
  }
});
