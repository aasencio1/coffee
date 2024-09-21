import { Column, Entity, Index, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { IndexMetadata } from "typeorm/metadata/IndexMetadata";

@Index(['name','type'])  //Indice compuesto 
                        //@Index(['name', 'type'], { unique: true }) - Este índice es único
@Entity()

export class Event{
  @PrimaryGeneratedColumn()  
  @PrimaryColumn()
  id: number;

  @Column()
  type: string;
  
  @Index()
  @Column()
  name: string;

  @Column('json')
  payload: Record<string, any>;   // Es un objeto con clave de tipo String y valor de cualquier tipo   // Usado para cargas dinamicas en Pyload de Apis
                                  // Record es un tipo Generico  
                                  /*type Person = Record<string, string>;
                                    const person: Person = {
                                                              name: "John",
                                                              city: "New York"
                                                            };*/ 
}
