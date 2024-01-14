import { Request, Response } from "express";
import { randomUUID } from "crypto";
import { erroCampoNaoInformado, errorServidor } from "../util/response.helper";
import repository from "../database/prisma.repository";

export class AuthController {

    public async login(request: Request, response: Response) {
        
        try {

            // - ENTRADA

            const { email, senha } = request.body;

            if (!email || !senha) {
                return erroCampoNaoInformado(response)
            }

            // - PROCESSAMENTO

            const usuario = await repository.usuario.findFirst({
                where: {email, senha},
                select: {id: true, nome:true}
            })

            if (!usuario) {
                return response.status(401).send({
                    ok: false,
                    message: 'Dados incorretos!'
                })
            }

            const token = randomUUID();

            await repository.usuario.update({
                where: {id: usuario.id},
                data: {token}
            })

            // - SAIDA

            return response.status(200).send({
                ok: true,
                message: 'Login foi realizado com sucesso!',
                data: {
                    id: usuario.id,
                    nome: usuario.nome,
                    token
                }
            })

        }catch (error: any) {
            errorServidor(response, error)
        }

    }




























}