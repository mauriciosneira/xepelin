import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";

@Injectable()
export class EventStorageRepository {

  private readonly logger = new Logger('EventStorageRespository');

  constructor(private prisma: PrismaService) { }

  async create(payload: any, eventName: string): Promise<void> {

    try {
      await this.prisma.eventStore.create({
        data: {
          payload: payload,
          name: eventName
        }
      })
    } catch (error) {
      this.logger.error(error);
      this.logger.error(
        `There was an error connecting to evenStorage`,
      );
    }
  }
}