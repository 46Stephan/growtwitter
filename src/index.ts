import  express  from "express";
import cors from "cors";
import { UsuarioController } from "./controllers/user.controller";
import { TweetController } from "./controllers/tweet.controller";
import { AuthController } from "./controllers/auth.controller";


const app = express();
app.use(express.json());
app.use(cors());

const usuarioController = new UsuarioController();
const tweetController = new TweetController();
const authController = new AuthController();


// PARA USUÁRIO

app.post("/usuario", usuarioController.criarUsuario);
app.get("/usuario/:id", usuarioController.buscarUsuario);
app.get("/usuario/", usuarioController.listarUsuarios);
app.put("/usuario/:id", usuarioController.editarUsuario);
app.delete("/usuario/:id", usuarioController.deletarUsuario);


// PARA TWEET

app.post("/usuario/:id/tweet", tweetController.criarTweet);
app.get("/tweets", tweetController.listarTweet);
app.put("/tweet/:id", tweetController.editarTweets);
app.get("/tweet/:id", tweetController.buscarTweetId);
app.delete("/tweet/:id", tweetController.deletarTweets);

// PARA AUTENTICAÇÃO

app.post("/login", authController.login);





app.listen(3333, () => {
    console.log("Servidor rodando na porta 3000 - http://localhost:3333");
});