import { api } from './api'; export const reportService={ list:()=>api.get('/citizen'), get:(id:number)=>api.get(`/citizen/${id}`), create:(data:any)=>api.post('/citizen',data) };
