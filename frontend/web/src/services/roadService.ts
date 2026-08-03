import { api } from './api'; export const roadService={ list:()=>api.get('/road'), get:(id:number)=>api.get(`/road/${id}`), create:(data:any)=>api.post('/road',data) };
