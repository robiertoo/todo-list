import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
    id: number

  @Column('text')
    description: string

  @CreateDateColumn()
    created_at: Date

  @UpdateDateColumn()
    updated_at: Date

  @DeleteDateColumn()
    deleted_at: Date

  @Column({
    type: 'datetime',
    default: null,
    nullable: true
  })
    completed_at: Date
}
