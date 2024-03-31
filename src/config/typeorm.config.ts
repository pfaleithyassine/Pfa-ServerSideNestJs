import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const configOrm: TypeOrmModuleOptions={
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'dbtest',
    entities: ["dist/**/*.entity{.ts,.js}"],
    
    synchronize: true,
    autoLoadEntities: true
}