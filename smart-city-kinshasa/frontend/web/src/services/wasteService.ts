import { api } from './api'; export const wasteService={ list:()=>api.get('/api/waste'), get:(id:number)=>api.get(`/api/waste/${id}`), create:(data:any)=>api.post('/api/waste',data) };
