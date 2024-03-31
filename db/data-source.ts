import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions : DataSourceOptions={
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'dbtest',
    entities: ["dist/**/*.entity{.ts,.js}"],
    migrations: ["dist/db/migrations/*{.ts,.js}"],    
}


const dataSource = new DataSource(dataSourceOptions)

export default dataSource