import { api } from './api'; export const wasteService={ list:()=>api.get('/waste'), get:(id:number)=>api.get(`/waste/${id}`), create:(data:any)=>api.post('/waste',data) };
