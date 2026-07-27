export interface ContactMessage {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  /** Consentimiento expreso de la política de privacidad (base legal del RGPD) */
  privacyAccepted: boolean;
  /**
   * Campo trampa para bots: está oculto para las personas, así que si llega
   * relleno se descarta el envío. Nunca lo rellena alguien real.
   */
  website?: string;
}

/** Lo que se envía al endpoint: el consentimiento ya viene validado */
export type CreateContactMessageDTO = ContactMessage;

/** Errores de validación, indexados por el campo al que pertenecen */
export type ContactFormErrors = Partial<Record<keyof ContactMessage, string>>;

export interface ContactResponse {
  ok: boolean;
  message: string;
}
