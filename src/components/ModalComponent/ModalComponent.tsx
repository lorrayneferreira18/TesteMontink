import React from "react";

interface ModalComponentProps {
  show: boolean;
  onClose: () => void;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div
      className={`modal fade ${show ? "show d-block" : ""}`}
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Modal de Configurações</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <small>
              Os campos devem ser referentes ao conteúdo dos Elementos editáveis
              do bloco escolhido.
            </small>
            <form className="mt-4">
              <div className="mb-3">
                <label className="form-label">Subtítulo</label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Título</label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Classe do Ícone</label>
                <input type="text" className="form-control" />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button type="button" className="btn btn-primary">
              Salvar Alterações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
