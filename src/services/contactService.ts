import { api } from './api';
import type { ContactResponse, CreateContactMessageDTO } from '@/types/ContactMessage';

export const contactService = {
  /** Envía el mensaje del formulario al endpoint que lo reenvía por correo */
  send: (data: CreateContactMessageDTO) => api.post<ContactResponse>('/contacto', data),
};
