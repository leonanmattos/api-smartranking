import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorysModule } from './categorys/categorys.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://leonan:leonan@cluster0.wi0qe.mongodb.net/test',
    ),
    PlayersModule,
    CategorysModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
