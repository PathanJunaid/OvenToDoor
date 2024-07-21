import { Manager} from 'socket.io-client';
import react from 'react';
const manager =new Manager(`${import.meta.env.VITE_APP_Server}`,{
    reconnectionDelayMax: 10000,
})
const socket = manager.socket('/');
const Adminsocket = manager.socket('/Admin/logout')
export {Adminsocket,socket};