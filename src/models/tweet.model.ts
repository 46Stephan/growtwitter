import { randomUUID } from "crypto";
import { Usuario } from "./usuario.model";

export class Tweet {
    
    id: string;
    conteudo: string;
    tipoTweet: string;

    constructor(public usuarioId: Usuario, conteudo: string, tipoTweet: string) {
        this.id = randomUUID();
        this.conteudo = conteudo;
        this.tipoTweet = tipoTweet;
    }
}