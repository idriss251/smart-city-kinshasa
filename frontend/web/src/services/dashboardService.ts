import { api } from './api'; export const dashboardService={ list:()=>api.get('/dashboard'), get:(id:number)=>api.get(`/dashboard/${id}`), create:(data:any)=>api.post('/dashboard',data) };
