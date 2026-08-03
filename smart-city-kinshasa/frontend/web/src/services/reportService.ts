import { api } from './api'; export const reportService={ list:()=>api.get('/api/citizen'), get:(id:number)=>api.get(`/api/citizen/${id}`), create:(data:any)=>api.post('/api/citizen',data) };
