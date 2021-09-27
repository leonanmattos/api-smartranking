import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlayerDTO } from './dto/create-player.dto';
import { Player } from './interfaces/player.interface';
import { PlayerDocument } from 'src/schemas/player.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdatePlayerDTO } from './dto/update-player.dto';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('Player') private playerModel: Model<PlayerDocument>,
  ) {}

  private readonly logger = new Logger(PlayersService.name);
  private players: Player[] = [];

  async createPlayer(createPlayerDTO: CreatePlayerDTO) {
    this.logger.log(`CreatePlayerDTO`, createPlayerDTO);
    const { email } = createPlayerDTO;
    const playerFound = await this.playerModel.findOne({ email }).exec();

    if (playerFound) {
      return new BadRequestException(`Player with ${email} already exist`);
    }

    const playerCreated = new this.playerModel(createPlayerDTO);
    return playerCreated.save();
  }

  async updatePlayer(_id: string, updatePlayerDTO: UpdatePlayerDTO) {
    this.logger.log(`UpdatePlayerDTO`, updatePlayerDTO);
    const playerFound = await this.playerModel.findOne({ _id }).exec();

    if (!playerFound) {
      return new NotFoundException(`Player with ${_id} not found`);
    }
    return this.playerModel.findOneAndUpdate(
      { _id: _id },
      { $set: updatePlayerDTO },
      { new: true },
    );
  }

  findAll() {
    return this.playerModel.find();
  }

  findByEmail(email: string) {
    return this.playerModel.findOne({ email });
  }

  findById(_id: string) {
    const playerFound = this.playerModel.findById(_id);

    if (!playerFound) {
      return new NotFoundException(`Player not found`);
    }

    return playerFound;
  }

  deletePlayer(_id: string) {
    const playerFound = this.playerModel.findById(_id);

    if (!playerFound) {
      return new NotFoundException(`Player not found`);
    }
    this.playerModel.deleteOne({ _id }).exec();
  }
}
