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
            gitCommit: jest.fn(() => {
              return {};
            }),
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
        dateAuthored: '2022-06-08T02:03:10Z',
        dateCommited: '2022-06-08T02:03:10Z',
        author: {
          email: '69400901+raulUbillos@users.noreply.github.com',
          name: 'raulUbillos',
        },
        committer: {
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
  it('After calling api, it should return a commit mapped', async () => {
    const MOCKED_COMMIT: IGitCommitResponses = {
      sha: '31ccf9a5e9791ff5c9fa9bbaa0ebe7e9f17ac56f',
      commit: {
        author: {
          name: 'raulUbillos',
          email: '69400901+raulUbillos@users.noreply.github.com',
          date: '2022-06-11T02:40:05Z',
        },
        committer: {
          name: 'GitHub',
          email: 'noreply@github.com',
          date: '2022-06-11T02:40:05Z',
        },
        message: 'Added commit history endpoint with unit tests (#3)',
      },
      author: {
        login: 'raulUbillos',
        id: 69400901,
        avatar_url: 'https://avatars.githubusercontent.com/u/69400901?v=4',
      },
      committer: {
        login: 'web-flow',
        id: 19864447,
        avatar_url: 'https://avatars.githubusercontent.com/u/19864447?v=4',
      },
      files: [
        {
          sha: '7d84797b8dde916a563c1f09e8ecdfd533f28af4',
          filename: 'package-lock.json',
          status: 'modified',
          additions: 1,
          deletions: 1,
          changes: 2,
        },
        {
          sha: 'af8d92ff1244b7b87d5f1b288809ad0a4a9aa4fc',
          filename: 'package.json',
          status: 'modified',
          additions: 1,
          deletions: 1,
          changes: 2,
        },
        {
          sha: '2f18a5409509d0a633c757c188cbc0e719d792b3',
          filename: 'src/api-lib/api.service.spec.ts',
          status: 'added',
          additions: 116,
          deletions: 0,
          changes: 116,
        },
        {
          sha: 'e4d90c93049bccd072cc9332d38cca9aee158052',
          filename: 'src/api-lib/api.service.ts',
          status: 'modified',
          additions: 14,
          deletions: 2,
          changes: 16,
        },
        {
          sha: '1fe58600e1086814a6b504e34ffd050e902757a1',
          filename: 'src/api-lib/models/IGitCommitResponse.ts',
          status: 'added',
          additions: 16,
          deletions: 0,
          changes: 16,
        },
        {
          sha: 'b6de2d074efcb630782697ebfa72647142f2ca07',
          filename: 'src/commit/commits.controller.spec.ts',
          status: 'added',
          additions: 60,
          deletions: 0,
          changes: 60,
        },
        {
          sha: 'df50a7a1feea98bbad131565ea98545b32379ed3',
          filename: 'src/commit/commits.controller.ts',
          status: 'modified',
          additions: 8,
          deletions: 3,
          changes: 11,
        },
        {
          sha: '71208628c6a80dbcce6af852b2a37218c1f9ef98',
          filename: 'src/commit/commits.service.spec.ts',
          status: 'added',
          additions: 74,
          deletions: 0,
          changes: 74,
        },
        {
          sha: '1c60297e021100f60cd3f20e322d4aabc2b45e21',
          filename: 'src/commit/commits.service.ts',
          status: 'modified',
          additions: 16,
          deletions: 3,
          changes: 19,
        },
        {
          sha: '9607b60bf07242cfeb4922c304b59fd0ee2f361f',
          filename: 'src/commit/models/ICommitResponse.ts',
          status: 'added',
          additions: 14,
          deletions: 0,
          changes: 14,
        },
        {
          sha: 'f2389ea71a07e94aff0eb2b5227bb7c652e83e1f',
          filename: 'src/utils/mappers.ts',
          status: 'added',
          additions: 21,
          deletions: 0,
          changes: 21,
        },
      ],
    };

    const MOCKED_RESPONSE: ICommitResponse = {
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
        {
          filename: 'package.json',
          status: 'modified',
          additions: 1,
          deletions: 1,
          changes: 2,
        },
        {
          filename: 'src/api-lib/api.service.spec.ts',
          status: 'added',
          additions: 116,
          deletions: 0,
          changes: 116,
        },
        {
          filename: 'src/api-lib/api.service.ts',
          status: 'modified',
          additions: 14,
          deletions: 2,
          changes: 16,
        },
        {
          filename: 'src/api-lib/models/IGitCommitResponse.ts',
          status: 'added',
          additions: 16,
          deletions: 0,
          changes: 16,
        },
        {
          filename: 'src/commit/commits.controller.spec.ts',
          status: 'added',
          additions: 60,
          deletions: 0,
          changes: 60,
        },
        {
          filename: 'src/commit/commits.controller.ts',
          status: 'modified',
          additions: 8,
          deletions: 3,
          changes: 11,
        },
        {
          filename: 'src/commit/commits.service.spec.ts',
          status: 'added',
          additions: 74,
          deletions: 0,
          changes: 74,
        },
        {
          filename: 'src/commit/commits.service.ts',
          status: 'modified',
          additions: 16,
          deletions: 3,
          changes: 19,
        },
        {
          filename: 'src/commit/models/ICommitResponse.ts',
          status: 'added',
          additions: 14,
          deletions: 0,
          changes: 14,
        },
        {
          filename: 'src/utils/mappers.ts',
          status: 'added',
          additions: 21,
          deletions: 0,
          changes: 21,
        },
      ],
      code: '31ccf9a5e9791ff5c9fa9bbaa0ebe7e9f17ac56f',
      message: 'Added commit history endpoint with unit tests (#3)',
    };

    jest
      .spyOn(apiService, 'gitCommit')
      .mockReturnValue(new Promise((resolve) => resolve(MOCKED_COMMIT)));

    const responses = await commitsService.commit(
      'test',
      'test',
      'test',
      'test',
    );

    expect(responses).toEqual(MOCKED_RESPONSE);
  });
});
