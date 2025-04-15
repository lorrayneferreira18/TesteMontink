import React, { useState } from "react";
import ModalComponent from "../ModalComponent/ModalComponent";

interface CardItem {
  id: number;
  title: string;
  value: string;
  icon: string;
}

const ElementoOrdenavel1: React.FC = () => {
  const [cards, setCards] = useState<CardItem[]>([
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
  ]);

  const [draggedItem, setDraggedItem] = useState<CardItem | null>(null);
  const [dragOverId, setDragOverId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingCard, setEditingCard] = useState<CardItem | null>(null);
  const [tempTitle, setTempTitle] = useState("");
  const [tempValue, setTempValue] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    item: CardItem
  ) => {
    setDraggedItem(item);
    setIsDragging(true);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", item.id.toString());
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedItem(null);
  };
  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    item: CardItem
  ) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverId(item.id);
  };

  const handleDragLeave = () => {
    setDragOverId(null);
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    targetItem: CardItem
  ) => {
    e.preventDefault();
    setDragOverId(null);

    if (!draggedItem) return;

    const draggedId = parseInt(e.dataTransfer.getData("text/plain"));
    const currentItem = cards.find((item) => item.id === draggedId);

    if (!currentItem) return;

    const currentIndex = cards.findIndex((item) => item.id === draggedId);
    const targetIndex = cards.findIndex((item) => item.id === targetItem.id);

    if (currentIndex !== targetIndex) {
      const newCards = [...cards];
      newCards.splice(currentIndex, 1);
      newCards.splice(targetIndex, 0, currentItem);
      setCards(newCards);
    }
  };

  const handleCardClick = (card: CardItem) => {
    setEditingCard(card);
    setTempTitle(card.title);
    setTempValue(card.value);
    setShowModal(true);
  };

  const handleSaveChanges = () => {
    if (!editingCard) return;

    setCards(
      cards.map((card) =>
        card.id === editingCard.id
          ? { ...card, title: tempTitle, value: tempValue }
          : card
      )
    );
    setShowModal(false);
  };

  return (
    <div className="row">
      <div className="col-xxl-12">
        <h1>Elemento Ordenável 1</h1>
      </div>
      {cards.map((card) => (
        <div
          key={card.id}
          className={`col-md-6 col-xl-3 mb-4 ${
            dragOverId === card.id ? "drag-over" : ""
          }`}
          draggable
          onDragStart={(e) => handleDragStart(e, card)}
          onDragEnd={handleDragEnd}
          onDragOver={(e) => handleDragOver(e, card)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, card)}
          onClick={() => !isDragging && handleCardClick(card)}
          style={{
            cursor: isDragging ? "grabbing" : "pointer",
          }}
        >
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

      <ModalComponent show={showModal} onClose={() => setShowModal(false)}>
        <div className="modal-header">
          <h5 className="modal-title">Editar Elemento Ordenável 1</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowModal(false)}
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          <form className="mt-4">
            <div className="mb-3">
              <label className="form-label">Título</label>
              <input
                type="text"
                className="form-control"
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Valor</label>
              <input
                type="text"
                className="form-control"
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
              />
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowModal(false)}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSaveChanges}
          >
            Salvar Alterações
          </button>
        </div>
      </ModalComponent>
    </div>
  );
};

export default ElementoOrdenavel1;
