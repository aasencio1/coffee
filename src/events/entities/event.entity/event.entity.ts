import { Column, Entity, PrimaryColumn } from "typeorm";


@Entity()

export class Event{
  @PrimaryColumn()
  id: number;

  @Column()
  type: string;
  
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
