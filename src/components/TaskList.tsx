import Task from "./Task";





///Define the shap of the props that TaskList will receive
interface TaskListProps {
    tasks: {id:number,text:string,complete:boolean}[];
    deleteTask: (id: number) => void;
    startEditTask: (id: number, text:string) => void;
    toggleComplete: (id:number) => void
}

const TaskList = ({tasks,deleteTask,startEditTask,toggleComplete}:TaskListProps) => {

    ///Return the JSX (UI) to render the TaskList  component
  return (
<>
  
    {/* Ul and map our <Tasks/> pass in our props set these props eventually from parent component */}
    <ul className="list-group mt-4" data-bs-theme="dark">
        {tasks.map((task) => (
            // Render the Tasks component for each task, passing task details and control function as props
            <Task
                key={task.id}
                id={task.id}
                text={task.text}
                deleteTask={deleteTask}
                startEditing={startEditTask}
                toggleComplete={toggleComplete}
                complete={task.complete}
            />
        ))}

    </ul>
</>
  )
}

export default TaskList