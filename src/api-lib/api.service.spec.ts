import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { ApiService } from './api.service';
import { IGitCommitResponses } from './models/IGitCommitResponse';
import { of } from 'rxjs';
import { Test, TestingModule } from '@nestjs/testing';

describe('ApiService', () => {
  let httpService: HttpService;
  let apiService: ApiService;

  beforeEach(async () => {
    const mockedHttpModule: TestingModule = await Test.createTestingModule({
      providers: [
        ApiService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(() =>
              of({
                data: {
                  asd: 'asd',
                },
              }),
            ),
          },
        },
      ],
    }).compile();

    process.env = {
      GITHUBAPIHOST: '',
    };
    httpService = mockedHttpModule.get<HttpService>(HttpService);
    apiService = mockedHttpModule.get<ApiService>(ApiService);
  });

  describe('gitCommitHistory', () => {
    it('should return an array of git commits with address with no branch', async () => {
      const mockedCommitResponses: IGitCommitResponses[] = [
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
      const owner = 'test';
      const repo = 'test';
      const GITHUB_COMMIT_HISTORY = `${process.env.GITHUBAPIHOST}repos/${owner}/${repo}/commits`;
      const response: AxiosResponse = {
        data: mockedCommitResponses,
        status: 200,
        statusText: '',
        headers: {},
        config: {},
      };
      jest.spyOn(httpService, 'get').mockReturnValue(of(response));

      const responses = await apiService.gitCommitHistory(owner, repo, '');

      expect(httpService.get).toBeCalledWith(GITHUB_COMMIT_HISTORY);
      expect(responses).toEqual(mockedCommitResponses);
    });

    it('should return an array of git commits with address with a branch', async () => {
      const mockedCommitResponses: IGitCommitResponses[] = [
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
      const owner = 'test';
      const repo = 'test';
      const branch = 'test';
      const GITHUB_COMMIT_HISTORY = `${
        process.env.GITHUBAPIHOST
      }repos/${owner}/${repo}/commits${branch ? `?sha=${branch}` : ''}`;
      const response: AxiosResponse = {
        data: mockedCommitResponses,
        status: 200,
        statusText: '',
        headers: {},
        config: {},
      };
      jest.spyOn(httpService, 'get').mockReturnValue(of(response));

      const responses = await apiService.gitCommitHistory(owner, repo, branch);

      expect(httpService.get).toBeCalledWith(GITHUB_COMMIT_HISTORY);
      expect(responses).toEqual(mockedCommitResponses);
    });
  });
});
