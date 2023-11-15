import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Price {
  @PrimaryColumn({type: 'int'})
  timestamp: number;
  @PrimaryColumn({type: 'int'})
  itemId: number
  @Column({type: 'int', nullable: true})
  highPrice: number | null
  @Column({type: 'int', nullable: true})
  lowPrice: number | null
  @Column({type: 'int', nullable: true})
  highVolume: number | null
  @Column({type: 'int', nullable: true})
  lowVolume: number | null
}