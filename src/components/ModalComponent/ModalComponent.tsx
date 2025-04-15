import React, { ReactNode } from "react";

interface ModalComponentProps {
  show: boolean;
  onClose: () => void;
  children?: ReactNode;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  show,
  onClose,
  children,
}) => {
  if (!show) return null;

  return (
    <div
      className={`modal fade ${show ? "show d-block" : ""}`}
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default ModalComponent;
