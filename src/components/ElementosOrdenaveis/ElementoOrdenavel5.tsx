import React, { useState, useRef } from "react";
import ModalComponent from "../ModalComponent/ModalComponent";

interface ButtonConfig {
  text: string;
  link: string;
  style: string;
  color: string;
}

interface BannerContent {
  title: string;
  subtitle: string;
  image: string;
  button1: ButtonConfig;
  button2: ButtonConfig;
}

const ElementoOrdenavel5: React.FC = () => {
  // Paleta de cores Bootstrap
  const bootstrapColors = [
    { name: "Primary", value: "#4e73df" },
    { name: "Secondary", value: "#858796" },
    { name: "Success", value: "#1cc88a" },
    { name: "Danger", value: "#e74a3b" },
    { name: "Warning", value: "#f6c23e" },
    { name: "Info", value: "#36b9cc" },
    { name: "Light", value: "#f8f9fa" },
    { name: "Dark", value: "#5a5c69" },
  ];

  // Estado para o conteúdo do banner
  const [banner, setBanner] = useState<BannerContent>({
    title: "Título",
    subtitle: "Subtítulo",
    image: "./assets/placeholder.png",
    button1: {
      text: "Botão 1",
      link: "#",
      style: "btn btn-lg me-2",
      color: "#4e73df", // Cor primária
    },
    button2: {
      text: "Botão 2",
      link: "#",
      style: "btn btn-lg",
      color: "#f8f9fa", // Cor light
    },
  });

  // Estados para o drag and drop
  const [isDragging, setIsDragging] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  // Estados para o modal de edição
  const [showModal, setShowModal] = useState(false);
  const [editingData, setEditingData] = useState({
    title: "",
    subtitle: "",
    image: "",
    button1: {
      text: "",
      link: "",
      style: "",
      color: "",
    },
    button2: {
      text: "",
      link: "",
      style: "",
      color: "",
    },
  });
  const [previewImage, setPreviewImage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeColorPicker, setActiveColorPicker] = useState<string | null>(
    null
  );

  // Funções para drag and drop
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", "banner");
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDragOver(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  // Funções para edição do banner
  const handleBannerClick = () => {
    if (isDragging) return;

    setEditingData({
      title: banner.title,
      subtitle: banner.subtitle,
      image: banner.image,
      button1: { ...banner.button1 },
      button2: { ...banner.button2 },
    });
    setPreviewImage(banner.image);
    setShowModal(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewImage(result);
        setEditingData((prev) => ({ ...prev, image: result }));
      };

      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSaveChanges = () => {
    setBanner({
      title: editingData.title,
      subtitle: editingData.subtitle,
      image: editingData.image,
      button1: { ...editingData.button1 },
      button2: { ...editingData.button2 },
    });
    setShowModal(false);
  };

  const toggleColorPicker = (button: "button1" | "button2") => {
    setActiveColorPicker(activeColorPicker === button ? null : button);
  };

  const selectColor = (color: string, button: "button1" | "button2") => {
    setEditingData((prev) => ({
      ...prev,
      [button]: {
        ...prev[button],
        color: color,
      },
    }));
    setActiveColorPicker(null);
  };

  return (
    <div
      className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3"
      style={{ margin: "0px -12px 0px" }}
    >
      <div className="col-xxl-12">
        <h1 id="elemento-ordenavel-5">Elemento Ordenável 5</h1>
      </div>

      <div
        className="col-xxl-12"
        id="elemento-ordenavel-5-titulo"
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleBannerClick}
        style={{
          cursor: isDragging ? "grabbing" : "pointer",
          opacity: isDragging ? 0.7 : 1,
        }}
      >
        <section>
          <div className="container">
            <div
              className={`bg-dark border rounded border-0 border-dark overflow-hidden ${
                dragOver ? "border-primary border-3" : ""
              }`}
            >
              <div className="row g-0">
                <div className="col-md-6">
                  <div className="text-white p-4 p-md-5">
                    <h2
                      className="fw-bold text-white mb-3"
                      id="elemento-ordenavel-5-subtitulo"
                    >
                      {banner.title}
                    </h2>
                    <p className="mb-4">{banner.subtitle}</p>
                    <div className="my-3">
                      <a
                        className={banner.button1.style}
                        role="button"
                        id="elemento-ordenavel-5-botao1"
                        href={banner.button1.link}
                        onClick={(e) => e.stopPropagation()}
                        style={{ backgroundColor: banner.button1.color }}
                      >
                        {banner.button1.text}
                      </a>
                      <a
                        className={banner.button2.style}
                        role="button"
                        id="elemento-ordenavel-5-botao2"
                        href={banner.button2.link}
                        onClick={(e) => e.stopPropagation()}
                        style={{ backgroundColor: banner.button2.color }}
                      >
                        {banner.button2.text}
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
                    src={banner.image}
                    id="elemento-ordenavel-5-imagem"
                    alt="Banner"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Modal de Edição */}
      <ModalComponent show={showModal} onClose={() => setShowModal(false)}>
        <div className="modal-header">
          <h5 className="modal-title">Editar Banner</h5>
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
                value={editingData.title}
                onChange={(e) =>
                  setEditingData({ ...editingData, title: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Subtítulo</label>
              <textarea
                className="form-control"
                rows={3}
                value={editingData.subtitle}
                onChange={(e) =>
                  setEditingData({ ...editingData, subtitle: e.target.value })
                }
              ></textarea>
            </div>

            <div className="mb-3 text-center">
              <img
                src={previewImage}
                alt="Preview"
                className="img-fluid mb-2"
                style={{
                  maxHeight: "200px",
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

            <div className="border p-3 mb-3 rounded">
              <h6>Botão 1</h6>
              <div className="mb-3">
                <label className="form-label">Texto</label>
                <input
                  type="text"
                  className="form-control"
                  value={editingData.button1.text}
                  onChange={(e) =>
                    setEditingData({
                      ...editingData,
                      button1: {
                        ...editingData.button1,
                        text: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Link</label>
                <input
                  type="text"
                  className="form-control"
                  value={editingData.button1.link}
                  onChange={(e) =>
                    setEditingData({
                      ...editingData,
                      button1: {
                        ...editingData.button1,
                        link: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Cor</label>
                <div className="d-flex align-items-center">
                  <div
                    className="color-preview me-3"
                    style={{
                      width: "30px",
                      height: "30px",
                      backgroundColor: editingData.button1.color,
                      border: "1px solid #dee2e6",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                    onClick={() => toggleColorPicker("button1")}
                  ></div>
                  <span>{editingData.button1.color}</span>
                </div>

                {activeColorPicker === "button1" && (
                  <div className="color-picker mt-2 p-2 border rounded">
                    <div className="row g-2">
                      {bootstrapColors.map((color) => (
                        <div
                          key={`button1-${color.value}`}
                          id={`elemento-ordenavel-5-item${color.value}`}
                          className="col-3"
                          onClick={() => selectColor(color.value, "button1")}
                          style={{
                            backgroundColor: color.value,
                            height: "30px",
                            borderRadius: "4px",
                            cursor: "pointer",
                            border:
                              editingData.button1.color === color.value
                                ? "2px solid #000"
                                : "1px solid #dee2e6",
                          }}
                          title={color.name}
                        ></div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="border p-3 rounded">
              <h6>Botão 2</h6>
              <div className="mb-3">
                <label className="form-label">Texto</label>
                <input
                  type="text"
                  className="form-control"
                  value={editingData.button2.text}
                  onChange={(e) =>
                    setEditingData({
                      ...editingData,
                      button2: {
                        ...editingData.button2,
                        text: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Link</label>
                <input
                  type="text"
                  className="form-control"
                  value={editingData.button2.link}
                  onChange={(e) =>
                    setEditingData({
                      ...editingData,
                      button2: {
                        ...editingData.button2,
                        link: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Cor</label>
                <div className="d-flex align-items-center">
                  <div
                    className="color-preview me-3"
                    style={{
                      width: "30px",
                      height: "30px",
                      backgroundColor: editingData.button2.color,
                      border: "1px solid #dee2e6",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                    onClick={() => toggleColorPicker("button2")}
                  ></div>
                  <span>{editingData.button2.color}</span>
                </div>

                {activeColorPicker === "button2" && (
                  <div className="color-picker mt-2 p-2 border rounded">
                    <div className="row g-2">
                      {bootstrapColors.map((color) => (
                        <div
                          key={`button2-${color.value}`}
                          className="col-3"
                          id={`elemento-ordenavel-5-item${color.value}`}
                          onClick={() => selectColor(color.value, "button2")}
                          style={{
                            backgroundColor: color.value,
                            height: "30px",
                            borderRadius: "4px",
                            cursor: "pointer",
                            border:
                              editingData.button2.color === color.value
                                ? "2px solid #000"
                                : "1px solid #dee2e6",
                          }}
                          title={color.name}
                        ></div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
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

export default ElementoOrdenavel5;
