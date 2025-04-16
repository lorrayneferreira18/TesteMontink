import React, { useState, useRef } from "react";
import ModalComponent from "../ModalComponent/ModalComponent";

interface ImageItem {
  id: number;
  src: string;
  alt: string;
}

const ElementoOrdenavel4: React.FC = () => {
  // Estado para as imagens
  const [images, setImages] = useState<ImageItem[]>([
    { id: 1, src: "./assets/placeholder.png", alt: "Imagem 1" },
    { id: 2, src: "./assets/placeholder.png", alt: "Imagem 2" },
  ]);

  // Estados para o drag and drop
  const [draggedImage, setDraggedImage] = useState<ImageItem | null>(null);
  const [dragOverId, setDragOverId] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Estados para o modal de edição
  const [showModal, setShowModal] = useState(false);
  const [editingImage, setEditingImage] = useState<ImageItem | null>(null);
  const [tempAlt, setTempAlt] = useState("");
  const [tempImage, setTempImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Funções para drag and drop
  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    image: ImageItem
  ) => {
    setDraggedImage(image);
    setIsDragging(true);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", image.id.toString());
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedImage(null);
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    image: ImageItem
  ) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverId(image.id);
  };

  const handleDragLeave = () => {
    setDragOverId(null);
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    targetImage: ImageItem
  ) => {
    e.preventDefault();
    setDragOverId(null);

    if (!draggedImage) return;

    const draggedId = parseInt(e.dataTransfer.getData("text/plain"));
    const currentImage = images.find((img) => img.id === draggedId);

    if (!currentImage) return;

    const currentIndex = images.findIndex((img) => img.id === draggedId);
    const targetIndex = images.findIndex((img) => img.id === targetImage.id);

    if (currentIndex !== targetIndex) {
      const newImages = [...images];
      newImages.splice(currentIndex, 1);
      newImages.splice(targetIndex, 0, currentImage);
      setImages(newImages);
    }
  };

  // Funções para edição da imagem
  const handleImageClick = (image: ImageItem) => {
    if (isDragging) return;

    setEditingImage(image);
    setTempAlt(image.alt);
    setTempImage(image.src);
    setPreviewImage(image.src);
    setShowModal(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewImage(result);
        setTempImage(result);
      };

      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSaveChanges = () => {
    if (!editingImage) return;

    setImages(
      images.map((img) =>
        img.id === editingImage.id
          ? {
              ...img,
              alt: tempAlt,
              src: tempImage,
            }
          : img
      )
    );
    setShowModal(false);
  };

  return (
    <div
      className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3"
      style={{ marginTop: "0px" }}
    >
      <div className="col-xxl-12">
        <h1>Elemento Ordenável 4</h1>
      </div>

      {images.map((image) => (
        <div
          key={image.id}
          className="col-xxl-6"
          draggable
          onDragStart={(e) => handleDragStart(e, image)}
          onDragEnd={handleDragEnd}
          onDragOver={(e) => handleDragOver(e, image)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, image)}
          onClick={() => handleImageClick(image)}
          style={{
            cursor: isDragging ? "grabbing" : "pointer",
            opacity: draggedImage?.id === image.id ? 0.5 : 1,
          }}
        >
          <div
            className={`card ${
              dragOverId === image.id ? "border-primary border-3" : ""
            }`}
          >
            <img
              className="card-img-top w-100 d-block fit-cover"
              style={{ height: "380px" }}
              src={image.src}
              alt={image.alt}
            />
          </div>
        </div>
      ))}

      {/* Modal de Edição */}
      <ModalComponent show={showModal} onClose={() => setShowModal(false)}>
        <div className="modal-header">
          <h5 className="modal-title">Editar Imagem</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowModal(false)}
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          <form className="mt-4">
            <div className="mb-3 text-center">
              <img
                src={previewImage}
                alt="Preview"
                className="img-fluid mb-2"
                style={{
                  maxHeight: "300px",
                  cursor: "pointer",
                  border: "1px solid #dee2e6",
                  borderRadius: "0.25rem",
                }}
                onClick={triggerFileInput}
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                style={{ display: "none" }}
              />
              <button
                type="button"
                className="btn btn-secondary w-100"
                onClick={triggerFileInput}
              >
                Alterar Imagem
              </button>
            </div>

            <div className="mb-3">
              <label className="form-label">Texto Alternativo (alt)</label>
              <input
                type="text"
                className="form-control"
                value={tempAlt}
                onChange={(e) => setTempAlt(e.target.value)}
                placeholder="Descrição da imagem"
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

export default ElementoOrdenavel4;
