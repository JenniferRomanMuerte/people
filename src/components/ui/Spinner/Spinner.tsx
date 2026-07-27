import './Spinner.scss';

interface Props {
  mensaje?: string;
}

const Spinner = ({ mensaje = 'Cargando...' }: Props) => {
  return (
    <div className="spinner" role="status" aria-live="polite">
      <span className="spinner__circulo" aria-hidden="true" />
      <span className="spinner__texto">{mensaje}</span>
    </div>
  );
};

export default Spinner;
