import React from "react";

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
  const tasks: TaskItem[] = [
    { id: 1, name: "Tarefa 1", time: "10:30 AM", completed: false },
    { id: 2, name: "Tarefa 2", time: "11:30 AM", completed: false },
    { id: 3, name: "Tarefa 3", time: "12:30 AM", completed: false },
  ];

  const colors: ColorItem[] = [
    { id: 1, name: "Primary", color: "primary", code: "#4e73df" },
    { id: 2, name: "Success", color: "success", code: "#1cc88a" },
    { id: 3, name: "Info", color: "info", code: "#36b9cc" },
    { id: 4, name: "Warning", color: "warning", code: "#f6c23e" },
    { id: 5, name: "Danger", color: "danger", code: "#e74a3b" },
    { id: 6, name: "Secondary", color: "secondary", code: "#858796" },
  ];

  return (
    <div className="row">
      <div className="col-xxl-12">
        <h1>Elemento Ordenável 2</h1>
      </div>
      <div className="col-lg-6 mb-4">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="text-primary fw-bold m-0">Lista de Tarefas</h6>
          </div>
          <ul className="list-group list-group-flush">
            {tasks.map((task) => (
              <li key={task.id} className="list-group-item">
                <div className="row g-0 align-items-center">
                  <div className="col me-2">
                    <h6 className="mb-0">
                      <strong>{task.name}</strong>
                    </h6>
                    <span className="text-xs">{task.time}</span>
                  </div>
                  <div className="col-auto">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`formCheck-${task.id}`}
                      />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="col">
        <div className="row">
          {colors.map((color) => (
            <div key={color.id} className="col-lg-6 mb-4">
              <div className={`card text-white bg-${color.color} shadow`}>
                <div className="card-body">
                  <p className="m-0">{color.name}</p>
                  <p className="text-white-50 small m-0">{color.code}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ElementoOrdenavel2;
