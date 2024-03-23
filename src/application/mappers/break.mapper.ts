import { Break } from '@prisma/client';

export class BreakMapper {
  static toResponse(data: Break) {
    return {
      id: data.id,
      startTime: data.startTime,
      endTime: data.endTime,
    };
  }
}
