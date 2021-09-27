import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategorysService } from './categorys.service';
import { CreateCategoryDTO } from './dto/create-category.dto';

@Controller('api/v1/categorys')
export class CategorysController {
    constructor(private readonly categoryService: CategorysService) {}

    @Post()
    @UsePipes(ValidationPipe)
    createCategory(@Body() createCategoryDTO: CreateCategoryDTO) {
        return this.categoryService.create(createCategoryDTO);
    }

    findAll() {
        return this.categoryService.findAll();
    }
    
}
