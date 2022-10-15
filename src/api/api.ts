import axios from 'axios';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWxlZ3JhbV9pZCI6MTA3MTkyNzE1MiwiaWQiOjEsImxvZ2luIjoiU3VhbiIsImlhdCI6MTY2NTgyMTQ3OSwiZXhwIjoxNjY1OTA3ODc5fQ.dk7ZaMr2EGinbyIGrMy8SOAuUVRSbtf80rr85JzR3_U'
const instance = axios.create({
    baseURL: 'https://todo-back-production.up.railway.app/',
    headers: {
        withCredentials: true,
        Authorization: `Bearer ${token}`
    }
});


export const todolistApi = {
    get: () => {
        return instance.get('todolists')
    },
    create: (todoTitle: string) => {
        return instance.post('todolists', {title: todoTitle})
    },
    delete: (todolistId: string) => {
        return instance.delete(`todolists/${todolistId}`)
    },
    update: (todolistId: string, todoTitle: string) => {
        return instance.put(`todolists/${todolistId}`, {title: todoTitle})
    }
};

export const taskApi = {
    get: (todolistId: string) => {
        return instance.get(`todolists/${todolistId}/tasks`)
    },
    create: (todolistId: string, taskTitle: string) => {
        return instance.post(`todolists/${todolistId}/tasks`, {title: taskTitle})
    },
    delete: (todolistId: string, taskId: string) => {
        return instance.delete(`todolists/${todolistId}/tasks/${taskId}`)
    },
    updateTitle: (todolistId: string, taskTitle: string, taskId: string) => {
        return instance.put(`todolists/${todolistId}/tasks/${taskId}`, {title: taskTitle})
    },
    updateStatus: (todolistId: string, idDone: boolean, taskId: string) => {
        return instance.put(`todolists/${todolistId}/tasks/${taskId}`, {idDone})
    }
};


