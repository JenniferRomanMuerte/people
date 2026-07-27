import './ErrorMessage.scss';

interface Props {
  mensaje?: string;
}

const ErrorMessage = ({ mensaje = 'Ha ocurrido un error. Inténtalo de nuevo.' }: Props) => {
  return (
    // role="alert" hace que los lectores de pantalla lo anuncien al aparecer
    <p className="error-message" role="alert">
      <span className="error-message__icono" aria-hidden="true">
        !
      </span>
      {mensaje}
    </p>
  );
};

export default ErrorMessage;
