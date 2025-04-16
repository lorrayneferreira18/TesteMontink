import React, { useState } from "react";
import ModalComponent from "../ModalComponent/ModalComponent";

interface TaskItem {
  id: number;
  name: string;
  time: string;
  completed: boolean;
}

interface ColorItem {
  id: number;
  name: string;
  color: string;
  code: string;
}

const ElementoOrdenavel2: React.FC = () => {
  // Estados para as tarefas
  const [tasks, setTasks] = useState<TaskItem[]>([
    { id: 1, name: "Tarefa 1", time: "10:30 AM", completed: false },
    { id: 2, name: "Tarefa 2", time: "11:30 AM", completed: false },
    { id: 3, name: "Tarefa 3", time: "12:30 AM", completed: false },
  ]);
  // Paleta de cores Bootstrap
  const bootstrapColors: ColorItem[] = [
    { id: 1, name: "Primary", color: "primary", code: "#4e73df" },
    { id: 2, name: "Success", color: "success", code: "#1cc88a" },
    { id: 3, name: "Info", color: "info", code: "#36b9cc" },
    { id: 4, name: "Warning", color: "warning", code: "#f6c23e" },
    { id: 5, name: "Danger", color: "danger", code: "#e74a3b" },
    { id: 6, name: "Secondary", color: "secondary", code: "#858796" },
  ];
  // Estados para as cores
  const [colors, setColors] = useState<ColorItem[]>(bootstrapColors);

  // Estados para o drag and drop
  const [draggedItem, setDraggedItem] = useState<TaskItem | null>(null);
  const [dragOverId, setDragOverId] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Estados para os modais de edição
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showColorModal, setShowColorModal] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskItem | null>(null);
  const [editingColor, setEditingColor] = useState<ColorItem | null>(null);
  const [tempName, setTempName] = useState("");
  const [tempTime, setTempTime] = useState("");
  const [tempColorName, setTempColorName] = useState("");
  const [showColorPicker, setShowColorPicker] = useState(false);

  // Funções para drag and drop (mantidas as mesmas)
  const handleDragStart = (
    e: React.DragEvent<HTMLLIElement>,
    task: TaskItem
  ) => {
    setDraggedItem(task);
    setIsDragging(true);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", task.id.toString());
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedItem(null);
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLLIElement>,
    task: TaskItem
  ) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverId(task.id);
  };

  const handleDragLeave = () => {
    setDragOverId(null);
  };

  const handleDrop = (
    e: React.DragEvent<HTMLLIElement>,
    targetTask: TaskItem
  ) => {
    e.preventDefault();
    setDragOverId(null);

    if (!draggedItem) return;

    const draggedId = parseInt(e.dataTransfer.getData("text/plain"));
    const currentTask = tasks.find((task) => task.id === draggedId);

    if (!currentTask) return;

    const currentIndex = tasks.findIndex((task) => task.id === draggedId);
    const targetIndex = tasks.findIndex((task) => task.id === targetTask.id);

    if (currentIndex !== targetIndex) {
      const newTasks = [...tasks];
      newTasks.splice(currentIndex, 1);
      newTasks.splice(targetIndex, 0, currentTask);
      setTasks(newTasks);
    }
  };

  // Funções para edição de tarefas
  const handleTaskClick = (task: TaskItem) => {
    if (isDragging) return;
    setEditingTask(task);
    setTempName(task.name);
    setTempTime(task.time);
    setShowTaskModal(true);
  };

  const handleSaveTaskChanges = () => {
    if (!editingTask) return;

    setTasks(
      tasks.map((task) =>
        task.id === editingTask.id
          ? { ...task, name: tempName, time: tempTime }
          : task
      )
    );
    setShowTaskModal(false);
  };

  // Funções para edição de cores
  const handleColorClick = (color: ColorItem) => {
    setEditingColor(color);
    setTempColorName(color.name);
    setShowColorModal(true);
  };

  const handleSaveColorChanges = () => {
    if (!editingColor) return;

    // Encontra a cor selecionada na paleta
    const selectedColor = bootstrapColors.find((c) => c.name === tempColorName);

    if (selectedColor) {
      setColors(
        colors.map((color) =>
          color.id === editingColor.id
            ? {
                ...color,
                name: tempColorName,
                color: selectedColor.color,
                code: selectedColor.code,
              }
            : color
        )
      );
    }

    setShowColorModal(false);
  };

  // Função para marcar/desmarcar tarefa como concluída
  const toggleTaskCompletion = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="row">
      <div className="col-xxl-12">
        <h1>Elemento Ordenável 2</h1>
      </div>

      {/* Lista de Tarefas (Arrastável) */}
      <div className="col-lg-6 mb-4">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="text-primary fw-bold m-0">Lista de Tarefas</h6>
          </div>
          <ul className="list-group list-group-flush">
            {tasks.map((task) => (
              <li
                key={task.id}
                className={`list-group-item ${
                  dragOverId === task.id ? "drag-over" : ""
                }`}
                draggable
                onDragStart={(e) => handleDragStart(e, task)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => handleDragOver(e, task)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, task)}
                onClick={() => handleTaskClick(task)}
                style={{
                  cursor: isDragging ? "grabbing" : "pointer",
                  opacity: draggedItem?.id === task.id ? 0.5 : 1,
                }}
              >
                <div className="row g-0 align-items-center">
                  <div className="col me-2">
                    <h6 className="mb-0">
                      <strong
                        style={{
                          textDecoration: task.completed
                            ? "line-through"
                            : "none",
                        }}
                      >
                        {task.name}
                      </strong>
                    </h6>
                    <span className="text-xs">{task.time}</span>
                  </div>
                  <div className="col-auto">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={task.completed}
                        onChange={() => toggleTaskCompletion(task.id)}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          width: "1.8em",
                          height: "1.8em",
                          marginTop: "0.2em",
                          cursor: "pointer",
                          backgroundColor: task.completed ? "#4e73df" : "white",
                          borderColor: "#4e73df",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Cards de Cores (Editáveis) */}
      <div className="col">
        <div className="row">
          {colors.map((color) => (
            <div key={color.id} className="col-lg-6 mb-4">
              <div
                className="card text-white shadow"
                onClick={() => handleColorClick(color)}
                style={{
                  cursor: "pointer",
                  backgroundColor: color.code,
                }}
              >
                <div className="card-body">
                  <p className="m-0">{color.name}</p>
                  <p className="text-white-50 small m-0">{color.code}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Edição de Tarefa */}
      <ModalComponent
        show={showTaskModal}
        onClose={() => setShowTaskModal(false)}
      >
        <div className="modal-header">
          <h5 className="modal-title">Editar Tarefa</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowTaskModal(false)}
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          <form className="mt-4">
            <div className="mb-3">
              <label className="form-label">Nome da Tarefa</label>
              <input
                type="text"
                className="form-control"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Horário</label>
              <input
                type="text"
                className="form-control"
                value={tempTime}
                onChange={(e) => setTempTime(e.target.value)}
              />
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowTaskModal(false)}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSaveTaskChanges}
          >
            Salvar Alterações
          </button>
        </div>
      </ModalComponent>

      {/* Modal de Edição de Cor */}
      <ModalComponent
        show={showColorModal}
        onClose={() => setShowColorModal(false)}
      >
        <div className="modal-header">
          <h5 className="modal-title">Editar Cor</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowColorModal(false)}
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          <form className="mt-4">
            <div className="mb-3">
              <label className="form-label">Nome da Cor</label>
              <input
                type="text"
                className="form-control"
                value={tempColorName}
                onChange={(e) => setTempColorName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Selecionar Cor</label>
              <div className="d-flex align-items-center mb-2">
                <div
                  className="color-preview me-3"
                  style={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: editingColor?.code || "#ffffff",
                    border: "1px solid #dee2e6",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => setShowColorPicker(!showColorPicker)}
                ></div>
                <span>{editingColor?.code || "Selecione uma cor"}</span>
              </div>

              {showColorPicker && (
                <div className="color-palette p-2 border rounded">
                  <div className="row g-2">
                    {bootstrapColors.map((color) => (
                      <div
                        key={color.code}
                        className="col-4 col-md-3"
                        onClick={() => {
                          setTempColorName(color.name);
                          if (editingColor) {
                            setEditingColor({
                              ...editingColor,
                              color: color.color,
                              code: color.code,
                            });
                          }
                          setShowColorPicker(false);
                        }}
                        style={{
                          backgroundColor: color.code,
                          height: "40px",
                          borderRadius: "4px",
                          cursor: "pointer",
                          border:
                            editingColor?.code === color.code
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
          </form>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowColorModal(false)}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSaveColorChanges}
          >
            Salvar Alterações
          </button>
        </div>
      </ModalComponent>
    </div>
  );
};

export default ElementoOrdenavel2;
