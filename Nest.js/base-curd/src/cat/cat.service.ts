import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpException } from '@nestjs/common';
import { Cat } from './cat.entity';
import { Repository } from 'typeorm';
// import { HttpExecption } from '../interceptor/error.interceptor';

@Injectable()
export class CatService {
    constructor (
        @InjectRepository(Cat) private readonly catRepo: Repository<Cat>    // 注入数据库实例
    ) {}
    
    // 创建 Cat
    async createCat(cat: Cat): Promise<Cat> {
        return this.catRepo.save(this.catRepo.create(cat));
    }

    // 删除
    async deleteCat(id: number): Promise<void> {
        this.catRepo.delete(id);
    }

    // 更新
    async updateCat(id: number, cat: Cat): Promise<void> {
        const existCat = await this.findOneById(id);
        existCat.nickName = cat && cat.nickName ? cat.nickName : existCat.nickName;
        existCat.species = cat && cat.species ? cat.species : existCat.species;

        this.catRepo.save(existCat);
    }

    // 获取
    async findOneCat(id: number): Promise<Cat> {
        return this.findOneById(id);
    }

    private async findOneById(id: number): Promise<Cat> {
        const catInfo = await this.catRepo.findOne(id);
        if(!catInfo) {
            throw new HttpException(`要查找的id=${id}的猫不存在`, 404);
        }

        return catInfo;
    }
}