import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from 'src/schemas/cagegory.schema';
import { CategorysController } from './categorys.controller';
import { CategorysService } from './categorys.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]),
  ],
  controllers: [CategorysController],
  providers: [CategorysService]
})
export class CategorysModule {}
