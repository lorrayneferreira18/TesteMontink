import React, { useState, useEffect } from "react";
import ModalComponent from "../ModalComponent/ModalComponent";
import LinkSuave from "../LinkSuave/LinkSuave";
import { Link } from "react-scroll";
import { NavbarProps } from "@/types";

interface NavItem {
  id: number;
  title: string;
  href: string;
  dropdownItems: {
    href: string;
    text: string;
  }[];
}

const Navbar: React.FC<NavbarProps> = ({ navItems, onOrderChange }) => {
  const [showModal, setShowModal] = useState(false);
  const [draggedItem, setDraggedItem] = useState<NavItem | null>(null);

  const handleDragStart = (e: React.DragEvent, item: NavItem) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", item.id.toString());
  };
  const handleDragOver = (e: React.DragEvent, item: NavItem) => {
    e.preventDefault();
    e.currentTarget.classList.add("drag-over");
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove("drag-over");
  };

  const handleDrop = (e: React.DragEvent, targetItem: NavItem) => {
    e.preventDefault();
    e.currentTarget.classList.remove("drag-over");

    if (!draggedItem) return;

    const draggedId = parseInt(e.dataTransfer.getData("text/plain"));
    const currentIndex = navItems.findIndex((item) => item.id === draggedId);
    const targetIndex = navItems.findIndex((item) => item.id === targetItem.id);

    if (currentIndex !== targetIndex) {
      const newItems = [...navItems];
      const [removed] = newItems.splice(currentIndex, 1);
      newItems.splice(targetIndex, 0, removed);
      onOrderChange(newItems);
    }
  };
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
            {navItems.map((item) => (
              <div
                key={item.id}
                className="nav-item dropdown"
                style={{ padding: "15px" }}
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
                onDragOver={(e) => handleDragOver(e, item)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, item)}
              >
                <a
                  aria-expanded="false"
                  className="dropdown-toggle link-light"
                  data-bs-toggle="dropdown"
                  href={item.href}
                >
                  <i className="fas fa-grip-horizontal icon-draggable"></i>
                  {item.title}
                </a>
                <div className="dropdown-menu" data-bs-popper="none">
                  {item.dropdownItems.map((dropdownItem, index) => (
                    <LinkSuave
                      key={index}
                      className="dropdown-item"
                      href={dropdownItem.href}
                    >
                      {dropdownItem.text}
                    </LinkSuave>
                  ))}
                </div>
              </div>
            ))}

            {/* Mantenha os botões fixos abaixo */}
            <div className="nav-item" style={{ padding: "15px" }}>
              <button
                type="button"
                className="btn btn-success text-light fw-bold w-100"
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
        </ul>
        <div className="text-center d-none d-md-inline"></div>
      </div>

      <ModalComponent show={showModal} onClose={() => setShowModal(false)} />
    </nav>
  );
};

export default Navbar;
