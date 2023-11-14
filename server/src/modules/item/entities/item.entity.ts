import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Item {
  @PrimaryColumn()
  id: number;
  @Column()
  icon: string
  @Column()
  icon_large: string
  @Column()
  type: string
  @Column()
  typeIcon: string
  @Column()
  name: string
  @Column()
  description: string
  @Column()
  members: boolean
}