import { api } from './api'; export const authService={ list:()=>api.get('/auth'), get:(id:number)=>api.get(`/auth/${id}`), create:(data:any)=>api.post('/auth',data) };
