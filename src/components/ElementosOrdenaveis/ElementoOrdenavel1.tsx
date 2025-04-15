import React from "react";

interface CardItem {
  id: number;
  title: string;
  value: string;
  icon: string;
}

const ElementoOrdenavel1: React.FC = () => {
  const cards: CardItem[] = [
    {
      id: 1,
      title: "Elemento 1",
      value: "$40,000",
      icon: "fas fa-calendar",
    },
    {
      id: 2,
      title: "Elemento 2",
      value: "$40,000",
      icon: "fas fa-calendar",
    },
    {
      id: 3,
      title: "Elemento 3",
      value: "$50,000",
      icon: "fas fa-calendar",
    },
    {
      id: 4,
      title: "Elemento 4",
      value: "$40,000",
      icon: "fas fa-calendar",
    },
  ];

  return (
    <div className="row">
      <div className="col-xxl-12">
        <h1>Elemento Ordenável 1</h1>
      </div>
      {cards.map((card) => (
        <div key={card.id} className="col-md-6 col-xl-3 mb-4">
          <div className="card shadow border-left-primary py-2">
            <div className="card-body">
              <div className="row g-0 align-items-center">
                <div className="col me-2">
                  <div className="text-uppercase text-primary fw-bold text-xs mb-1">
                    <span>{card.title}</span>
                  </div>
                  <div className="text-dark fw-bold h5 mb-0">
                    <span>{card.value}</span>
                  </div>
                </div>
                <div className="col-auto">
                  <i className={`${card.icon} fa-2x text-gray-300`}></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ElementoOrdenavel1;
