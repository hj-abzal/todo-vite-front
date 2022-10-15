import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://todo-back-production.up.railway.app/',
    headers: {
        withCredentials: true,
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWxlZ3JhbV9pZCI6MTI4ODMyNTc3MywiaWQiOjMsImxvZ2luIjoidWdhZ3ZhIiwiaWF0IjoxNjY1ODIwMjU4LCJleHAiOjE2NjU5MDY2NTh9.bwrZ-eFJIindnYhYZC8f01QCuVBD0mhwasWPIbWlgmw"
    }
});

export const authApi = {};

export const todolistApi = {
    get: () => {
        return instance.get('todolists')
    },
    create: (todoTitle: string) => {
        return instance.post('todolists', {title: todoTitle})
    },
    delete: (todoID: string) => {
        return instance.delete(`todolists/${todoID}`)
    },
    update: (todoID: string, title: string) => {
        return instance.put(`todolists/${todoID}`, {title})
    }
};

export const taskApi = {
    get: (todolistID: string) => {
        return instance.get(`todolists/${todolistID}/tasks`)
    },
    create: (title: string, todolistID: string) => {
        return instance.post(`todolists/${todolistID}/tasks`, {title})
    },
    delete:(taskID: string,todolistID: string) => {
        return instance.delete(`todolists/${todolistID}/tasks/${taskID}`)
    },
    update: (taskID:string,title:string,todolistID:string,) => {
        return instance.put(`todolists/${todolistID}/tasks/${taskID}`, {title})
    }
};


