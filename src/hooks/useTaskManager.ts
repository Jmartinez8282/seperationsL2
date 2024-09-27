import { useEffect, useState } from "react";


interface Task {
    id: number;
    text: string;
    complete: boolean;
}

const storagekey = "Tasks"

export const useTaskManager = () => {

    ///State for mananagin tasks, input, and edit mode
    const [task, setTask] = useState<Task[]>(() => {
        const storedTask = localStorage.getItem(storagekey);
        return storedTask ? JSON.parse(storedTask) : [];
    });

    const [input, setInput] = useState<string>("");
    const [editingId, setEditingId] = useState<number | null>(null);

    const [filter, setFilter] = useState<"all" | 'completed' | "pending">("all");

    //Load Tasks from localstorage on mount
    //useEffect will run what is inside as soon as App compoenent loads
    useEffect(() => {
        const storedTasks = localStorage.getItem(storagekey);

        if (storedTasks) {
            setTask(JSON.parse(storedTasks));
        }
    }, []);

    //Save tasks to localStorage whenever tasks change

    useEffect(() => {

        localStorage.setItem(storagekey, JSON.stringify(task));

    }, [task])

    ///functions will go below..............

    ///function to add or updatea task

    const addTask = () => {

        //editing

        if (input === "") return;

        if (editingId !== null) {

            const updateTasks = task.map((task) => (
                task.id === editingId ? { ...task, text: input } : task
            ));
            setTask(updateTasks);
            setEditingId(null);
            setInput("");

        } else {
            ///adding

            const newTask: Task = {
                id: Date.now(),
                text: input,
                complete: false
            }
            setTask([newTask, ...task]);
            setInput('');
        }

    };

    ///function to start editing a task
    const startEditing = (id: number, text: string) => {
        setEditingId(id);
        setInput(text);
    }

    //function to cancel editing
    const cancelEdit = () => {
        setEditingId(null);
        setInput("");
    }

    ///function to delete a task

    const deleteTask = (id: number) => {
        const deletedItem = task.filter((task) => task.id !== id);
        setTask(deletedItem);
    }


    //function to toggle a task complete status
    const toggleComplete = (id: number) => {
        const updateTasks = task.map((task) => task.id === id ? { ...task, complete: !task.complete } : task)
        setTask(updateTasks);
    }

    ///Filter the tasks base don the current fileter (all, completed, or pending).

    const filteredTasks = task.filter((task) => {
        if(filter === "completed") return task.complete; ///Show only completed tasks.
        if(filter === "pending") return !task.complete; //show only pending
        return true;// Show all task when the filter is "all"
    })

    return { task:filteredTasks, input, setInput, editingId, addTask, startEditing, cancelEdit, deleteTask, toggleComplete,filter,setFilter }

}