interface TaskProps {
    id: number
    text:string
    complete: boolean
    deleteTask: (id: number) => void
    toggleComplete:(id: number) => void
    startEditing:(id: number, text: string) => void
}

const Task = ({id,text,complete,deleteTask,toggleComplete,startEditing}:TaskProps) => {
  return (
    <>
         <li className={`list-group-item d-flex justify-content-between ${complete ? "completed": ""}`}>
            <div>
                {/* A checkbox that indicats wether the task is complete or not.  */}
                <input 
                type="checkbox" 
                className="form-check-input me-2" 
                checked={complete}
                onChange={() => toggleComplete(id)}
                
                />
                <span>
                    {text}
                </span>

            </div>
            <div>
                {/* The "Edit" button triggers the 'startEditTask' function with the task's id and text.
                 This allows the parent component to iniate a editing mode for the selected task. */}
                <button onClick={() => startEditing(id,text)} className="btn btn-outline-info m-2">Edit</button>
                <button onClick={() => deleteTask(id)} className="btn btn-outline-danger">Delete</button>

            </div>
        </li>
    
    </>
  )
}

export default Task