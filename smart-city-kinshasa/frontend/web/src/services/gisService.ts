import { api } from './api'; export const gisService={ list:()=>api.get('/api/gis'), get:(id:number)=>api.get(`/api/gis/${id}`), create:(data:any)=>api.post('/api/gis',data) };
