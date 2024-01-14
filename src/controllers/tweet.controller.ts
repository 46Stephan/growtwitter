import { Request, Response } from "express";
import { erroCampoNaoInformado, erroNaoEncontrado, errorServidor } from "../util/response.helper";  
import repository from "../database/prisma.repository";
import { adaptUsuarioPrisma } from "../util/usuario.adapter";
import { Tweet } from "../models/tweet.model";

export class TweetController {

    public async criarTweet(request: Request, response: Response) {

        try {

            // - ENTRADA

            const {id} = request.params;
            const {conteudo, tipoTweet} = request.body;
            const {authorization} = request.headers;

            if(!conteudo || !tipoTweet) {
                return erroCampoNaoInformado(response);
            }

            if(!authorization) {
                response.status(400).send({
                    ok: false,
                    message: 'Token ausente'
                })
            }

            // - PROCESSAMENTO

            const usuario = await repository.usuario.findUnique({where: {id}})

            if (!usuario){
                return erroNaoEncontrado(response, 'Usuario');
            }

            if (usuario.token !== authorization) {
                response.status(401).send({
                    ok: false,
                    message: 'Token invalido!'
                })
            }

            const usuarioBackend = adaptUsuarioPrisma(usuario);
            const tweet = new Tweet(usuarioBackend, conteudo, tipoTweet);
            const result = await repository.tweet.create({
                data:{
                    idUsuario: tweet.usuarioId.id,
                    conteudo: tweet.conteudo,
                    tipoTweet: tweet.tipoTweet
                }
            })

            // - SAIDA

            return response.status(201).send({
                ok: true,
                data: result,
                message: 'O Tweet foi criado com sucesso!'
            })

        } catch (error) {
            errorServidor(response, error);
        }
    }

    public async listarTweet(request: Request, response: Response) {

        try {

            const result = await repository.tweet.findMany()

            if (result.length === 0) {
                return erroNaoEncontrado(response, 'Usuario')
            }

            return response.status(201).send({
                ok: true,
                data: result
            })

        }catch (error: any) {
           return response.status(500).send({
               ok: false,
               message: error.toString()
           });
        }
    }

    public async editarTweets(request: Request, response: Response) {
        try{

            const {id} = request.params;
            const {conteudo} = request.body;

            if(!conteudo) {
                return response.status(400).send({
                    ok: false,
                    message: 'O campo conteudo não pode ser vazio! Preencha o campo.'
                })
            };

            const tweet = await repository.tweet.findUnique({
                where: {id}
            })

            if(!tweet) {
                return response.status(404).send({
                    ok: false,
                    message: erroNaoEncontrado(response, 'Tweet')
                })
            }

            const result = await repository.tweet.update({
                where: {id},
                data: {conteudo}
            })

            return response.status(201).send({
                ok: true,
                message: 'Seu Tweet foi atualizado com sucesso!'
            })

        }catch (error: any) {
            errorServidor(response, error)
        }
    }

    public async deletarTweets(request: Request, response: Response) {
        try{
            const {id} = request.params;
            const result = await repository.tweet.findUnique({
                where: {id}
            })

            if(!result){
                return response.status(404).send({
                    ok: false,
                    message: 'Tweet não foi encontrado.'
                })
            }

            await repository.tweet.delete({
                where: {id}
            })
            return response.status(201).send({
                ok: true,
                message: 'O Tweet foi deletado com sucesso!'
            })

        }catch(error: any) {
            return response.status(500).send({
                ok: false,
                message: error.toString()
            })
        }
    }

    public async buscarTweetId(request: Request, response: Response) {
        try{
            
            const {id} = request.params;
            const result = await repository.tweet.findUnique({
                where: {id}
            })

            if (!result){
                return response.status(404).send(
                    erroNaoEncontrado(response, 'Tweet')
                )
            }

            return response.status(201).send({
                ok: true,
                data: result
            })

        }catch (error: any) {
            errorServidor(response, error)
        }

    }
}























































































































