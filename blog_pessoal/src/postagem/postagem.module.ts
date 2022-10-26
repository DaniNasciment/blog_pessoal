import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TemaController } from "./../tema/controllers/tema.controller";
import { TemaService } from "./../tema/services/tema.service";
import { TemaModule } from "../tema/tema.module";
import { PostagemController } from "./controllers/postagem.controller";
import { Postagem } from "./entities/postagem.entities";
import { PostagemService } from "./services/postagem.service";

@Module({
    imports: [TypeOrmModule.forFeature([Postagem]), TemaModule],
    providers: [PostagemService, TemaService],
    controllers: [PostagemController, TemaController],
    exports:[TypeOrmModule],
})

export class PostagemModule{}