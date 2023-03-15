import {flow, makeAutoObservable} from "mobx";
import {EventsService} from "../../api/services/EventsService/EventsService";
import {Channel} from "pusher-js";

export class EventsStore {
    constructor() {
        makeAutoObservable(this);
    }

    public eventsService = new EventsService();

    connectCardListener = flow(function* (this: EventsStore, cardListenerId: string, callback: (uid: string) => void) {
        const channel = yield this.eventsService.cardListenerJoin(cardListenerId);
        yield channel?.bind(`push_UID`, callback);
    });
}