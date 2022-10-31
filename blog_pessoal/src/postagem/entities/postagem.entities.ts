import { IsNotEmpty } from "class-validator";
import { Tema } from "../../tema/entities/tema.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name:'tb_postagens'})
export class Postagem {

    @ApiProperty()
    @PrimaryGeneratedColumn() //coluna chave primaria e autoincremento 
    id: number;

    @ApiProperty()
    @IsNotEmpty() //nao deixar mandar nulo 
    @Column({length: 100, nullable:false}) //100 caracteres e obrigatorio
    titulo: string;

    @ApiProperty()
    @IsNotEmpty() //nao deixar mandar nulo 
    @Column({length: 1000, nullable:false}) //1000 caracteres e obrigatorio
    texto: string;

    @ApiProperty()
    @UpdateDateColumn() // salvar ou editar uma postagem, vai salvar a data q aconteceu
    data: Date;

    @ApiProperty({ type: () => Tema })  
    @ManyToOne(() => Tema, (tema) => tema.postagem, {
        onDelete: "CASCADE"
    })
    tema: Tema;

    @ApiProperty({ type: () => Usuario })  
    @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
        onDelete:"CASCADE"
    })
    usuario: Usuario;
}