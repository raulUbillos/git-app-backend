export interface IGitCommitResponses {
  sha: string;
  commit: {
    author: {
      name: string;
      email: string;
      date: string;
    };
    committer: {
      name: string;
      email: string;
      date: string;
    };
    message: string;
  };
  author?: {
    login: string;
    id: number;
    avatar_url: string;
  };
  committer?: {
    login: string;
    id: number;
    avatar_url: string;
  };
  files?: {
    sha: string;
    filename: string;
    status: string;
    additions: number;
    deletions: number;
    changes: number;
  }[];
}
