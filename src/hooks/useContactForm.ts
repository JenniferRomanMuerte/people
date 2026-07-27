import { useState, type ChangeEvent, type FormEvent } from 'react';
import { contactService } from '@/services/contactService';
import { hasErrors, validateContactForm } from '@/utils/validateContactForm';
import type { ContactFormErrors, ContactMessage } from '@/types/ContactMessage';

const ESTADO_INICIAL: ContactMessage = {
  name: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
  privacyAccepted: false,
  website: '',
};

/**
 * Lógica del formulario de contacto: estado de los campos, validación,
 * envío y mensajes de resultado.
 */
export const useContactForm = () => {
  const [formData, setFormData] = useState<ContactMessage>(ESTADO_INICIAL);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const valor = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setFormData((previo) => ({ ...previo, [name]: valor }));

    // El error de un campo desaparece en cuanto se empieza a corregir
    setErrors((previo) => {
      if (!previo[name as keyof ContactMessage]) return previo;
      const siguiente = { ...previo };
      delete siguiente[name as keyof ContactMessage];
      return siguiente;
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Evita que un doble clic mande el mismo mensaje dos veces
    if (loading) return;

    setServerError(null);
    setSuccess(false);

    const erroresValidacion = validateContactForm(formData);
    setErrors(erroresValidacion);

    if (hasErrors(erroresValidacion)) return;

    setLoading(true);

    try {
      await contactService.send(formData);
      setSuccess(true);
      setFormData(ESTADO_INICIAL);
    } catch (error) {
      setServerError(
        error instanceof Error && error.message
          ? error.message
          : 'No hemos podido enviar tu mensaje. Inténtalo de nuevo o escríbenos directamente por correo.'
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    errors,
    loading,
    serverError,
    success,
    handleChange,
    handleSubmit,
  };
};
