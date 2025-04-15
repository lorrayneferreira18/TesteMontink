import React from "react";

const ElementoOrdenavel4: React.FC = () => {
  const images = [
    { id: 1, src: "./assets/placeholder.png", alt: "Imagem 1" },
    { id: 2, src: "./assets/placeholder.png", alt: "Imagem 2" },
  ];

  return (
    <div
      className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3"
      style={{ marginTop: "0px" }}
    >
      <div className="col-xxl-12">
        <h1>Elemento Ordenável 4</h1>
      </div>
      {images.map((image) => (
        <div key={image.id} className="col-xxl-6">
          <div className="card">
            <img
              className="card-img-top w-100 d-block fit-cover"
              style={{ height: "380px" }}
              src={image.src}
              alt={image.alt}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ElementoOrdenavel4;
