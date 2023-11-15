import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Item {
  @PrimaryColumn()
  id: number;
  @Column()
  type: string
  @Column()
  name: string
  @Column()
  description: string
  @Column()
  members: boolean
}