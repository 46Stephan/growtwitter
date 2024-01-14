import { Request, Response, response } from "express";
import repository from "../database/prisma.repository";
import { erroNaoEncontrado, errorServidor } from "../util/response.helper";
import { Usuario } from "../models/usuario.model";
import { ok } from "assert";

export class UsuarioController {

    public async criarUsuario(request: Request, response: Response) {
        try {
            
            // - ENTRADA

            const { nome, nomeUsuario, email, senha } = request.body;


            // - PROCESSAMENTO

            if (!nome || !nomeUsuario || !email || !senha) {
                return response.status(400).send({
                    ok: false,
                    message: 'Dados incompletos! Preencha todos os campos.'
                });
            }

            const usuario = new Usuario(nome, nomeUsuario, email, senha);
            await repository.usuario.create({
                data: usuario
            })

            // - SAIDA

            return response.status(201).send({
                ok: true,
                message: 'Usuário criado com sucesso!'
            });
            } catch (error) {
                errorServidor(response, error);
            }
    }

    public async buscarUsuario(request: Request, response: Response) {
        try{
            // - ENTRADA

            const { id } = request.params;

            // - PROCESSAMENTO

            const usuario = await repository.usuario.findUnique({
                where: {id},
                include: {tweets: true}
            })

            if(!usuario){
                return erroNaoEncontrado(response, 'Usuário');
            
            }

            // - SAIDA

            return response.status(200).send({
                ok: true,
                message: 'Usuário foi encontrado com sucesso!',
                data: usuario
            })
        } catch (error: any) {
            errorServidor(response, error);
        }
    }

    public async listarUsuarios(request: Request, response: Response) {

        const result = await repository.usuario.findMany()

        if (Usuario.length === 0) {
            return erroNaoEncontrado(response, 'Usuario')
        }

        return response.status(201).send({
            ok: true,
            data: result
        })
    }

    public async editarUsuario(request: Request, response: Response) {
        try {
            const { id } = request.params
            const { nome, nomeUsuario } = request.body

            if (!nome && !nomeUsuario) {
                return response.status(400).send(
                    {
                        ok: false,
                        message: 'Informe o campo que deseja atualizar.'
                    }
                )
            };

            const usuario = await repository.usuario.findUnique({ where: { id } })

            if (!usuario) {
                return (response.status(404).send({ 
                    ok: false, 
                    message: erroNaoEncontrado(response, 'usuario') }))
            }

            const result = await repository.usuario.update({
                where: { id },
                data: { nome, nomeUsuario }
            })

            return response.status(201).send({
                ok: true,
                message: 'Usuario foi atualizado com sucesso!',
                data: result
            })
        }        catch (error: any) {
            errorServidor(response, error)

        }
    }

    public async deletarUsuario(request: Request, response: Response) {
        try {
            const { id } = request.params
            const result = await repository.usuario.findUnique({ where: { id } })

            if (!result)  return (response.status(404).send({ 
                ok: false, 
                message: erroNaoEncontrado(response, 'usuario') })) 

            await repository.usuario.delete({ where: { id } })

            return response.status(201).send({ 
                ok: true, 
                message: 'Usuario foi deletado com sucesso!' 
            })
        
            }        catch (error: any) {
                errorServidor(response, error)
    
            }
    }

}