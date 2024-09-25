import { Coffee } from "src/coffees/entities/coffee.entity";
import { Flavor } from "src/coffees/entities/flavor.entity/flavor";
import { CoffeeRefactor1726950534245 } from "src/migrations/1726950534245-CoffeeRefactor";
import { SchemaSync1726954061050 } from "src/migrations/1726954061050-SchemaSync";
import { DataSource } from "typeorm";

export default new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'pass123',
    database: 'postgres',
    entities: [Coffee , Flavor],
});

