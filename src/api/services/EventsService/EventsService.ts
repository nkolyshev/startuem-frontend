import {SocketApi} from '../../SocketApi';

export class EventsService extends SocketApi {

    async cardListenerJoin(cardListenerId: string) {
        this.socket.emit('CARD_LISTENER:JOIN', cardListenerId);
    }

}
