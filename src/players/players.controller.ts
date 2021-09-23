import { Body, Controller, Get, Post } from '@nestjs/common';
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
  findAll() {
    return this.playersService.findAll();
  }

  @Get()
  findByEmail() {
    return this.playersService.findAll();
  }
}
