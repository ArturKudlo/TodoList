import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from "./AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}

// Create
// Read
// Update
// Delete
function App() {
// BLL:
    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: "What to learn", filter: "all"},
        {id: todoListID_2, title: "What to buy", filter: "all"}
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListID_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: "Books", isDone: false},
            {id: v1(), title: "Notebook", isDone: true},
            {id: v1(), title: "Scooter", isDone: false},
            {id: v1(), title: "Car", isDone: true},
            {id: v1(), title: "BTC", isDone: false},
        ],
    })


    function removeTask(taskID: string, todoListID: string) {
        tasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskID);
        setTasks({...tasks});
    }
    function addTask(title: string, todoListID: string) {
        const newTask = {id: v1(), title: title, isDone: false};
        tasks[todoListID] = [newTask, ...tasks[todoListID]];
        setTasks({...tasks});
    }
    function changeTaskStatus(taskID: string, isDone: boolean, todoListID: string) {
        tasks[todoListID] = tasks[todoListID].map(t => {
            if(t.id === taskID){
                return {...t, isDone: isDone}
            }
            return t
        })
        setTasks({...tasks});
    }
    function changeTaskTitle(taskID: string, title: string, todoListID: string) {
        tasks[todoListID] = tasks[todoListID].map(t => {
            if(t.id === taskID){
                return {...t, title: title}
            }
            return t
        })
        setTasks({...tasks});
    }
    function changeTodoListFilter(value: FilterValuesType, todoListID: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter: value} : tl))
    }
    function removeTodoList (todoListID: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        const copy = {...tasks}
        delete copy[todoListID]
        setTasks(copy)
    }
    function addTodoList(title: string) {
        // const newTodoListID = v1()
        const newTodoList: TodoListType = {
            id:  v1(),
            title: title,
            filter: "all"
        }
        // todoLists.push(newTodoList)
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoList.id]: []})
    }
    function changeTodoListTitle(title: string, todoListID: string) {
        const upDatedTodoLists = todoLists.map(tl => {
            if(tl.id === todoListID){
                return {...tl, title: title}
            }
            return tl
        })
        setTodoLists(upDatedTodoLists)
    }





    const todoListsComponents = todoLists.map(tl => {

        let tasksForTodolist = tasks[tl.id];

        if (tl.filter === "active") {
            tasksForTodolist = tasks[tl.id].filter(t => t.isDone === false);
        }
        if (tl.filter === "completed") {
            tasksForTodolist = tasks[tl.id].filter(t => t.isDone === true);
        }
//
        return (
            <Todolist
                todoListID={tl.id}
                filter={tl.filter}
                title={tl.title}
                tasks={tasksForTodolist}
                addTask={addTask}
                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter}
                changeTaskStatus={changeTaskStatus}
                removeTodoList={removeTodoList}
                changeTaskTitle={changeTaskTitle}
                changeTodoListTitle={changeTodoListTitle}
            />
        )
    })
// GUI:
    return (
        <div className="App">
            <AddItemForm addItem={addTodoList} />
            {todoListsComponents}
        </div>
    );
}

export default App;
