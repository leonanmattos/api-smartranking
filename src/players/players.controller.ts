import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePlayerDTO } from './dto/create-player.dto';
import { PlayersParamValidationPipe } from './pipes/players-param-validation.pipe';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  criarAtualizarJogador(@Body() createPlayerDTO: CreatePlayerDTO) {
    return this.playersService.createUpdatePlayer(createPlayerDTO);
  }

  @Get()
  findAll(@Query('email', PlayersParamValidationPipe) email: string) {
    if (email) {
      return this.playersService.findByEmail(email);
    } else {
      return this.playersService.findAll();
    }
  }

  @Delete()
  deletePlayer(@Query('email', PlayersParamValidationPipe) email: string) {
    this.playersService.deletePlayer(email);
  }
}
