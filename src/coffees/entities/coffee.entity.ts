import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Flavor } from "./flavor.entity/flavor";

@Entity()  // sql table by default gets ths same name of the entity class  , un nombre diferente, inside @Entity decorator (ej. @Entity('Test'))

export class Coffee 
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;   //after titlebefore called name, al modificar el nombre se elimina toda la data existente previamente en la DB. ie elimina la columna y agrega una nueva.

    @Column({ nullable: true})
    description: string;  

    @Column()
    brand: string;

    @Column({default: 0})
    recommendations: number;


    //@Column('json', {  nullable: true} )  // due is an array
    @JoinTable()    // define the owner side of the relationship
    @ManyToMany(
        type => Flavor,
        (flavor)=> flavor.coffees,
        {
            cascade: true,  //['insert o9r update as well'] for us
        },
    )

    flavors: Flavor[];  // antes string[];
}