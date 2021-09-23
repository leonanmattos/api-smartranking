import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDTO } from './dto/create-player.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuidv4 } from 'uuid';
import { PlayerDocument } from 'src/schemas/player.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('Player') private playerModel: Model<PlayerDocument>,
  ) {}

  private readonly logger = new Logger(PlayersService.name);
  private players: Player[] = [];

  async createUpdatePlayer(createPlayerDTO: CreatePlayerDTO) {
    this.logger.log(`CreatePlayerDTO:`, createPlayerDTO);
    const { email } = createPlayerDTO;
    // const playerFound = this.players.find((player) => player.email === email);
    const playerFound = await this.playerModel.findOne({ email }).exec();

    if (playerFound) {
      return this.update(createPlayerDTO);
    } else {
      return this.create(createPlayerDTO);
    }
  }

  private create(createPlayerDTO: CreatePlayerDTO) {
    const playerCreated = new this.playerModel(createPlayerDTO);
    return playerCreated.save();

    // const { name, phoneNumber, email } = createPlayerDTO;

    // const player: Player = {
    //   _id: uuidv4(),
    //   name,
    //   phoneNumber,
    //   email,
    //   ranking: 'A',
    //   position: 1,
    //   urlPhoto: 'https://google.com.br/foto123.jpg',
    // };

    // this.players.push(player);
    // this.logger.log(`Player:`, player);
    // return player;
  }

  private update(createPlayerDTO: CreatePlayerDTO) {
    return this.playerModel.findOneAndUpdate(
      { email: createPlayerDTO.email },
      { $set: createPlayerDTO },
      { new: true },
    );
    // const { name } = createPlayerDTO;

    // player.name = name;

    // return player;
  }

  findAll() {
    return this.playerModel.find();
  }

  findByEmail(email: string) {
    return this.playerModel.findOne({ email });
    // const playerFound = this.players.find((player) => player.email === email);
    // if (!playerFound) {
    //   throw new NotFoundException(`Player not found with email ${email}`);
    // }
    // return playerFound;
  }

  deletePlayer(email: string) {
    this.playerModel.deleteOne({ email }).exec();
    // const playerFound = this.players.find((player) => player.email === email);
    // if (!playerFound) {
    //   throw new NotFoundException(`Player not found with email ${email}`);
    // }

    // this.players = this.players.filter((player) => player.email !== email);
  }
}
