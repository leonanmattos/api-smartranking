import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePlayerDTO } from './dto/create-player.dto';
import { UpdatePlayerDTO } from './dto/update-player.dto';
import { PlayersParamValidationPipe } from './pipes/players-param-validation.pipe';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createPlayerDTO: CreatePlayerDTO) {
    return this.playersService.createPlayer(createPlayerDTO);
  }

  @Patch('/:_id')
  @UsePipes(ValidationPipe)
  update(
    @Param('_id', PlayersParamValidationPipe) _id: string,
    @Body() UpdatePlayerDTO: UpdatePlayerDTO) {
    return this.playersService.updatePlayer(_id, UpdatePlayerDTO);
  }

  @Get()
  findAll() {
    return this.playersService.findAll();
  }

  @Get('/:_id')
  findById(@Param('_id', PlayersParamValidationPipe) _id: string) {
    return this.playersService.findById(_id);
  }

  @Delete('/:_id')
  deletePlayer(@Param('_id', PlayersParamValidationPipe) email: string) {
    this.playersService.deletePlayer(email);
  }
}
