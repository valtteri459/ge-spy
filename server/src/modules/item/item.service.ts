import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Raw, Repository } from 'typeorm';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private usersRepository: Repository<Item>,
  ) {}

  async findAll(): Promise<Item[]> {
    return await this.usersRepository.find({});
  }

  asyncfindOne(id: number): Promise<Item | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async save(item: Item): Promise<Item> {
    return this.usersRepository.save(item)
  }

  async saveMany(items: Item[]): Promise<Item[]> {
    return this.usersRepository.save(items)
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}