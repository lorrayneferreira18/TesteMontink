import React from "react";
import ElementoOrdenavel1 from "../ElementosOrdenaveis/ElementoOrdenavel1";
import ElementoOrdenavel2 from "../ElementosOrdenaveis/ElementoOrdenavel2";
import ElementoOrdenavel3 from "../ElementosOrdenaveis/ElementoOrdenavel3";
import ElementoOrdenavel4 from "../ElementosOrdenaveis/ElementoOrdenavel4";
import ElementoOrdenavel5 from "../ElementosOrdenaveis/ElementoOrdenavel5";

const MainContent: React.FC = () => {
  return (
    <div className="d-flex flex-column" id="content-wrapper">
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
                    />
                    <button className="btn btn-primary py-0" type="button">
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
  );
};

export default MainContent;
