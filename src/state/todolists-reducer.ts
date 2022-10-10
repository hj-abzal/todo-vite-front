import {FilterValuesType, TodolistType} from '../App';
import {setTodolistsAC, SetTodolistsAT} from "./tasks-reducer";
import {Dispatch} from "redux";
import {todolistApi} from "../api/api";

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

type ActionsType = RemoveTodolistActionType | AddTodolistActionType
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

export const getTodolistsTC = () => {
    return async (dispatch: Dispatch) => {
        try {
            const res = await todolistApi.get()
            const todos = res.data.map((el: any) => ({...el, filter: 'all'}))
            dispatch(setTodolistsAC(todos))

        } catch (e) {

        }
    }
}

export const createTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistApi.create(title)
            .then((res) => {
                const action = addTodolistAC(title, res.data.id);
                dispatch(action);
            })
            .catch(() => {
            })
    }
}

export const deleteTodolistTC = (id: string) => (dispatch: Dispatch) => {
    todolistApi.delete(id)
        .then(() => {
            dispatch(removeTodolistAC(id));
        })
}


export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistApi.update(id, title)
            .then(() => {
                dispatch(changeTodolistTitleAC(id, title));
            })
    }
}

