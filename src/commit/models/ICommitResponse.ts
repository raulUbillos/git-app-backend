export interface ICommitResponse {
  code: string;
  author: {
    name: string;
    email: string;
    date: string;
  };
  commiter: {
    name: string;
    email: string;
    date: string;
  };
  message: string;
}
