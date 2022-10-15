import {useCallback, useEffect} from 'react';
import style from './App.module.css';
import {TaskType, Todolist} from './components/Todolist/Todolist';
import {AddItemForm} from './components/AddItemForm/AddItemForm';
import {
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    createTodolistTC,
    deleteTodolistTC,
    getTodolistsTC
} from './state/todolists-reducer';
import {changeTaskStatusTC, changeTaskTitleTC, createTaskTC, deleteTaskTC} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';

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
    const dispatch = useDispatch<any>();

    const removeTask = useCallback(function (id: string, todolistId: string) {
        dispatch(deleteTaskTC(todolistId, id));
    }, []);

    const addTask = useCallback(function (title: string, todolistId: string) {
        dispatch(createTaskTC(todolistId, title));
    }, []);

    const changeStatus = useCallback(function (id: string, isDone: boolean, todolistId: string) {
        dispatch(changeTaskStatusTC(todolistId, isDone, id));
    }, []);

    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        dispatch(changeTaskTitleTC(todolistId, newTitle, id));
    }, []);


    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }, []);

    const removeTodolist = useCallback(function (id: string) {
        dispatch(deleteTodolistTC(id));
    }, []);

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        dispatch(changeTodolistTitleTC(id, title));
    }, []);

    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolistTC(title))
    }, [dispatch]);

    useEffect(() => {
        dispatch(getTodolistsTC())
    }, [])
    return (
        <div className={style.wrapper}>
            <AddItemForm addItem={addTodolist}/>
            <div className={style.gridContainer}>
                {
                    todolists.map(tl => {
                        let allTodolistTasks = tasks[tl.id];

                        return <div className={style.gridItem} key={tl.id}>
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

        </div>
    );
}