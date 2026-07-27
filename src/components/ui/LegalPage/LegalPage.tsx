import type { ReactNode } from 'react';
import './LegalPage.scss';

interface Props {
  title: string;
  children: ReactNode;
}

/** Estructura común de las páginas legales: aviso, privacidad y cookies */
const LegalPage = ({ title, children }: Props) => {
  return (
    <div className="legal-page">
      <div className="contenedor contenedor--estrecho">
        <h1 className="legal-page__titulo">{title}</h1>
        <div className="legal-page__contenido">{children}</div>
      </div>
    </div>
  );
};

export default LegalPage;
