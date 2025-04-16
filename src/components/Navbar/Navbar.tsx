import React, { useState, useEffect } from "react";
import ModalComponent from "../ModalComponent/ModalComponent";
import LinkSuave from "../LinkSuave/LinkSuave";
import { Link } from "react-scroll";
const Navbar: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  // Inicializa os dropdowns do Bootstrap
  useEffect(() => {
    const dropdowns = document.querySelectorAll(".dropdown-toggle");

    const handleDropdownClick = function (this: HTMLElement, e: Event) {
      e.preventDefault();
      const parent = this.parentElement;
      parent?.classList.toggle("show");
      const menu = parent?.querySelector(".dropdown-menu");
      menu?.classList.toggle("show");
    };

    const handleDocumentClick = function (e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!target.matches(".dropdown-toggle")) {
        const dropdowns = document.querySelectorAll(".dropdown");
        dropdowns.forEach((dropdown) => {
          dropdown.classList.remove("show");
          const menu = dropdown.querySelector(".dropdown-menu");
          menu?.classList.remove("show");
        });
      }
    };

    dropdowns.forEach((dropdown) => {
      dropdown.addEventListener("click", handleDropdownClick);
    });

    document.addEventListener("click", handleDocumentClick);

    return () => {
      dropdowns.forEach((dropdown) => {
        dropdown.removeEventListener("click", handleDropdownClick);
      });
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <nav
      className="navbar align-items-start sidebar sidebar-dark accordion bg-gradient-primary navbar-dark"
      style={{ width: "300px" }}
    >
      <div className="container-fluid d-flex flex-column p-0">
        <Link
          className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0"
          to="elemento-ordenavel-1-item1"
          smooth={true}
          duration={50}
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-layer-group"></i>
          </div>
          <div className="sidebar-brand-text mx-3">
            <span>CAMADAS</span>
          </div>
        </Link>
        <hr className="sidebar-divider my-0" />
        <ul className="navbar-nav text-light" id="accordionSidebar">
          <li className="nav-item">
            {/* Elemento Ordenável 1 */}
            <div className="nav-item dropdown" style={{ padding: "15px" }}>
              <a
                aria-expanded="false"
                className="dropdown-toggle link-light"
                data-bs-toggle="dropdown"
                href="#elemento-ordenavel-1-item1"
              >
                <i className="fas fa-grip-horizontal icon-draggable"></i>
                Elemento Ordenável 1
              </a>
              <div className="dropdown-menu" data-bs-popper="none">
                <LinkSuave
                  className="dropdown-item"
                  href="#elemento-ordenavel-1-item1"
                >
                  Elemento 1
                </LinkSuave>
                <LinkSuave
                  className="dropdown-item"
                  href="#elemento-ordenavel-1-item2"
                >
                  Elemento 2
                </LinkSuave>
                <LinkSuave
                  className="dropdown-item"
                  href="#elemento-ordenavel-1-item3"
                >
                  Elemento 3
                </LinkSuave>
                <LinkSuave
                  className="dropdown-item"
                  href="#elemento-ordenavel-1-item4"
                >
                  Elemento 4
                </LinkSuave>
              </div>
            </div>

            {/* Elemento Ordenável 2 */}
            <div className="nav-item dropdown" style={{ padding: "15px" }}>
              <a
                aria-expanded="false"
                className="dropdown-toggle link-light"
                data-bs-toggle="dropdown"
                href="#elemento-ordenavel-2"
              >
                <i className="fas fa-grip-horizontal icon-draggable"></i>
                Elemento Ordenável 2
              </a>
              <div className="dropdown-menu" data-bs-popper="none">
                <LinkSuave
                  className="dropdown-item"
                  href="#elemento-ordenavel-2"
                >
                  Lista de Tarefas
                </LinkSuave>
                <LinkSuave
                  className="dropdown-item"
                  href="#elemento-ordenavel-2-cores"
                >
                  Grade de Cores
                </LinkSuave>
              </div>
            </div>

            {/* Elemento Ordenável 3 */}
            <div className="nav-item dropdown" style={{ padding: "15px" }}>
              <a
                aria-expanded="false"
                className="dropdown-toggle link-light"
                data-bs-toggle="dropdown"
                href="#elemento-ordenavel-3"
              >
                <i className="fas fa-grip-horizontal icon-draggable"></i>
                Elemento Ordenável 3
              </a>
              <div className="dropdown-menu" data-bs-popper="none">
                <LinkSuave
                  className="dropdown-item"
                  href="#elemento-ordenavel-3"
                >
                  Produto 1
                </LinkSuave>
                <LinkSuave
                  className="dropdown-item"
                  href="#elemento-ordenavel-3-item2"
                >
                  Produto 2
                </LinkSuave>
                <LinkSuave
                  className="dropdown-item"
                  href="#elemento-ordenavel-3-item3"
                >
                  Produto 3
                </LinkSuave>
                <LinkSuave
                  className="dropdown-item"
                  href="#elemento-ordenavel-3-item4"
                >
                  Produto 4
                </LinkSuave>
              </div>
            </div>

            {/* Elemento Ordenável 4 */}
            <div className="nav-item dropdown" style={{ padding: "15px" }}>
              <a
                aria-expanded="false"
                className="dropdown-toggle link-light"
                data-bs-toggle="dropdown"
                href="#elemento-ordenavel-4"
              >
                <i className="fas fa-grip-horizontal icon-draggable"></i>
                Elemento Ordenável 4
              </a>
              <div className="dropdown-menu" data-bs-popper="none">
                <LinkSuave
                  className="dropdown-item"
                  href="#elemento-ordenavel-4"
                >
                  Imagem 1
                </LinkSuave>
                <LinkSuave
                  className="dropdown-item"
                  href="#elemento-ordenavel-4-item2"
                >
                  Imagem 2
                </LinkSuave>
              </div>
            </div>

            {/* Elemento Ordenável 5 */}
            <div className="nav-item dropdown" style={{ padding: "15px" }}>
              <a
                aria-expanded="false"
                className="dropdown-toggle link-light"
                data-bs-toggle="dropdown"
                href="#elemento-ordenavel-5"
              >
                <i className="fas fa-grip-horizontal icon-draggable"></i>
                Elemento Ordenável 5
              </a>
              <div className="dropdown-menu" data-bs-popper="none">
                <LinkSuave
                  className="dropdown-item"
                  href="#elemento-ordenavel-5"
                >
                  Título
                </LinkSuave>
                <LinkSuave
                  className="dropdown-item"
                  href="#elemento-ordenavel-5-subtitulo"
                >
                  Subtítulo
                </LinkSuave>
                <LinkSuave
                  className="dropdown-item"
                  href="#elemento-ordenavel-5-botao1"
                >
                  Botao 1
                </LinkSuave>
                <LinkSuave
                  className="dropdown-item"
                  href="#elemento-ordenavel-5-botao2"
                >
                  Botao 2
                </LinkSuave>
                <LinkSuave
                  className="dropdown-item"
                  href="#elemento-ordenavel-5-imagem"
                >
                  Imagem
                </LinkSuave>
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
