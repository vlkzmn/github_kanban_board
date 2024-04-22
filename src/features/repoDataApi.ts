import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RepoData } from '../types/RepoData';
import { RepoDataResponse } from '../types/RepoDataResponse';
import { DataIssues, Task } from '../types/Issue';
import { IssueResponse } from '../types/IssueResponse';
import { firstCapital } from '../utils/stringUtils';

const transformRepoDataResponse = (data: RepoDataResponse) => ({
  repo_url: data.html_url,
  repo_name: firstCapital(data.name),
  owner_url: data.owner.html_url,
  owner: firstCapital(data.owner.login),
  stars: data.stargazers_count,
});

const transformIssuesResponse = (data: IssueResponse[]) => {
  const tasks: Record<string, Task> = {};
  const openedTasks: string[] = [];

  data.forEach((item) => {
    const taskId = item.number.toString();
    tasks[taskId] = {
      id: taskId,
      title: item.title,
      opened: item.created_at,
      admin: item.user.login,
      comments: item.comments,
      state: item.state,
    };
    openedTasks.push(taskId);
  });

  return {
    tasks,
    columns: {
      to_do: {
        id: 'to_do',
        title: 'To Do',
        taskIds: openedTasks,
      },
      in_progress: {
        id: 'in_progress',
        title: 'In Progress',
        taskIds: [],
      },
      done: {
        id: 'done',
        title: 'Done',
        taskIds: [],
      },
    },
    columnOrder: ['to_do', 'in_progress', 'done'],
  };
};

export const repoDataApi = createApi({
  reducerPath: 'repoData',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.github.com/repos/',
  }),
  endpoints: (build) => ({
    getRepoData: build.query<RepoData, string>({
      query: (repoName) => `${repoName}`,
      transformResponse: transformRepoDataResponse,
    }),
    getIssues: build.query<DataIssues, string>({
      query: (repoName) => `${repoName}/issues`,
      transformResponse: transformIssuesResponse,
    }),
  }),
});

export const { useGetRepoDataQuery, useGetIssuesQuery } = repoDataApi;
