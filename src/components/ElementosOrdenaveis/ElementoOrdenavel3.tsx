import React from "react";

interface ProductItem {
  id: number;
  category: string;
  name: string;
  description: string;
  image: string;
}

const ElementoOrdenavel3: React.FC = () => {
  const products: ProductItem[] = [
    {
      id: 1,
      category: "Produto",
      name: "Nome do Produto",
      description: "Descrição do Produto",
      image: "./assets/placeholder.png",
    },
    {
      id: 2,
      category: "Produto",
      name: "Nome do Produto",
      description: "Descrição do Produto",
      image: "./assets/placeholder.png",
    },
    {
      id: 3,
      category: "Produto",
      name: "Nome do Produto",
      description: "Descrição do Produto",
      image: "./assets/placeholder.png",
    },
    {
      id: 4,
      category: "Produto",
      name: "Nome do Produto",
      description: "Descrição do Produto",
      image: "./assets/placeholder.png",
    },
  ];

  return (
    <>
      <div className="row">
        <div className="col-xxl-12">
          <h1>Elemento Ordenável 3</h1>
        </div>
      </div>
      <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3">
        {products.map((product) => (
          <div key={product.id} className="col-xxl-3">
            <div className="card">
              <img
                className="card-img-top w-100 d-block fit-cover"
                style={{ height: "200px" }}
                src={product.image}
                alt={product.name}
              />
              <div className="card-body p-4">
                <p className="text-primary card-text mb-0">
                  {product.category}
                </p>
                <h4 className="card-title">{product.name}</h4>
                <p className="card-text">{product.description}</p>
                <button
                  className="btn btn-primary"
                  type="button"
                  style={{ width: "100%" }}
                >
                  Comprar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ElementoOrdenavel3;
