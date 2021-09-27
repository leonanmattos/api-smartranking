import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryDocument } from 'src/schemas/cagegory.schema';
import { CreateCategoryDTO } from './dto/create-category.dto';

@Injectable()
export class CategorysService {
    constructor(
    @InjectModel('Category') private categoryModel: Model<CategoryDocument>,
    ) {}

    private readonly logger = new Logger(CategorysService.name);

    async create(createCategoryDTO: CreateCategoryDTO) {
        this.logger.log(`CreateCategoryDTO`, createCategoryDTO);
        const { category } = createCategoryDTO;
        const categoryFound = await this.categoryModel.findOne({ category }).exec();

        if (categoryFound) {
        return new BadRequestException(`Player with ${category} already exist`);
        }

        const categoryCreated = new this.categoryModel(createCategoryDTO);
        return categoryCreated.save();
    }

}
