import { Inject, Injectable } from '@nestjs/common';
import { EndBreakDto } from 'src/application/ports/dtos/end-break.dto';
import { StartBreakDto } from 'src/application/ports/dtos/start-break.dto';
import { IBreakRepositoryPort } from 'src/application/ports/repositories/break.repository.port';

@Injectable()
export class BreakService {
  constructor(
    @Inject('IBreakRepositoryPort')
    private readonly breakRepository: IBreakRepositoryPort,
  ) {}

  async startBreak(data: StartBreakDto) {
    return this.breakRepository.startBreak(data);
  }

  async endBreak(data: EndBreakDto) {
    return this.breakRepository.endBreak(data);
  }

  async getBreak(id: number, date: Date) {
    return this.breakRepository.getBreak(id, date);
  }
}
