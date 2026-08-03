import { api } from './api'; export const roadService={ list:()=>api.get('/api/road'), get:(id:number)=>api.get(`/api/road/${id}`), create:(data:any)=>api.post('/api/road',data) };
