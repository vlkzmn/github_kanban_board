export interface IssueResponse {
  number: number;
  title: string;
  created_at: string;
  user: {
    login: string;
  };
  comments: number;
  state: string;
  assignee: null | object;
}
