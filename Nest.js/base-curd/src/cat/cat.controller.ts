import { Controller, Post, Delete, Body, Param, Put, Get } from '@nestjs/common';
import { Cat } from './cat.entity';
import { Result } from '../interface/result.interface';
import { CatService } from './cat.service';

@Controller('cat')
export class CatController {
    constructor(
        private readonly catService: CatService,
    ) {}

    @Post()
    async createCat(@Body() cat: Cat): Promise<Result> {
        await this.catService.createCat(cat);
        return { code: 200, message: '创建成功' };
    }

    @Delete(':id') 
    async deleteCat(@Param('id') id: number): Promise<Result> {
        await this.catService. deleteCat(id);
        return { code: 200, message: '删除成功' };
    }

    @Put(':id')
    async updateCat(@Param('id') id: number, @Body() cat: Cat): Promise<Result> {
        await this.catService.updateCat(id, cat);
        return { code: 200, message: '更新成功' };
    }

    @Get(':id') 
    async findOneCat(@Param('id') id: number): Promise<Result> {
        const data = await this.catService.findOneCat(id);
        return { code: 200, message: '查询成功', data};
    }
}