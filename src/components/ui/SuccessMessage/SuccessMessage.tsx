import './SuccessMessage.scss';

interface Props {
  mensaje?: string;
}

const SuccessMessage = ({ mensaje = 'Operación realizada con éxito.' }: Props) => {
  return (
    <p className="success-message" role="status" aria-live="polite">
      <span className="success-message__icono" aria-hidden="true">
        ✓
      </span>
      {mensaje}
    </p>
  );
};

export default SuccessMessage;
