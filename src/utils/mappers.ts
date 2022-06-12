import { IGitCommitResponses } from '../api-lib/models/IGitCommitResponse';
import { ICommitResponse } from '../commit/models/ICommitResponse';

export const mapIGitCommitResponseToICommitResponse = (
  response: IGitCommitResponses,
): ICommitResponse => {
  return {
    dateAuthored: response.commit.author.date,
    dateCommited: response.commit.committer.date,
    author: {
      avatarUrl: response.author?.avatar_url,
      id: response.author?.id,
      login: response.author?.login,
      email: response.commit.author.email,
      name: response.commit.author.name,
    },
    committer: {
      avatarUrl: response.committer?.avatar_url,
      id: response.committer?.id,
      login: response.committer?.login,
      email: response.commit.committer.email,
      name: response.commit.committer.name,
    },
    files: response.files?.map((item) => {
      return {
        filename: item.filename,
        status: item.status,
        additions: item.additions,
        deletions: item.deletions,
        changes: item.changes,
      };
    }),
    code: response.sha,
    message: response.commit.message,
  };
};
