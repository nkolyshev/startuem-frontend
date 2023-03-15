import {Manager, Socket} from 'socket.io-client';

export class SocketApi {

    private readonly baseUrl = 'http://localhost:5555/';

    private manager: Manager;
    socket: Socket;

    constructor() {
        this.manager = new Manager(this.baseUrl);
        this.socket = this.manager.socket('/')
    }

}
