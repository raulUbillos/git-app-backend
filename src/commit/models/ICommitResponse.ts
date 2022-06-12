export interface ICommitResponse {
  code: string;
  dateAuthored: string;
  dateCommited: string;
  author: {
    login?: string;
    id?: number;
    avatarUrl?: string;
    name: string;
    email: string;
  };
  committer: {
    login?: string;
    id?: number;
    avatarUrl?: string;
    name: string;
    email: string;
  };
  files?: {
    filename: string;
    status: string;
    additions: number;
    deletions: number;
    changes: number;
  }[];
  message: string;
}
