import { api } from './api'; export const floodService={ list:()=>api.get('/api/flood'), get:(id:number)=>api.get(`/api/flood/${id}`), create:(data:any)=>api.post('/api/flood',data) };
