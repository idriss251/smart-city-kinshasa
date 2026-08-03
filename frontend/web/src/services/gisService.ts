import { api } from './api'; export const gisService={ list:()=>api.get('/gis'), get:(id:number)=>api.get(`/gis/${id}`), create:(data:any)=>api.post('/gis',data) };
