import React, {ChangeEvent, useCallback} from 'react'
import {EditableSpan} from './EditableSpan'
import {TaskType} from './Todolist'
import './Task.css';
import TrashTask from './assecs/icons8-trash.svg'

type TaskPropsType = {
    task: TaskType
    todolistId: string
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
}
export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = useCallback(() => props.removeTask(props.task.id, props.todolistId), [props.task.id, props.todolistId]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.task.id, newIsDoneValue, props.todolistId)
    }, [props.task.id, props.todolistId]);

    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    }, [props.task.id, props.todolistId]);

    return <div key={props.task.id} className={props.task.isDone ? 'is-done ggg ' : 'ggg '}>
        <input type="checkbox" className="right"  checked={props.task.isDone} onChange={onChangeHandler}/>
        <EditableSpan value={props.task.title} onChange={onTitleChangeHandler}/>
        <button className="left" onClick={onClickHandler}>x</button>
        <button onClick={onClickHandler}>
            <img src={TrashTask}/>
        </button>
    </div>
})
