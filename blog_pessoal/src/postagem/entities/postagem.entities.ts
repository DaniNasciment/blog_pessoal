import { IsNotEmpty } from "class-validator";
import { Tema } from "src/tema/entities/tema.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name:'tb_postagens'})
export class Postagem {

    @PrimaryGeneratedColumn() //coluna chave primaria e autoincremento 
    id: number;

    @IsNotEmpty() //nao deixar mandar nulo 
    @Column({length: 100, nullable:false}) //100 caracteres e obrigatorio
    titulo: string;

    @IsNotEmpty() //nao deixar mandar nulo 
    @Column({length: 1000, nullable:false}) //1000 caracteres e obrigatorio
    texto: string;

    @UpdateDateColumn() // salvar ou editar uma postagem, vai salvar a data q aconteceu
    data: Date;

    @ManyToOne(() => Tema, (tema) => tema.postagem, {
        onDelete: "CASCADE"
    })
    tema: Tema;
}