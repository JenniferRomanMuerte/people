import { describe, it, expect } from 'vitest';
import {
  validateContactForm,
  hasErrors,
  MAX_MESSAGE_LENGTH,
  MAX_NAME_LENGTH,
} from './validateContactForm';
import type { ContactMessage } from '@/types/ContactMessage';

/** Datos correctos como punto de partida; cada test cambia solo lo que prueba */
const datosValidos = (cambios: Partial<ContactMessage> = {}): ContactMessage => ({
  name: 'Jennifer',
  lastName: 'Román',
  email: 'jennifer@correo.com',
  phone: '600 123 456',
  message: 'Me gustaría recibir información sobre el voluntariado.',
  privacyAccepted: true,
  ...cambios,
});

describe('validateContactForm', () => {
  describe('happy path', () => {
    it('no devuelve errores cuando todos los datos son correctos', () => {
      const errores = validateContactForm(datosValidos());

      expect(hasErrors(errores)).toBe(false);
      expect(errores).toEqual({});
    });

    it('acepta el formulario sin apellido ni teléfono, que son opcionales', () => {
      const errores = validateContactForm(datosValidos({ lastName: '', phone: '' }));

      expect(hasErrors(errores)).toBe(false);
    });

    it('acepta un teléfono con prefijo internacional', () => {
      const errores = validateContactForm(datosValidos({ phone: '+34 600 123 456' }));

      expect(errores.phone).toBeUndefined();
    });
  });

  describe('nombre', () => {
    it('debe dar error cuando el nombre está vacío', () => {
      const errores = validateContactForm(datosValidos({ name: '' }));

      expect(errores.name).toBe('El nombre es obligatorio.');
    });

    it('debe dar error cuando el nombre son solo espacios', () => {
      const errores = validateContactForm(datosValidos({ name: '   ' }));

      expect(errores.name).toBe('El nombre es obligatorio.');
    });

    it('debe dar error cuando el nombre supera el límite de caracteres', () => {
      const errores = validateContactForm(datosValidos({ name: 'a'.repeat(MAX_NAME_LENGTH + 1) }));

      expect(errores.name).toContain(String(MAX_NAME_LENGTH));
    });
  });

  describe('email', () => {
    it('debe dar error cuando el email está vacío', () => {
      const errores = validateContactForm(datosValidos({ email: '' }));

      expect(errores.email).toBe('El email es obligatorio.');
    });

    it('debe dar error cuando el email no tiene arroba', () => {
      const errores = validateContactForm(datosValidos({ email: 'jennifercorreo.com' }));

      expect(errores.email).toBe('Escribe un email válido, por ejemplo nombre@correo.com');
    });

    it('debe dar error cuando el email no tiene dominio', () => {
      const errores = validateContactForm(datosValidos({ email: 'jennifer@' }));

      expect(errores.email).toBeDefined();
    });

    it('debe dar error cuando el email lleva espacios', () => {
      const errores = validateContactForm(datosValidos({ email: 'jen nifer@correo.com' }));

      expect(errores.email).toBeDefined();
    });
  });

  describe('teléfono', () => {
    it('debe dar error cuando el teléfono contiene letras', () => {
      const errores = validateContactForm(datosValidos({ phone: '600 LLAMA YA' }));

      expect(errores.phone).toBe('Escribe un teléfono válido, solo números y espacios.');
    });

    it('debe dar error cuando el teléfono es demasiado corto', () => {
      const errores = validateContactForm(datosValidos({ phone: '600' }));

      expect(errores.phone).toBeDefined();
    });
  });

  describe('mensaje', () => {
    it('debe dar error cuando el mensaje está vacío', () => {
      const errores = validateContactForm(datosValidos({ message: '' }));

      expect(errores.message).toBe('Cuéntanos brevemente en qué podemos ayudarte.');
    });

    it('debe dar error cuando el mensaje supera el máximo permitido', () => {
      const errores = validateContactForm(
        datosValidos({ message: 'a'.repeat(MAX_MESSAGE_LENGTH + 1) })
      );

      expect(errores.message).toContain(String(MAX_MESSAGE_LENGTH));
    });

    it('acepta un mensaje justo en el límite', () => {
      const errores = validateContactForm(
        datosValidos({ message: 'a'.repeat(MAX_MESSAGE_LENGTH) })
      );

      expect(errores.message).toBeUndefined();
    });
  });

  describe('consentimiento de privacidad', () => {
    it('debe dar error cuando no se ha aceptado la política de privacidad', () => {
      const errores = validateContactForm(datosValidos({ privacyAccepted: false }));

      expect(errores.privacyAccepted).toBe(
        'Debes aceptar la política de privacidad para enviar el formulario.'
      );
    });
  });

  describe('varios errores a la vez', () => {
    it('debe devolver un error por cada campo incorrecto', () => {
      const errores = validateContactForm({
        name: '',
        lastName: '',
        email: 'no-es-un-email',
        phone: '',
        message: '',
        privacyAccepted: false,
      });

      expect(Object.keys(errores).sort()).toEqual([
        'email',
        'message',
        'name',
        'privacyAccepted',
      ]);
    });
  });
});

describe('hasErrors', () => {
  it('devuelve false con un objeto de errores vacío', () => {
    expect(hasErrors({})).toBe(false);
  });

  it('devuelve true cuando hay al menos un error', () => {
    expect(hasErrors({ name: 'El nombre es obligatorio.' })).toBe(true);
  });
});
