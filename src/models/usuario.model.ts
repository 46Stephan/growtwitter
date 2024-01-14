import { randomUUID } from "crypto";

export class Usuario {
    public id: string;
    public nome: string;
    public nomeUsuario: string;
    public email: string;
    public senha: string;


    constructor(nome: string, nomeUsuario: string, email: string, senha: string) {
        this.id = randomUUID();
        this.nome = nome;
        this.nomeUsuario = nomeUsuario;
        this.email = email;
        this.senha = senha;
    }
}