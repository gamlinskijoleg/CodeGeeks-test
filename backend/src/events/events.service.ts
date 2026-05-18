import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    return this.prisma.event.create({
      data: {
        title: createEventDto.title,
        description: createEventDto.description,
        date: new Date(createEventDto.date),
        location: createEventDto.location,
        latitude: createEventDto.latitude,
        longitude: createEventDto.longitude,
        category: createEventDto.category,
      },
    });
  }

  async findAll(): Promise<Event[]> {
    return this.prisma.event.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string): Promise<Event> {
    const event = await this.prisma.event.findUnique({
      where: { id },
    });
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return event;
  }

  async update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
    const event = await this.findOne(id);
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    return this.prisma.event.update({
      where: { id },
      data: {
        ...(updateEventDto.title && { title: updateEventDto.title }),
        ...(updateEventDto.description && {
          description: updateEventDto.description,
        }),
        ...(updateEventDto.date && { date: new Date(updateEventDto.date) }),
        ...(updateEventDto.location && { location: updateEventDto.location }),
        ...(updateEventDto.latitude !== undefined && {
          latitude: updateEventDto.latitude,
        }),
        ...(updateEventDto.longitude !== undefined && {
          longitude: updateEventDto.longitude,
        }),
        ...(updateEventDto.category && { category: updateEventDto.category }),
      },
    });
  }

  async remove(id: string): Promise<Event> {
    await this.findOne(id);
    return this.prisma.event.delete({
      where: { id },
    });
  }

  async recommendations(id: string): Promise<Event[]> {
    const baseEvent = await this.findOne(id);
    const allEvents = await this.prisma.event.findMany({
      where: { id: { not: id } },
    });

    const scored = allEvents.map((event) => {
      let score = 0;

      // Same category: +5 points
      // Same location name: +3 points
      if (event.category === baseEvent.category) {
        score += 5;
      }

      if (event.location === baseEvent.location) {
        score += 3;
      }

      return { event, score };
    });

    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(({ event }) => event);
  }
}
