import { DataIssues } from '../types/Issue';

export function saveToStorage(data: DataIssues, repoName: string) {
  localStorage.setItem(repoName, JSON.stringify(data));
}
