import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Item {
  @PrimaryColumn()
  id: number

  @Column()
  name: string

  @Column()
  description: string

  @Column({type: 'int', nullable: true})
  purchaseLimit: number | null

  @Column({type:'int', nullable: true})
  lowAlchemy: number | null

  @Column({type:'int', nullable: true})
  highAlchemy: number | null

  @Column({type:'int', nullable: true})
  shopPrice: number | null

  @Column()
  members: boolean
}