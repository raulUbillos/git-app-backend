import { Test, TestingModule } from '@nestjs/testing';
import { CommitsService } from './commits.service';
import { ICommitResponse } from './models/ICommitResponse';
import { ApiService } from '../api-lib/api.service';
import { IGitCommitResponses } from '../api-lib/models/IGitCommitResponse';
describe('CommitsService', () => {
  let commitsService: CommitsService;
  let apiService: ApiService;
  beforeEach(async () => {
    const mockedModule: TestingModule = await Test.createTestingModule({
      providers: [
        CommitsService,
        {
          provide: ApiService,
          useValue: {
            gitCommitHistory: jest.fn(() => []),
          },
        },
      ],
    }).compile();
    commitsService = mockedModule.get<CommitsService>(CommitsService);
    apiService = mockedModule.get<ApiService>(ApiService);
  });
  it('After calling api, it should return a list of commit mapped:', async () => {
    const MOCKED_COMMIT_RESPONSES: IGitCommitResponses[] = [
      {
        sha: 'asd',
        commit: {
          author: {
            date: '2022-06-08T02:03:10Z',
            email: '69400901+raulUbillos@users.noreply.github.com',
            name: 'raulUbillos',
          },
          committer: {
            date: '2022-06-08T02:03:10Z',
            email: '69400901+raulUbillos@users.noreply.github.com',
            name: 'raulUbillos',
          },
          message: 'test',
        },
      },
    ];
    const MOCKED_COMMIT_MAPPED: ICommitResponse[] = [
      {
        author: {
          date: '2022-06-08T02:03:10Z',
          email: '69400901+raulUbillos@users.noreply.github.com',
          name: 'raulUbillos',
        },
        commiter: {
          date: '2022-06-08T02:03:10Z',
          email: '69400901+raulUbillos@users.noreply.github.com',
          name: 'raulUbillos',
        },
        code: 'asd',
        message: 'test',
      },
    ];

    jest
      .spyOn(apiService, 'gitCommitHistory')
      .mockReturnValue(
        new Promise((resolve) => resolve(MOCKED_COMMIT_RESPONSES)),
      );

    const responses = await commitsService.commitHistory(
      'test',
      'test',
      'test',
    );

    expect(responses).toEqual(MOCKED_COMMIT_MAPPED);
  });
});
