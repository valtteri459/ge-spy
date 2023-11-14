import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private usersRepository: Repository<Item>,
  ) {}

  findAll(): Promise<Item[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<Item | null> {
    return this.usersRepository.findOneBy({ id });
  }

  save(item: Item): Promise<Item> {
    return this.usersRepository.save(item)
  }

  saveMany(items: Item[]): Promise<Item[]> {
    return this.usersRepository.save(items)
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}