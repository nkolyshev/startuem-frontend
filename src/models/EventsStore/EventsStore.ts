import {flow, makeAutoObservable} from "mobx";
import {EventsService} from "../../api/services/EventsService/EventsService";

export class EventsStore {
    constructor() {
        makeAutoObservable(this);
    }

    public eventsService = new EventsService();

    connectCardListener = flow(function* (this: EventsStore, cardListenerId: string) {
        yield this.eventsService.cardListenerJoin(cardListenerId);
    });

    subscribeStudentUIDs = flow(function* (this: EventsStore, callback: (uid: string) => void) {
        yield this.eventsService.socket.on('CARD_LISTENER:NEW_USER_ID', callback)
    });
}