import { api } from './api'; export const floodService={ list:()=>api.get('/flood'), get:(id:number)=>api.get(`/flood/${id}`), create:(data:any)=>api.post('/flood',data) };
