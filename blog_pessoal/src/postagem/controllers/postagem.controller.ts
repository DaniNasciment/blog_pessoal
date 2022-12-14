import { Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe } from "@nestjs/common";
import { Body, Delete, Post, Put, UseGuards } from "@nestjs/common/decorators";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { LocalAuthGuard } from "../../auth/guard/local-auth.guard";
import { Postagem } from "../entities/postagem.entities";
import { PostagemService } from "../services/postagem.service";

@ApiTags('Postagem')
@UseGuards(LocalAuthGuard)
@Controller('/postagens')
@ApiBearerAuth()
export class PostagemController {
    constructor (private readonly postagemService: PostagemService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Postagem[]> {
        return this.postagemService.findAll();
    }

    @Get('/:id')


    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe)
        id: number
        ): Promise <Postagem>{
            return this.postagemService.findById(id);
        }

    @Get('/:titulo/:titulo')
    @HttpCode(HttpStatus.OK)
    findByTitulo(
        @Param('titulo')
        titulo: string
    ): Promise<Postagem[]> {
        return this.postagemService.findByTitulo(titulo);
        
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(
        @Body()
        postagem: Postagem
    ): Promise<Postagem> {
        return this.postagemService.create(postagem);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update (
        @Body()
        postagem: Postagem
    ): Promise<Postagem> {
        return this.postagemService.update(postagem);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete (
        @Param('id', ParseIntPipe)
        id: number
    ) {
        return this.postagemService.delete(id);
    }
}
