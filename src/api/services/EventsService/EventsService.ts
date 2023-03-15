import Pusher from 'pusher-js';

export class EventsService {

    async cardListenerJoin(cardListenerId: string) {

        const pusher = new Pusher('cab2f8ec3d436dfc8411', {
            cluster: 'eu',
            forceTLS: false,
        });

        return pusher.subscribe(`card_listener_${cardListenerId}`);
    }

}
