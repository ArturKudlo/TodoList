import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    todoListID: string
}

export type AddTodoListAT = {
    type: "ADD-TODOLIST"
    title: string
}

export type ChangeTodoListTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    title: string,
    todoListID: string
}
export type ChangeTodoListFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    value: FilterValuesType,
    todoListID: string
}

export type ActionsType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

export const todoListsReducer = (todoLists: Array<TodoListType>, action: ActionsType) =>{
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.todoListID)
        case "ADD-TODOLIST":
            const newTodoList: TodoListType = {
                id:  v1(),
                title: action.title,
                filter: "all"
            }
            return [...todoLists, newTodoList]
        case "CHANGE-TODOLIST-TITLE":
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
          return todoLists.map(tl => tl.id === action.todoListID ? {...tl, filter: action.value} : tl)
        default:
            return todoLists
    }
}

export const RemoveTodoListAC = (todoListID: string): RemoveTodoListAT => {
    return { type: "REMOVE-TODOLIST", todoListID: todoListID}
}

export const AddTodoListAC = (title: string): AddTodoListAT => {
    return {type: "ADD-TODOLIST", title: title}
}

export const ChangeTodoListTitleAC = (title: string, todoListID: string): ChangeTodoListTitleAT => {
    return { type: "CHANGE-TODOLIST-TITLE", title: title, todoListID: todoListID}
}

export const ChangeTodoListFilterAC = (value: FilterValuesType, todoListID: string): ChangeTodoListFilterAT => {
    return { type: "CHANGE-TODOLIST-FILTER", value: value, todoListID: todoListID}
}
