import React from "react";

const ElementoOrdenavel5: React.FC = () => {
  return (
    <div
      className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3"
      style={{ margin: "0px -12px 0px" }}
    >
      <div className="col-xxl-12">
        <h1>Elemento Ordenável 5</h1>
      </div>
      <div className="col-xxl-12">
        <section>
          <div className="container">
            <div className="bg-dark border rounded border-0 border-dark overflow-hidden">
              <div className="row g-0">
                <div className="col-md-6">
                  <div className="text-white p-4 p-md-5">
                    <h2 className="fw-bold text-white mb-3">Título&nbsp;</h2>
                    <p className="mb-4">Subtítulo</p>
                    <div className="my-3">
                      <a
                        className="btn btn-primary btn-lg me-2"
                        role="button"
                        href="#"
                      >
                        Botão 1
                      </a>
                      <a
                        className="btn btn-light btn-lg"
                        role="button"
                        href="#"
                      >
                        Botão 2
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-6 order-first order-md-last"
                  style={{ minHeight: "250px" }}
                >
                  <img
                    className="w-100 h-100 fit-cover"
                    src="./assets/placeholder.png"
                    alt="Placeholder"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ElementoOrdenavel5;
