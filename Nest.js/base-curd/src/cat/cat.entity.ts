import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('cat')
export class Cat {

    // 主键
    @PrimaryGeneratedColumn({
        comment: '自增id'
    })
    id: number;

    // 昵称
    @Column({
        comment: '昵称'
    })
    nickName: string;

    // 品种
    @Column({
        comment: '品种'
    })
    species: string;
}
