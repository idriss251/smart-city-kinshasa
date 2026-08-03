import {Navigate} from 'react-router-dom'; export default function ProtectedRoute({children}:{children:JSX.Element}){return localStorage.getItem('token')?children:<Navigate to='/login'/>}
