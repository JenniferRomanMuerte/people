import type { ContactFormErrors, ContactMessage } from '@/types/ContactMessage';

/** Límites aplicados también en el servidor, no solo aquí */
export const MAX_NAME_LENGTH = 80;
export const MAX_EMAIL_LENGTH = 150;
export const MAX_PHONE_LENGTH = 20;
export const MAX_MESSAGE_LENGTH = 2000;

// Comprobación deliberadamente permisiva: la validación real de un email es
// que llegue. Aquí solo se cazan los errores obvios de escritura.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Admite prefijos internacionales, espacios, guiones y paréntesis
const PHONE_REGEX = /^[+()\d\s.-]{9,20}$/;

/**
 * Valida los datos del formulario de contacto.
 * Devuelve un objeto con un mensaje por cada campo incorrecto; si está vacío,
 * los datos son válidos.
 */
export const validateContactForm = (data: ContactMessage): ContactFormErrors => {
  const errors: ContactFormErrors = {};

  // --- Nombre (obligatorio) ---
  const name = data.name.trim();
  if (!name) {
    errors.name = 'El nombre es obligatorio.';
  } else if (name.length > MAX_NAME_LENGTH) {
    errors.name = `El nombre no puede superar los ${MAX_NAME_LENGTH} caracteres.`;
  }

  // --- Apellido (opcional) ---
  if (data.lastName.trim().length > MAX_NAME_LENGTH) {
    errors.lastName = `El apellido no puede superar los ${MAX_NAME_LENGTH} caracteres.`;
  }

  // --- Email (obligatorio) ---
  const email = data.email.trim();
  if (!email) {
    errors.email = 'El email es obligatorio.';
  } else if (email.length > MAX_EMAIL_LENGTH) {
    errors.email = `El email no puede superar los ${MAX_EMAIL_LENGTH} caracteres.`;
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = 'Escribe un email válido, por ejemplo nombre@correo.com';
  }

  // --- Teléfono (opcional) ---
  const phone = data.phone.trim();
  if (phone && !PHONE_REGEX.test(phone)) {
    errors.phone = 'Escribe un teléfono válido, solo números y espacios.';
  }

  // --- Mensaje (obligatorio) ---
  const message = data.message.trim();
  if (!message) {
    errors.message = 'Cuéntanos brevemente en qué podemos ayudarte.';
  } else if (message.length > MAX_MESSAGE_LENGTH) {
    errors.message = `El mensaje no puede superar los ${MAX_MESSAGE_LENGTH} caracteres.`;
  }

  // --- Consentimiento (obligatorio) ---
  // Es la base legal del tratamiento: sin él no se puede enviar nada.
  if (!data.privacyAccepted) {
    errors.privacyAccepted = 'Debes aceptar la política de privacidad para enviar el formulario.';
  }

  return errors;
};

/** Indica si el resultado de la validación contiene algún error */
export const hasErrors = (errors: ContactFormErrors): boolean => Object.keys(errors).length > 0;
