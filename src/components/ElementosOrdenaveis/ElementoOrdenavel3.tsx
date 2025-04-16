import React, { useState, useRef } from "react";
import ModalComponent from "../ModalComponent/ModalComponent";

interface ProductItem {
  id: number;
  category: string;
  name: string;
  description: string;
  image: string;
}

const ElementoOrdenavel3: React.FC = () => {
  // Estado para os produtos
  const [products, setProducts] = useState<ProductItem[]>([
    {
      id: 1,
      category: "Produto",
      name: "Nome do Produto 1",
      description: "Descrição do Produto 1",
      image: "./assets/placeholder.png",
    },
    {
      id: 2,
      category: "Produto",
      name: "Nome do Produto 2",
      description: "Descrição do Produto 2",
      image: "./assets/placeholder.png",
    },
    {
      id: 3,
      category: "Produto",
      name: "Nome do Produto 3",
      description: "Descrição do Produto 3",
      image: "./assets/placeholder.png",
    },
    {
      id: 4,
      category: "Produto",
      name: "Nome do Produto 4",
      description: "Descrição do Produto 4",
      image: "./assets/placeholder.png",
    },
  ]);

  // Estados para o drag and drop
  const [draggedProduct, setDraggedProduct] = useState<ProductItem | null>(
    null
  );
  const [dragOverId, setDragOverId] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Estados para o modal de edição
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(
    null
  );
  const [tempCategory, setTempCategory] = useState("");
  const [tempName, setTempName] = useState("");
  const [tempDescription, setTempDescription] = useState("");
  const [tempImage, setTempImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Funções para drag and drop
  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    product: ProductItem
  ) => {
    setDraggedProduct(product);
    setIsDragging(true);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", product.id.toString());
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedProduct(null);
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    product: ProductItem
  ) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverId(product.id);
  };

  const handleDragLeave = () => {
    setDragOverId(null);
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    targetProduct: ProductItem
  ) => {
    e.preventDefault();
    setDragOverId(null);

    if (!draggedProduct) return;

    const draggedId = parseInt(e.dataTransfer.getData("text/plain"));
    const currentProduct = products.find((product) => product.id === draggedId);

    if (!currentProduct) return;

    const currentIndex = products.findIndex(
      (product) => product.id === draggedId
    );
    const targetIndex = products.findIndex(
      (product) => product.id === targetProduct.id
    );

    if (currentIndex !== targetIndex) {
      const newProducts = [...products];
      newProducts.splice(currentIndex, 1);
      newProducts.splice(targetIndex, 0, currentProduct);
      setProducts(newProducts);
    }
  };

  // Funções para edição do produto
  const handleProductClick = (product: ProductItem) => {
    if (isDragging) return;

    setEditingProduct(product);
    setTempCategory(product.category);
    setTempName(product.name);
    setTempDescription(product.description);
    setTempImage(product.image);
    setPreviewImage(product.image);
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
    if (!editingProduct) return;

    setProducts(
      products.map((product) =>
        product.id === editingProduct.id
          ? {
              ...product,
              category: tempCategory,
              name: tempName,
              description: tempDescription,
              image: tempImage,
            }
          : product
      )
    );
    setShowModal(false);
  };

  return (
    <>
      <div className="row">
        <div className="col-xxl-12">
          <h1 id="elemento-ordenavel-3">Elemento Ordenável 3</h1>
        </div>
      </div>

      <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3">
        {products.map((product) => (
          <div
            key={product.id}
            id={`elemento-ordenavel-3-item${product.id}`}
            className="col-xxl-3"
            draggable
            onDragStart={(e) => handleDragStart(e, product)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => handleDragOver(e, product)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, product)}
            onClick={() => handleProductClick(product)}
            style={{
              cursor: isDragging ? "grabbing" : "pointer",
              opacity: draggedProduct?.id === product.id ? 0.5 : 1,
            }}
          >
            <div
              className={`card ${
                dragOverId === product.id ? "border-primary" : ""
              }`}
            >
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
                  onClick={(e) => {
                    e.stopPropagation(); // Evita que o clique no botão abra o modal
                  }}
                >
                  Comprar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Edição */}
      <ModalComponent show={showModal} onClose={() => setShowModal(false)}>
        <div className="modal-header">
          <h5 className="modal-title">Editar Produto</h5>
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
                style={{ maxHeight: "200px", cursor: "pointer" }}
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
                className="btn btn-sm btn-secondary"
                onClick={triggerFileInput}
              >
                Alterar Imagem
              </button>
            </div>

            <div className="mb-3">
              <label className="form-label">Categoria</label>
              <input
                type="text"
                className="form-control"
                value={tempCategory}
                onChange={(e) => setTempCategory(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Nome do Produto</label>
              <input
                type="text"
                className="form-control"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Descrição</label>
              <textarea
                className="form-control"
                rows={3}
                value={tempDescription}
                onChange={(e) => setTempDescription(e.target.value)}
              ></textarea>
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
    </>
  );
};

export default ElementoOrdenavel3;
