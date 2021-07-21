import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {v1} from 'uuid';
import {TaskType} from "../Todolist";
import {AddTodolistAC, AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    taskId: string,
    todolistId: string

}
export type AddTaskActionType = {
    type: 'ADD-TASK',
    todolistId: string,
    title: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-STATUS',
    todolistId: string,
    isDone: boolean,
    taskId: string
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TITLE',
    todolistId: string,
    title: string,
    taskId: string
}


type ActionsType = RemoveTaskActionType | AddTodolistActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType | RemoveTodolistActionType;

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let copyState = {...state}
            copyState[action.todolistId] = copyState[action.todolistId].filter(task => task.id !== action.taskId)
            return copyState
        }
        case 'ADD-TASK': {
            let newTask: TaskType = {id: v1(), title: action.title, isDone: false}
            return   {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        }
        case 'CHANGE-STATUS': {

            return   {...state, [action.todolistId]: state[action.todolistId].map(task => {
                if (task.id === action.taskId)
                    return {...task, isDone: action.isDone}
                else {
                    return {...task}
                    }
                }
            )}
        }
        case 'CHANGE-TITLE': {

            return   {...state, [action.todolistId]: state[action.todolistId].map(task => {
                        if (task.id === action.taskId)
                            return {...task, title: action.title}
                        else {
                            return {...task}
                        }
                    }
                )}
        }

        case "ADD-TODOLIST": {
            return {...state, [action.todolistId]: []}
        }
        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }


        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, todolistId }
}
export const addTaskAC = ( title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', todolistId, title}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-STATUS', taskId, isDone, todolistId}
}

export const changeTitleStatusAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TITLE', taskId, title, todolistId}
}

