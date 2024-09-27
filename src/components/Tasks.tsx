import { useTaskManager } from "../hooks/useTaskManager";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

const Tasks = () => {
  const {
    task,
    input,
    setInput,
    editingId,
    addTask,
    startEditing,
    cancelEdit,
    deleteTask,
    toggleComplete,
    filter,
    setFilter
  } = useTaskManager();

  return (
    <>
      <div>
        <h1>My Tasks</h1>
        <TaskForm
          input={input}
          setInput={setInput}
          addTask={addTask}
          editingId={editingId}
          cancelEdit={cancelEdit}
        />
        <div>
        <div className="filter-buttons">
        <button
          className={`btn ${filter === "all" ? "btn-primary" : "btn-outline-primary"}`} // Apply active class for "all" filter.
          onClick={() => setFilter("all")} // Set the filter to "all" when clicked.
        >
          All
        </button>
        <button
          className={`btn ${filter === "completed" ? "btn-primary" : "btn-outline-primary"}`} // Apply active class for "completed" filter.
          onClick={() => setFilter("completed")} // Set the filter to "completed" when clicked.
        >
          Completed
        </button>
        <button
          className={`btn ${filter === "pending" ? "btn-primary" : "btn-outline-primary"}`} // Apply active class for "pending" filter.
          onClick={() => setFilter("pending")} // Set the filter to "pending" when clicked.
        >
          Pending
        </button>
      </div>

        </div>

        <TaskList
          tasks={task}
          deleteTask={deleteTask}
          startEditTask={startEditing}
          toggleComplete={toggleComplete}
        />
      </div>
    </>
  );
};

export default Tasks;
