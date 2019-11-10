import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm'

@Entity()
export class Reminder {
  @PrimaryColumn()
  public id: string;

  @Column()
  public warningOn: string ;

  @Column()
  public warningtype: string ;

  @Column()
  public createOn: string ;
}
