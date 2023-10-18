import { SchemaSync1697657078459 } from 'src/migrations/1697657078459-SchemaSync';
import { Flavor } from 'src/scent/entities/flavor.entity.ts';
import { Scent } from 'src/scent/entities/scent.entity';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  entities: [Scent, Flavor],
  migrations: [SchemaSync1697657078459],
});
