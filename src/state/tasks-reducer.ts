import {TaskType} from '../components/Todolist/Todolist';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsAT} from './todolists-reducer';
import {TasksStateType} from '../App';
import {Dispatch} from 'redux';
import {taskApi} from "../api/api";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    todolistId: string
    title: string
    taskId: string
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

export type SetTasksActionType = {
    type: "SET-TASKS"
    todolistId: string
    tasks: TaskType[]
}

type ActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsAT
    | SetTasksActionType

const initialState: TasksStateType = {}

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
                id: action.taskId,
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
                .map(t => t.id === action.taskId ? {...t, title: action.title} : t);

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
            action.todolists.forEach((tl) => {
                copyState[tl.id] = []
            })
            return copyState;
        }
        case 'SET-TASKS': {
            const copyState = {...state};
            copyState[action.todolistId] = action.tasks;
            return copyState;
        }
        default:
            return state;
    }
}

export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (title: string, todolistId: string, taskId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId, taskId}
}
export const changeTaskStatusAC = (todolistId: string, isDone: boolean, taskId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', isDone, todolistId, taskId}
}
export const changeTaskTitleAC = (todolistId: string, title: string, taskId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}

export const setTasksAC = (todolistId: string, tasks: TaskType[]): SetTasksActionType => {
    return {type: "SET-TASKS", todolistId, tasks}
}


export const getTasksTC = (todolistId: string) => {
    return async (dispatch: Dispatch) => {
        try {
            const res = await taskApi.get(todolistId)
            dispatch(setTasksAC(todolistId, res.data))
        } catch (e) {

        }
    }
}

export const createTaskTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        taskApi.create(todolistId, title)
            .then((res) => {
                const action = addTaskAC(title, todolistId, res.data.id);
                dispatch(action);
            })
            .catch(() => {
            })
    }
}

export const deleteTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        taskApi.delete(todolistId, taskId)
            .then(() => {
                const action = removeTaskAC(todolistId, taskId)
                dispatch(action);
            })
            .catch(() => {
            })
    }
}


export const changeTaskTitleTC = (todolistId: string, taskTitle: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        taskApi.updateTitle(todolistId, taskTitle, taskId)
            .then(() => {
                dispatch(changeTaskTitleAC(todolistId, taskTitle, taskId));
            })
            .catch(() => {
            })
    }
}

export const changeTaskStatusTC = (todolistId: string, isDone: boolean, taskId: string) => {
    return (dispatch: Dispatch) => {
        taskApi.updateStatus(todolistId, isDone, taskId)
            .then(() => {
                dispatch(changeTaskStatusAC(todolistId, isDone, taskId));
            })
            .catch(() => {
            })
    }
}