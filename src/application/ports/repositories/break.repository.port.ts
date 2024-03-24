import { BreakDto } from "src/application/ports/dtos/break.dto";
import { EndBreakDto } from "src/application/ports/dtos/end-break.dto";
import { StartBreakDto } from "src/application/ports/dtos/start-break.dto";

export interface IBreakRepositoryPort {
  findById(id: number): Promise<BreakDto>;
  startBreak(data: StartBreakDto): Promise<BreakDto>;
  endBreak(data: EndBreakDto): Promise<BreakDto>;
  getBreak(userId: number, date: Date): Promise<BreakDto>;
}
