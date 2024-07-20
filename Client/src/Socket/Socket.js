import { Manager} from 'socket.io-client';
const manager =new Manager('http://localhost:5000',{
    reconnectionDelayMax: 10000,
})
const socket = manager.socket('/');
const Adminsocket = manager.socket('/Admin/logout')
export {Adminsocket,socket};