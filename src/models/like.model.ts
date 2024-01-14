import { randomUUID } from "crypto";

export class Like {
    
    id: string;
    usuarioId: string;
    tweetId: string;

    constructor(usuarioId: string, tweetId: string) {
        this.id = randomUUID();
        this.usuarioId = usuarioId;
        this.tweetId = tweetId;
    }

}