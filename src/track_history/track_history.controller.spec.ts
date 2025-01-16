import { Test, TestingModule } from '@nestjs/testing';
import { TrackHistoryController } from './track_history.controller';
import { TrackHistoryService } from './track_history.service';

describe('TrackHistoryController', () => {
  let controller: TrackHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrackHistoryController],
      providers: [TrackHistoryService],
    }).compile();

    controller = module.get<TrackHistoryController>(TrackHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
