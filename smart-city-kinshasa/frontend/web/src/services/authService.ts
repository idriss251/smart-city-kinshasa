import { api } from './api'; export const authService={ list:()=>api.get('/api/auth'), get:(id:number)=>api.get(`/api/auth/${id}`), create:(data:any)=>api.post('/api/auth',data) };
