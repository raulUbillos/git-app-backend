import { IGitCommitResponses } from '../api-lib/models/IGitCommitResponse';
import { ICommitResponse } from '../commit/models/ICommitResponse';

describe('Mappers', () => {
  describe('mapIGitCommitResponseToICommitResponse', () => {
    it('Should do the mapping for a commit history', () => {
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

      const commitResponses: ICommitResponse[] = [
        {
          code: 'asd',
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
          message: 'test',
        },
      ];
    });
  });
});
