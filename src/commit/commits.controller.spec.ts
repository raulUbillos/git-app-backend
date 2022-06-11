import { Test, TestingModule } from '@nestjs/testing';
import { CommitsController } from './commits.controller';
import { CommitsService } from './commits.service';
import { ICommitResponse } from './models/ICommitResponse';

describe('CommitsController', () => {
  let commitController: CommitsController;
  let commitService: CommitsService;
  beforeEach(async () => {
    const mockedModule: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CommitsService,
          useValue: {
            commitHistory: jest.fn(() => []),
            commit: jest.fn(),
            commitByDateRange: jest.fn(),
          },
        },
      ],
      controllers: [CommitsController],
    }).compile();
    commitService = mockedModule.get<CommitsService>(CommitsService);
    commitController = mockedModule.get<CommitsController>(CommitsController);
  });

  describe('commitHistory', () => {
    it('it should return an array of commit responses', async () => {
      const MOCKED_LIST: ICommitResponse[] = [
        {
          author: {
            date: '2022-06-08T12:50:39Z',
            email: '69400901+raulUbillos@users.noreply.github.com',
            name: 'raulUbillos',
          },
          commiter: {
            date: '2022-06-08T12:50:39Z',
            email: 'noreply@github.com',
            name: 'GitHub',
          },
          code: '3ee689ad898686a0fa76ace5ecb7b5d10effe117',
          message:
            'Dotenv (#2)\n\n* Added environment variables and httpmodule\r\n\r\n* Removed unsused console.log',
        },
      ];

      jest
        .spyOn(commitService, 'commitHistory')
        .mockReturnValue(new Promise((resolve) => resolve(MOCKED_LIST)));

      const commits = await commitController.commitHistory(
        'test',
        'test',
        'test',
      );

      expect(commits).toEqual(MOCKED_LIST);
    });
  });
});
