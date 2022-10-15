import {TaskType} from '../Todolist';

import {
    addTodolistAC,
    AddTodolistActionType,
    changeTodolistTitleAC,
    removeTodolistAC,
    RemoveTodolistActionType
} from './todolists-reducer';
import {TasksStateType, TodolistType} from '../App';
import {Dispatch} from "redux";
import {taskApi, todolistApi} from "../api/api";
import {v1} from "uuid";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    todolistId: string
    title: string
    id:string

}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    todolistId: string
    taskId: string
    isDone: boolean
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string
    taskId: string
    title: string
}


type ActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsAT
    | SetTasksAT

const initialState: TasksStateType = {

}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
        const newTasks = tasks.filter(t => t.id != action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const newTask: TaskType = {
                id:action.id,
                title: action.title,
                isDone: false
            }
            const tasks = stateCopy[action.todolistId];
            const newTasks = [newTask, ...tasks];
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            // найдём нужную таску:
            let newTasksArray = todolistTasks
                .map(task => task.id === action.taskId ? {...task, title: action.title} : task);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case 'SET-TODOLISTS': {
            const copyState = {...state};
            action.todolists.forEach((t) => {
                copyState[t.id] = []
            })
            return copyState
        }
        case 'SET-TASKS': {
            const copyState = {...state};
            copyState[action.todoId] = action.tasks;
            return copyState
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}

export const addTaskAC = (id:string,title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK',id,title, todolistId}
}


export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', isDone, todolistId, taskId}
}
export const changeTaskTitleAC = (taskId: string,title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE',taskId, title, todolistId, }
}

export const setTodolistsAC = (todolists: TodolistType[]): SetTodolistsAT => {
    return {type: 'SET-TODOLISTS', todolists}
}

export const setTasksAC = (tasks: TaskType[], todoId: string): SetTasksAT => {
    return {type: 'SET-TASKS', tasks, todoId}
}
export type SetTasksAT = {
    type: 'SET-TASKS',
    todoId: string;
    tasks: TaskType[]
}

export type SetTodolistsAT = {
    type: 'SET-TODOLISTS',
    todolists: TodolistType[]
}

export const removeTasksTC = (taskId: string, todolistId: string) => {
       return ((dispatch: Dispatch) => {
           taskApi.delete(taskId,todolistId)
               .then((res)=>{
                   dispatch(removeTaskAC(taskId,todolistId))
               })

       })
}



export const addTasksTC = (title:string, todolistId: string)=> {
    return ((dispatch: Dispatch) => {
        taskApi.create(title, todolistId,)
            .then((res) => {
                dispatch(addTaskAC(res.data.id, title, todolistId));
            })
            .catch(() => {
            })
    })
}
export const getTasksTC = (todoID: string) => {
    return async (dispatch: Dispatch) => {
        try {
            const res = await taskApi.get(todoID)
            dispatch(setTasksAC(res.data, todoID))
        } catch (e) {
        }
    }
}
export const changeTaskTitleTC = (taskId:string,newTitle:string,todolistId:string,) => {
    return (dispatch: Dispatch) => {
           taskApi.update(taskId,newTitle,todolistId)
               .then ((res)=>{
                   dispatch(changeTaskTitleAC(taskId,newTitle,todolistId,));
               })
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
                dispatch(changeTodolistTitleAC(id,title));
            })
    }
}

