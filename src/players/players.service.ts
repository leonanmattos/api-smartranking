import { Injectable, Logger } from '@nestjs/common';
import { CreatePlayerDTO } from './dto/create-player.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PlayersService {
  private readonly logger = new Logger(PlayersService.name);
  private players: Player[] = [];

  createUpdatePlayer(createPlayerDTO: CreatePlayerDTO) {
    this.logger.log(`CreatePlayerDTO:`, createPlayerDTO);
    const { email } = createPlayerDTO;
    const playerFound = this.players.find((player) => player.email === email);
    if (playerFound) {
      return this.update(createPlayerDTO, playerFound);
    } else {
      return this.create(createPlayerDTO);
    }
  }

  private create(createPlayerDTO: CreatePlayerDTO) {
    const { name, phoneNumber, email } = createPlayerDTO;

    const player: Player = {
      _id: uuidv4(),
      name,
      phoneNumber,
      email,
      ranking: 'A',
      position: 1,
      urlPhoto: 'https://google.com.br/foto123.jpg',
    };

    this.players.push(player);
    this.logger.log(`Player:`, player);
    return player;
  }

  private update(createPlayerDTO: CreatePlayerDTO, player: Player) {
    const { name } = createPlayerDTO;

    player.name = name;

    return player;
  }

  findAll() {
    return this.players;
  }
}
