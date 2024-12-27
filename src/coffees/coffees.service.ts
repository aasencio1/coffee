import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Connection, Model } from 'mongoose';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectModel(Coffee.name) private readonly coffeeModel: Model <Coffee>,
    //Se agrega los decordadores para la gestion de la transaccion
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
     const { limit, offset} = paginationQuery;
    return this.coffeeModel.find().skip(offset).limit(limit).exec();
  }

  async findOne(id: string) {
    const coffee = await this.coffeeModel.findOne({ _id: id }).exec();
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  create(createCoffeeDto: CreateCoffeeDto) {
    const coffee = new this.coffeeModel(createCoffeeDto);
    return coffee.save();
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const existingCoffee = await this.coffeeModel
      .findOneAndUpdate({ _id: id }, { $set: updateCoffeeDto }, { new: true })
      .exec();

    if (!existingCoffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return existingCoffee;
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);
    return this.coffeeModel.deleteOne({ _id: coffee._id }).exec();
  }
  
  // Metodo para implementar el uso de transaccion en MongoDB
  async recommendCoffee(coffee: Coffee){
    const session = await this.connection.startSession();
    session.startTransaction();
    try{
      coffee.recommendations ++;
      await session.commitTransaction();

    } catch (err){
      await session.abortTransaction();
    } finally {
      session.endSession();
    }
  }
}