import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Messages {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public category: string;

  @Column()
  public type: string;

  @Column()
  public content: string;

  @Column()
  public createOn: string;

}
