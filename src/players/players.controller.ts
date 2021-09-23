import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CreatePlayerDTO } from './dto/create-player.dto';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  criarAtualizarJogador(@Body() createPlayerDTO: CreatePlayerDTO) {
    return this.playersService.createUpdatePlayer(createPlayerDTO);
  }

  @Get()
  findAll(@Query('email') email: string) {
    if (email) {
      return this.playersService.findByEmail(email);
    } else {
      return this.playersService.findAll();
    }
  }

  @Delete()
  deletePlayer(@Query('email') email: string) {
    this.playersService.deletePlayer(email);
  }
}
