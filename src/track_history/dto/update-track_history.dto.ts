import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackHistoryDto } from './create-track_history.dto';

export class UpdateTrackHistoryDto extends PartialType(CreateTrackHistoryDto) {}
