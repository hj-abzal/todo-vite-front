import {useCallback, useEffect} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, setTodolistsAC} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import axios from "axios";


export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


export function App() {

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    const dispatch = useDispatch();

    const removeTask = useCallback(function (id: string, todolistId: string) {
        const action = removeTaskAC(id, todolistId);
        dispatch(action);
    }, []);

    const addTask = useCallback(function (title: string, todolistId: string) {
        const action = addTaskAC(title, todolistId);
        dispatch(action);
    }, []);

    const changeStatus = useCallback(function (id: string, isDone: boolean, todolistId: string) {
        const action = changeTaskStatusAC(id, isDone, todolistId);
        dispatch(action);
    }, []);

    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        const action = changeTaskTitleAC(id, newTitle, todolistId);
        dispatch(action);
    }, []);

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }, []);

    const removeTodolist = useCallback(function (id: string) {
        const action = removeTodolistAC(id);
        dispatch(action);
    }, []);

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        const action = changeTodolistTitleAC(id, title);
        dispatch(action);
    }, []);

    const addTodolist = useCallback((title: string) => {
        axios.post(`https://todo-back-production.up.railway.app/todolists/`, {title},{
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWxlZ3JhbV9pZCI6MTA3MTkyNzE1MiwiaWQiOjEsImxvZ2luIjoiU3VhbiIsImlhdCI6MTY2NDYyMDQ4OCwiZXhwIjoxNjY0NzA2ODg4fQ.B3nGolcoTu7Hz-7b8qNYnM0tnmQnmWUDe1c_9889NLg"
            }
        }).then((res) => {
            const action = addTodolistAC(title);
            dispatch(action);
        })

    }, [dispatch]);

    useEffect(() => {
        axios.get('https://todo-back-production.up.railway.app/todolists', {
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWxlZ3JhbV9pZCI6MTA3MTkyNzE1MiwiaWQiOjEsImxvZ2luIjoiU3VhbiIsImlhdCI6MTY2NDYyMDQ4OCwiZXhwIjoxNjY0NzA2ODg4fQ.B3nGolcoTu7Hz-7b8qNYnM0tnmQnmWUDe1c_9889NLg"
            }
        }).then((res) => {
            console.log(res.data);
            const todos = res.data.map((el: any) => ({...el, filter: 'all'}))
            dispatch(setTodolistsAC(todos))
        })

    }, []);

    return (
        <div className="App">
                    <AddItemForm addItem={addTodolist}/>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];

                            return <div key={tl.id}>
                                    <Todolist
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={allTodolistTasks}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                            </div>;
                        })
                    }

        </div>
    );
}