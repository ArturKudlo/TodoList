import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    todoListID: string
    removeTask: (taskID: string, todoListID: string) => void
    changeTodoListFilter: (value: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle:(taskID: string, title: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}

export function Todolist(props: PropsType) {

    const addTask = (title: string) => props.addTask(title, props.todoListID);

    const onClickRemoveTodoList = () => {props.removeTodoList(props.todoListID)}
    const onAllClickHandler = () => props.changeTodoListFilter("all", props.todoListID);
    const onActiveClickHandler = () => props.changeTodoListFilter("active", props.todoListID);
    const onCompletedClickHandler = () => props.changeTodoListFilter("completed", props.todoListID);
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListID)

    return <div>
        <h3>
            <EditableSpan title={props.title} changeTitle={changeTodoListTitle} />

            <button onClick={onClickRemoveTodoList}>X</button>
        </h3>
        <AddItemForm addItem={addTask} />
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id, props.todoListID)
                    const isDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
                    }
                    const changeTaskTitleHandler = (title: string) => {
                        props.changeTaskTitle(t.id, title, props.todoListID)
                    }
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input
                            type="checkbox"
                            checked={t.isDone}
                            onChange={isDoneHandler}
                        />
                        <EditableSpan title={t.title} changeTitle={changeTaskTitleHandler}/>
                        {/*<span>{t.title}</span>*/}
                        <button onClick={ onClickHandler }>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button
                className={props.filter === "all" ? "active" : ""}
                onClick={ onAllClickHandler }>All</button>
            <button
                className={ props.filter === "active" ? "active" : ""}
                onClick={ onActiveClickHandler }>Active</button>
            <button
                className={ props.filter === "completed" ? "active" : ""}
                onClick={ onCompletedClickHandler }>Completed</button>
        </div>
    </div>
}
