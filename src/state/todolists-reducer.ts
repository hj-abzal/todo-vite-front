import {FilterValuesType, TodolistType} from '../App';
import {Dispatch} from "redux";
import {todolistApi} from "../api/api";
import {setIsLoadingAC} from "./app-reducer";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
    todolistId: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

export type SetTodolistsAT = {
    type: 'SET-TODOLISTS',
    todolists: TodolistType[]
}

type ActionsType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsAT

const initialState: Array<TodolistType> = []

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all'
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state]
        }

        case 'SET-TODOLISTS': {
            return action.todolists
        }
        default:
            return state;
    }
}


export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (title: string, id: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: title, todolistId: id}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}
export const setTodolistsAC = (todolists: TodolistType[]): SetTodolistsAT => {
    return {type: 'SET-TODOLISTS', todolists}
}

export const getTodolistsTC = () => {
    return async (dispatch: Dispatch) => {
            dispatch(setIsLoadingAC(true))
            todolistApi.get()
                .then((res)=>{
                    const todos = res.data.map((el: any) => ({...el, filter: 'all'}))
                    dispatch(setTodolistsAC(todos))
                    })
                .catch()
                .finally(()=>{
                    dispatch(setIsLoadingAC(false))
                })


    }
}

export const createTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setIsLoadingAC(true))
        todolistApi.create(title)
            .then((res) => {
                const action = addTodolistAC(title, res.data.id);
                dispatch(action);
            })
            .catch()
            .finally(() => {
                dispatch(setIsLoadingAC(false))
            })
    }
}

export const deleteTodolistTC = (id: string) => (dispatch: Dispatch) => {
    dispatch(setIsLoadingAC(true))
    todolistApi.delete(id)
        .then(() => {
            dispatch(removeTodolistAC(id));
        })
        .catch()
        .finally(() => {
            dispatch(setIsLoadingAC(false))
        })
}


export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setIsLoadingAC(true))
        todolistApi.update(id, title)
            .then(() => {
                dispatch(changeTodolistTitleAC(id, title));
            })
            .catch()
            .finally(() => {
                dispatch(setIsLoadingAC(false))
            })
    }
}