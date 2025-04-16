import React, { useState, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import ElementoOrdenavel1 from "./components/ElementosOrdenaveis/ElementoOrdenavel1";
import ElementoOrdenavel2 from "./components/ElementosOrdenaveis/ElementoOrdenavel2";
import ElementoOrdenavel3 from "./components/ElementosOrdenaveis/ElementoOrdenavel3";
import ElementoOrdenavel4 from "./components/ElementosOrdenaveis/ElementoOrdenavel4";
import ElementoOrdenavel5 from "./components/ElementosOrdenaveis/ElementoOrdenavel5";
import { NavItem } from "./types";

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [navItems, setNavItems] = useState<NavItem[]>([
    {
      id: 1,
      title: "Elemento Ordenável 1",
      href: "#elemento-ordenavel-1-item1",
      type: "elemento1",
      dropdownItems: [
        { href: "#elemento-ordenavel-1-item1", text: "Elemento 1" },
        { href: "#elemento-ordenavel-1-item2", text: "Elemento 2" },
        { href: "#elemento-ordenavel-1-item3", text: "Elemento 3" },
        { href: "#elemento-ordenavel-1-item4", text: "Elemento 4" },
      ],
    },
    {
      id: 2,
      title: "Elemento Ordenável 2",
      href: "#elemento-ordenavel-2",
      type: "elemento2",
      dropdownItems: [
        { href: "#elemento-ordenavel-2", text: "Lista de Tarefas" },
        { href: "#elemento-ordenavel-2-cores", text: "Grade de Cores" },
      ],
    },
    {
      id: 3,
      title: "Elemento Ordenável 3",
      href: "#elemento-ordenavel-3",
      type: "elemento3",
      dropdownItems: [
        { href: "#elemento-ordenavel-3", text: "Produto 1" },
        { href: "#elemento-ordenavel-3-item2", text: "Produto 2" },
        { href: "#elemento-ordenavel-3-item3", text: "Produto 3" },
        { href: "#elemento-ordenavel-3-item4", text: "Produto 4" },
      ],
    },
    {
      id: 4,
      title: "Elemento Ordenável 4",
      href: "#elemento-ordenavel-4",
      type: "elemento4",
      dropdownItems: [
        { href: "#elemento-ordenavel-4", text: "Imagem 1" },
        { href: "#elemento-ordenavel-4-item2", text: "Imagem 2" },
      ],
    },
    {
      id: 5,
      title: "Elemento Ordenável 5",
      href: "#elemento-ordenavel-5",
      type: "elemento5",
      dropdownItems: [
        { href: "#elemento-ordenavel-5", text: "Título" },
        { href: "#elemento-ordenavel-5-subtitulo", text: "Subtítulo" },
        { href: "#elemento-ordenavel-5-botao1", text: "Botão 1" },
        { href: "#elemento-ordenavel-5-botao2", text: "Botão 2" },
        { href: "#elemento-ordenavel-5-imagem", text: "Imagem" },
      ],
    },
  ]);
  const renderComponent = (item: NavItem) => {
    switch (item.type) {
      case "elemento1":
        return <ElementoOrdenavel1 key={item.id} />;
      case "elemento2":
        return <ElementoOrdenavel2 key={item.id} />;
      case "elemento3":
        return <ElementoOrdenavel3 key={item.id} />;
      case "elemento4":
        return <ElementoOrdenavel4 key={item.id} />;
      case "elemento5":
        return <ElementoOrdenavel5 key={item.id} />;
      default:
        return null;
    }
  };
  const allComponents = useMemo(
    () =>
      navItems.map((item) => ({
        id: item.id,
        name: item.title,
        component: renderComponent(item),
      })),
    [navItems]
  );

  const handleOrderChange = (newOrder: NavItem[]) => {
    setNavItems(newOrder);
  };
  const filteredComponents = useMemo(() => {
    if (!searchTerm.trim()) return allComponents;
    return allComponents.filter((comp) =>
      comp.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, allComponents]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div
      id="page-top"
      data-bs-theme="light"
      data-bs-app-theme="dark"
      style={
        {
          "--highlight-bg": "#000",
          "--highlight-color": "#fff",
          "--box-highlight": "rgba(0,0,0,0.8)",
        } as React.CSSProperties
      }
    >
      <div id="wrapper" className="d-flex">
        <Navbar navItems={navItems} onOrderChange={handleOrderChange} />

        <div
          className="d-flex flex-column"
          id="content-wrapper"
          style={{ width: "calc(100% - 300px)", marginLeft: "300px" }}
        >
          <div id="content">
            <nav className="navbar navbar-expand bg-white text-center shadow justify-content-center mb-4 topbar">
              <div className="container-fluid">
                <form
                  className="d-none d-sm-inline-block me-auto ms-md-3 my-2 my-md-0 mw-100 navbar-search"
                  style={{
                    marginRight: "0px",
                    marginBottom: "0px",
                    textAlign: "center",
                    marginLeft: "37px",
                  }}
                  onSubmit={handleSearch}
                >
                  <div className="input-group">
                    <input
                      type="text"
                      className="bg-light form-control border-0 small"
                      placeholder="Buscar Componente"
                      aria-label="Buscar Componente"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                      className="btn btn-primary py-0"
                      type="submit"
                      aria-label="Buscar"
                    >
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </form>
              </div>
            </nav>

            <div className="container-fluid">
              <div className="text-start d-sm-flex justify-content-between align-items-center mb-4">
                <h3 className="text-dark mb-0">
                  {searchTerm.trim() ? "Resultados da Busca" : "Elementos"}
                </h3>
              </div>

              <div className="main-content">
                {filteredComponents.length > 0 ? (
                  filteredComponents.map((comp) => (
                    <div key={comp.id}>{comp.component}</div>
                  ))
                ) : searchTerm.trim() ? (
                  <div className="alert alert-info">
                    Nenhum componente encontrado para "{searchTerm}"
                  </div>
                ) : (
                  navItems.map((item) => renderComponent(item))
                )}
              </div>
            </div>
          </div>

          <footer className="bg-white sticky-footer">
            <div className="container my-auto">
              <div className="text-center my-auto copyright">
                <span>Copyright © Meu editor</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default App;
