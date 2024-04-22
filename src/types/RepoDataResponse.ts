export interface RepoDataResponse {
  html_url: string;
  name: string;
  owner: {
    html_url: string;
    login: string;
  };
  stargazers_count: number;
}
