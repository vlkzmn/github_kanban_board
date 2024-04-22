import { DataIssues } from '../types/Issue';
import { IssueResponse } from '../types/IssueResponse';
import { RepoDataResponse } from '../types/RepoDataResponse';

export interface IssuesState {
  issues: DataIssues;
}

export const initialIssues: DataIssues = {
  tasks: {},
  columns: {
    to_do: {
      id: 'to_do',
      title: 'To Do',
      taskIds: [],
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

export const initialIssuesState: IssuesState = {
  issues: initialIssues,
};

export const issuesForTestUpdate: DataIssues = {
  tasks: {
    '28748': {
      id: '28748',
      title: '[Flight] Deduplicate suspended elements',
      opened: '2024-04-04T16:02:44Z',
      state: 'open',
      admin: 'unstubbable',
      comments: 1,
    },
    '28749': {
      id: '28749',
      title: 'remove react-test-renderer flags',
      opened: '2024-04-04T20:42:24Z',
      state: 'open',
      admin: 'noahlemen',
      comments: 0,
    },
  },
  columns: {
    to_do: {
      id: 'to_do',
      title: 'To Do',
      taskIds: ['28748', '28749'],
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

export const issuesUpdatedStateForTest: IssuesState = {
  issues: issuesForTestUpdate,
};

export const repoDataResponseForTest: RepoDataResponse = {
  owner: { html_url: 'https://github.com/facebook', login: 'Facebook' },
  name: 'react',
  html_url: 'https://github.com/facebook/react',
  stargazers_count: 221484,
};

export const issuesDataResponseForTest: IssueResponse[] = [
  {
    number: 28748,
    title: 'Some title for issues',
    created_at: '2024-04-04T16:02:44Z',
    user: {
      login: 'unstubbable',
    },
    comments: 1,
    state: 'open',
  },
  {
    number: 28749,
    title: 'remove react-test-renderer flags',
    created_at: '2024-04-04T20:42:24Z',
    user: {
      login: 'noahlemen',
    },
    comments: 0,
    state: 'open',
  },
  {
    number: 28750,
    title: 'Add descriptions of new methods to the react-reconciler readme',
    created_at: '2024-04-04T21:24:32Z',
    user: {
      login: 'jackpope',
    },
    comments: 1,
    state: 'open',
  },
];
