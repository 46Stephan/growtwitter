import { Response } from "express";

export function errorServidor(res: Response, error: any) {
    res.status(500).send({
        ok: false,
        msg: error.toString()
    })
}

export function erroCampoNaoInformado(res: Response){
    return res.status(400).send({
        ok: false,
        msg: 'Preencha todos os campos'
    })
}

export function erroNaoEncontrado(res: Response, entidade: string) {
    return res.status(404).send({
        ok: false,
        msg: `${entidade} não encontrado`	
    })
}