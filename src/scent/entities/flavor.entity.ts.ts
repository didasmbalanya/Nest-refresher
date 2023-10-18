import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Scent } from './scent.entity';

@Entity()
export class Flavor {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Scent, (scent) => scent.flavors)
  scents: Scent[];
}
