import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import ElementoOrdenavel1 from "./components/ElementosOrdenaveis/ElementoOrdenavel1";
import ElementoOrdenavel2 from "./components/ElementosOrdenaveis/ElementoOrdenavel2";
import ElementoOrdenavel3 from "./components/ElementosOrdenaveis/ElementoOrdenavel3";
import ElementoOrdenavel4 from "./components/ElementosOrdenaveis/ElementoOrdenavel4";
import ElementoOrdenavel5 from "./components/ElementosOrdenaveis/ElementoOrdenavel5";

const App: React.FC = () => {
  return (
    <div
      id="page-top"
      data-bs-theme="light"
      bs-app-theme="dark"
      style={
        {
          "--highlight-bg": "#000",
          "--highlight-color": "#fff",
          "--box-highlight": "rgba(0,0,0,0.8)",
        } as React.CSSProperties
      }
    >
      <div id="wrapper" className="d-flex">
        {/* Navbar lateral */}
        <Navbar />

        {/* Conteúdo principal */}
        <div
          className="d-flex flex-column"
          id="content-wrapper"
          style={{ width: "calc(100% - 300px)", marginLeft: "300px" }}
        >
          <div id="content">
            <nav className="navbar navbar-expand bg-white text-center shadow justify-content-center mb-4 topbar">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-xxl-12">
                    <form
                      className="d-none d-sm-inline-block me-auto ms-md-3 my-2 my-md-0 mw-100 navbar-search"
                      style={{
                        marginRight: "0px",
                        marginBottom: "0px",
                        textAlign: "center",
                        marginLeft: "37px",
                      }}
                    >
                      <div className="input-group">
                        <input
                          type="text"
                          className="bg-light form-control border-0 small"
                          placeholder="Buscar Componente"
                          aria-label="Buscar Componente"
                        />
                        <button
                          className="btn btn-primary py-0"
                          type="button"
                          aria-label="Buscar"
                        >
                          <i className="fas fa-search"></i>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </nav>

            <div className="container-fluid">
              <div className="text-start d-sm-flex justify-content-between align-items-center mb-4">
                <h3 className="text-dark mb-0">Elementos</h3>
              </div>

              <ElementoOrdenavel1 />
              <ElementoOrdenavel2 />
              <ElementoOrdenavel3 />
              <ElementoOrdenavel4 />
              <ElementoOrdenavel5 />
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
