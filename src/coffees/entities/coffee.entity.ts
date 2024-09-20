import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()  // sql table by default gets ths same name of the entity class  , un nombre diferente, inside @Entity decorator (ej. @Entity('Test'))

export class Coffee 
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    brand: string;

    @Column('json', {  nullable: true} )  // due is an array
    flavors: string[];
}