import React, { useState } from "react";
import ModalComponent from "../ModalComponent/ModalComponent";

const Navbar: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <nav
      className="navbar align-items-start sidebar sidebar-dark accordion bg-gradient-primary navbar-dark"
      style={{ width: "300px !important" }}
    >
      <div className="container-fluid d-flex flex-column p-0">
        <a
          className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0"
          href="#"
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-layer-group"></i>
          </div>
          <div className="sidebar-brand-text mx-3">
            <span>CAMADAS</span>
          </div>
        </a>
        <hr className="sidebar-divider my-0" />
        <ul className="navbar-nav text-light" id="accordionSidebar">
          <li className="nav-item">
            {/* Elemento Ordenável 1 */}
            <div className="nav-item dropdown" style={{ padding: "15px" }}>
              <a
                aria-expanded="false"
                className="dropdown-toggle link-light"
                data-bs-toggle="dropdown"
                href="#"
              >
                <i className="fas fa-grip-horizontal icon-draggable"></i>
                Elemento Ordenável 1
              </a>
              <div className="dropdown-menu" data-bs-popper="none">
                <a className="dropdown-item" href="#">
                  Elemento 1
                </a>
                <a className="dropdown-item" href="#">
                  Elemento 2
                </a>
                <a className="dropdown-item" href="#">
                  Elemento 3
                </a>
                <a className="dropdown-item" href="#">
                  Elemento 4
                </a>
              </div>
            </div>

            {/* Elemento Ordenável 2 */}
            <div className="nav-item dropdown" style={{ padding: "15px" }}>
              <a
                aria-expanded="false"
                className="dropdown-toggle link-light"
                data-bs-toggle="dropdown"
                href="#"
              >
                <i className="fas fa-grip-horizontal icon-draggable"></i>
                Elemento Ordenável 2
              </a>
              <div className="dropdown-menu" data-bs-popper="none">
                <a className="dropdown-item" href="#">
                  Lista de Tarefas
                </a>
                <a className="dropdown-item" href="#">
                  Grade de Cores
                </a>
              </div>
            </div>

            {/* Elemento Ordenável 3 */}
            <div className="nav-item dropdown" style={{ padding: "15px" }}>
              <a
                aria-expanded="false"
                className="dropdown-toggle link-light"
                data-bs-toggle="dropdown"
                href="#"
              >
                <i className="fas fa-grip-horizontal icon-draggable"></i>
                Elemento Ordenável 3
              </a>
              <div className="dropdown-menu" data-bs-popper="none">
                <a className="dropdown-item" href="#">
                  Produto
                </a>
                <a className="dropdown-item" href="#">
                  Produto
                </a>
                <a className="dropdown-item" href="#">
                  Produto
                </a>
                <a className="dropdown-item" href="#">
                  Produto
                </a>
              </div>
            </div>

            {/* Elemento Ordenável 4 */}
            <div className="nav-item dropdown" style={{ padding: "15px" }}>
              <a
                aria-expanded="false"
                className="dropdown-toggle link-light"
                data-bs-toggle="dropdown"
                href="#"
              >
                <i className="fas fa-grip-horizontal icon-draggable"></i>
                Elemento Ordenável 4
              </a>
              <div className="dropdown-menu" data-bs-popper="none">
                <a className="dropdown-item" href="#">
                  Imagem 1
                </a>
                <a className="dropdown-item" href="#">
                  Imagem 2
                </a>
              </div>
            </div>

            {/* Elemento Ordenável 5 */}
            <div className="nav-item dropdown" style={{ padding: "15px" }}>
              <a
                aria-expanded="false"
                className="dropdown-toggle link-light"
                data-bs-toggle="dropdown"
                href="#"
              >
                <i className="fas fa-grip-horizontal icon-draggable"></i>
                Elemento Ordenável 5
              </a>
              <div className="dropdown-menu" data-bs-popper="none">
                <a className="dropdown-item" href="#">
                  Título
                </a>
                <a className="dropdown-item" href="#">
                  Subtítulo
                </a>
                <a className="dropdown-item" href="#">
                  Botao 1
                </a>
                <a className="dropdown-item" href="#">
                  Botao 2
                </a>
                <a className="dropdown-item" href="#">
                  Imagem
                </a>
              </div>
            </div>

            <div className="nav-item" style={{ padding: "15px" }}>
              <button
                type="button"
                className="btn btn-success text-light fw-bold w-100"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() => setShowModal(true)}
              >
                Modelo de Modal de Componente
              </button>
            </div>

            <div className="nav-item" style={{ padding: "15px" }}>
              <button
                type="button"
                className="btn btn-dark col-12 text-light fw-bold"
              >
                Salvar Layout
              </button>
            </div>
          </li>
          <li className="nav-item"></li>
        </ul>
        <div className="text-center d-none d-md-inline"></div>
      </div>

      <ModalComponent show={showModal} onClose={() => setShowModal(false)} />
    </nav>
  );
};

export default Navbar;
