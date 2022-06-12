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
            commit: jest.fn(() => {
              return {};
            }),
          },
        },
      ],
      controllers: [CommitsController],
    }).compile();
    commitService = mockedModule.get<CommitsService>(CommitsService);
    commitController = mockedModule.get<CommitsController>(CommitsController);
  });

  describe('commitHistory', () => {
    it('it should return all the commit history', async () => {
      const MOCKED_LIST: ICommitResponse[] = [
        {
          dateAuthored: '2022-06-08T12:50:39Z',
          dateCommited: '2022-06-08T12:50:39Z',
          author: {
            email: '69400901+raulUbillos@users.noreply.github.com',
            name: 'raulUbillos',
          },
          committer: {
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
    describe('commit', () => {
      it('Get a particular commit', async () => {
        const MOCKED_COMMIT: ICommitResponse = {
          dateAuthored: '2022-06-11T02:40:05Z',
          dateCommited: '2022-06-11T02:40:05Z',
          author: {
            avatarUrl: 'https://avatars.githubusercontent.com/u/69400901?v=4',
            id: 69400901,
            login: 'raulUbillos',
            email: '69400901+raulUbillos@users.noreply.github.com',
            name: 'raulUbillos',
          },
          committer: {
            avatarUrl: 'https://avatars.githubusercontent.com/u/19864447?v=4',
            id: 19864447,
            login: 'web-flow',
            email: 'noreply@github.com',
            name: 'GitHub',
          },
          files: [
            {
              filename: 'package-lock.json',
              status: 'modified',
              additions: 1,
              deletions: 1,
              changes: 2,
            },
          ],
          code: '31ccf9a5e9791ff5c9fa9bbaa0ebe7e9f17ac56f',
          message: 'Added commit history endpoint with unit tests (#3)',
        };

        jest
          .spyOn(commitService, 'commit')
          .mockReturnValue(new Promise((resolve) => resolve(MOCKED_COMMIT)));

        const response = await commitController.commit('', '', '', '');

        expect(response).toEqual(MOCKED_COMMIT);
      });
    });
  });
});
