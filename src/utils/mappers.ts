import { IGitCommitResponses } from '../api-lib/models/IGitCommitResponse';
import { ICommitResponse } from '../commit/models/ICommitResponse';

export const mapIGitCommitResponseToICommitResponse = (
  response: IGitCommitResponses,
): ICommitResponse => {
  return {
    author: {
      date: response.commit.author.date,
      email: response.commit.author.email,
      name: response.commit.author.name,
    },
    commiter: {
      date: response.commit.committer.date,
      email: response.commit.committer.email,
      name: response.commit.committer.name,
    },
    code: response.sha,
    message: response.commit.message,
  };
};
