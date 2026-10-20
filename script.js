/*
  CONFIGURAÇÃO IMPORTANTE:
  Troque o número abaixo pelo WhatsApp do studio, com código do país e DDD.
  Exemplo de formato: 5531991234567 (55 + DDD + número, sem +, espaços ou traços).
*/
const WHATSAPP_NUMBER = "5531999999999"; // SUBSTITUA PELO NÚMERO REAL DO STUDIO

const modal = document.querySelector("#booking-modal");
const summary = document.querySelector("#selected-summary");
const kindSelect = document.querySelector("#service-kind");
let selectedService = "Procedimento de beleza";
let selectedKind = "Aplicação";

function whatsappLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
function openBooking(service, kind) {
  selectedService = service || "Procedimento de beleza";
  selectedKind = kind || "Aplicação";
  if (!modal) return;
  summary.textContent = `Você se interessou por: ${selectedService}. Confirme os detalhes abaixo para continuar pelo WhatsApp.`;
  if (kindSelect) kindSelect.value = selectedKind;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeBooking() {
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
document.querySelectorAll("[data-service]").forEach((button) => {
  button.addEventListener("click", () => openBooking(button.dataset.service, button.dataset.kind));
});
document.querySelectorAll("[data-close]").forEach((element) => element.addEventListener("click", closeBooking));
document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeBooking(); });

const confirmButton = document.querySelector("#confirm-whatsapp");
if (confirmButton) {
  confirmButton.addEventListener("click", () => {
    const kind = kindSelect ? kindSelect.value : selectedKind;
    const name = document.querySelector("#client-name")?.value.trim() || "";
    const extra = document.querySelector("#client-message")?.value.trim() || "";
    const greeting = name ? `Olá! Meu nome é ${name}.` : "Olá, tudo bem?";
    const message = `${greeting}\nMe interessei pelo procedimento *${selectedService}* e gostaria de fazer *${kind.toLowerCase()}*.\nGostaria de saber os horários disponíveis e confirmar como posso agendar.${extra ? `\nInformações adicionais: ${extra}` : ""}`;
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
  });
}
const generalButton = document.querySelector("#general-whatsapp");
if (generalButton) {
  generalButton.addEventListener("click", () => {
    const message = "Olá, tudo bem? Conheci o STUDIO_MALLUALMEIDA pelo site e gostaria de saber mais sobre os procedimentos e os horários disponíveis para agendamento.";
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
  });
}
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "×" : "☰";
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  }));
}
document.querySelectorAll("#year").forEach(el => el.textContent = new Date().getFullYear());
