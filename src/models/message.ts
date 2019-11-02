import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Messages {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public type: string;

  @Column()
  public content: string;

  @Column()
  public warningOn: string;

  @Column()
  public createOn: string;

  @Column()
  public createDateOn: string;

  @Column()
  public disable: boolean;

}
