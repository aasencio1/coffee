import { HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
//import { request } from "http";
import { CoffeesModule } from "src/coffees/coffees.module";
import { CreateCoffeeDto } from "src/coffees/dto/create-coffee.dto/create-coffee.dto";
import { UpdateCoffeeDto } from "src/coffees/dto/update-coffee.dto/update-coffee.dto";
import * as request from 'supertest';
import * as dotenv from 'dotenv';
//import jasmine = require("jasmine");

// Cargar variables de entorno de pruebas
dotenv.config({ path: '.env.test' });

describe ('[Feature] Coffees - /coffees', () =>{
  const coffee = {
    name : 'Shipwreck Roast',
    brand : 'Buddy Brew',
    flavors: ['chocolate', 'vanilla'],
  };

  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [
          CoffeesModule,
          TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DATABASE_HOST,
            port: +process.env.DATABASE_PORT,
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            autoLoadEntities: true,
            synchronize: true,
          })
        ],
    }) .compile();

    app = moduleFixture.createNestApplication();
    // copying the same since main.ts
    app.useGlobalPipes(
      new ValidationPipe({    // we can not inject any dependency here. 
          whitelist: true,    //power of DTO and validation's pipe  , avoid passing invalid properties
          transform: true,   // Whe is enble, transfor to the instance that we are especting
          forbidNonWhitelisted: true,  //Whiltelist is relate with all the feature previously listed and defined in the DTO. 
          transformOptions:{
          enableImplicitConversion: true 
        },
      }),
    );
    await app.init();

  });

  //it.todo('Create [POST /]');
  
 /*
 Codigo Implementado por Jamil
 */
 it('Create [Post /]', () => {
    console.log('Running POST test');
    return request(app.getHttpServer())
      .post('/coffees')
      .send(coffee as CreateCoffeeDto)   // se usa en post / put / patch
      .expect(HttpStatus.CREATED)
      .then(({ body }) => {
        const expectedCoffee = {
          ...coffee,
          flavors: expect.arrayContaining(
            coffee.flavors.map((name) => expect.objectContaining({ name })),
          ),
        };
        expect(body).toEqual(expect.objectContaining(expectedCoffee));
      });
  });
  
  /*
  Este codigo usa el Post de forma Asincrona, sin embargo espera por la respuesta del POST para poder ejecutar el GET
  No es necesario debido a que la ejecucion en JEST es sincrona
  it('Create [Post /]', async () => {
    console.log('Running POST test');
    const response = await request(app.getHttpServer())
      .post('/coffees')
      .send(coffee as CreateCoffeeDto)
      .expect(HttpStatus.CREATED);
  
    const expectedCoffee = {
      ...coffee,
      flavors: expect.arrayContaining(
        coffee.flavors.map((name) => expect.objectContaining({ name })),
      ),
    };
    expect(response.body).toEqual(expect.objectContaining(expectedCoffee));
  
    // Verifica explícitamente que el dato existe en la base de datos
    const dbCoffees = await request(app.getHttpServer()).get('/coffees');
    expect(dbCoffees.body.length).toBeGreaterThanOrEqual(1);
  });
  */
  it('Get all with limit and offset [GET /]', () => {
    console.log('Running GET ALL test');
  
    return request(app.getHttpServer())
      .get('/coffees')
      .query({ limit: 1, offset: 0 })
      .expect(HttpStatus.OK)
      .then((response) => {
        const coffees = response.body;
  
        // Validar que la respuesta esté definida y sea un array
        expect(coffees).toBeDefined();
        expect(Array.isArray(coffees)).toBe(true);
  
        // Validar que devuelva al menos un café
        expect(coffees.length).toBeGreaterThanOrEqual(1);
  
        // Validar las propiedades de los objetos en el array
        coffees.forEach((coffee) => {
          expect(coffee).toHaveProperty('id');
          expect(coffee).toHaveProperty('name');
          expect(coffee).toHaveProperty('description');
          expect(coffee).toHaveProperty('brand');
          expect(coffee).toHaveProperty('recommendations');
          expect(coffee).toHaveProperty('flavors');
  
          // Validar que 'flavors' sea un array y tenga las propiedades esperadas
          expect(Array.isArray(coffee.flavors)).toBe(true);
          coffee.flavors.forEach((flavor) => {
            expect(flavor).toHaveProperty('id');
            expect(flavor).toHaveProperty('name');
          });
        });
      });
  });
  
  /*
  Cpdigo usando programacion concurrente
  it('Get all with limit and offset [GET /]', async () => {
    console.log('Running GET ALL test');
  
    // Espera explícitamente a que el POST haya creado datos
    await new Promise((resolve) => setTimeout(resolve, 100)); // Espera breve para sincronización, si es necesario
  
    const response = await request(app.getHttpServer())
      .get('/coffees')
      .query({ limit: 1, offset: 0 })
      .expect(HttpStatus.OK);
  
    const coffees = response.body;
  
    // Validar que la respuesta esté definida y sea un array
    expect(coffees).toBeDefined();
    expect(Array.isArray(coffees)).toBe(true);
  
    // Validar que devuelva al menos un café
    expect(coffees.length).toBeGreaterThanOrEqual(1);
  
    // Validar las propiedades de los objetos en el array
    coffees.forEach((coffee) => {
      expect(coffee).toHaveProperty('id');
      expect(coffee).toHaveProperty('name');
      expect(coffee).toHaveProperty('description');
      expect(coffee).toHaveProperty('brand');
      expect(coffee).toHaveProperty('recommendations');
      expect(coffee).toHaveProperty('flavors');
  
      // Validar que 'flavors' sea un array y tenga las propiedades esperadas
      expect(Array.isArray(coffee.flavors)).toBe(true);
      coffee.flavors.forEach((flavor) => {
        expect(flavor).toHaveProperty('id');
        expect(flavor).toHaveProperty('name');
      });
    });
  });
  */

  //it.todo('Get one [GET /:id]');
  it ('Get one [GET /:id]', ()=>{
    console.log('Running GET test');
    return request(app.getHttpServer())
    .get('/coffees/1') // Endpoint que estás probando
    .expect(HttpStatus.OK) // Verifica el código de estado
    .then ((response)=> {
       const coffee = response.body;
       expect(coffee).toBeDefined();
       expect(coffee).toHaveProperty('id',1);
       expect(coffee).toHaveProperty('name');
       expect(coffee).toHaveProperty('description');
       expect(coffee).toHaveProperty('brand');
       expect(coffee).toHaveProperty('recommendations');
       expect(coffee).toHaveProperty('flavors');
       expect(Array.isArray(coffee.flavors)).toBe(true);
       coffee.flavors.forEach((flavor) => {
        expect(flavor).toHaveProperty('id'); // Cada flavor debe tener un ID
        expect(flavor).toHaveProperty('name'); // Cada flavor debe tener un nombre
      });
    });
  });
  
   //it.todo('Update one [PATCH /:id]');
   //actualizar luego la prueba actualizand
   it('Update one [PATCH /:id]', () => {
    // Definir los datos de actualización
    const coffeeUpdate = {
      name: 'Capuchino',
      brand: 'Cafe Venezolano',
      flavors: ['Chocolate Puro', 'Mantecado'],
    };
  
    // Realizar la solicitud PATCH
    return request(app.getHttpServer())
      .patch('/coffees/1') // Cambiado a PATCH
      .send(coffeeUpdate as UpdateCoffeeDto) // Enviar los datos de actualización
      .expect(HttpStatus.OK) // PATCH típicamente responde con 200 (OK)
      .then(({ body }) => {
        // Validar que la respuesta sea la esperada
        expect(body).toBeDefined();
        expect(body).toHaveProperty('id', 1);
        expect(body).toHaveProperty('name', coffeeUpdate.name);
        expect(body).toHaveProperty('brand', coffeeUpdate.brand);
        expect(body.flavors).toEqual(
          expect.arrayContaining(
            coffeeUpdate.flavors.map((name) => expect.objectContaining({ name })),
          ),
        );
      });
  });
  

  //it.todo('Delete one [DELETE /:id]');
  it('Delete one [DELETE /:id]', () => {
    return request(app.getHttpServer())
      .delete('/coffees/1') // Cambiando a DELETE
      .expect(HttpStatus.OK) // Verifica el código de estado
      .then((response) => {
        // Validar que la respuesta tenga un cuerpo definido, si lo tiene
        expect(response.body).toBeDefined();
  
        // Verificar que el recurso ya no exista
        return request(app.getHttpServer())
          .get('/coffees/1') // Intentar obtener el recurso eliminado
          .expect(HttpStatus.NOT_FOUND); // El recurso debe responder con 404
      });
  });
   
  afterAll (async ()=> {
    await app.close();
   });
});
