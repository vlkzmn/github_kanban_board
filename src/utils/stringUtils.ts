import { RuleObject } from 'antd/es/form';

export function firstCapital(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getRepoName(str: string) {
  return str.split('/').slice(-2).join('/');
}

export function getDateDifference(dateString: string) {
  const date = new Date(dateString);
  const currentDate = new Date();
  const difference = currentDate.getTime() - date.getTime();
  const daysAgo = Math.floor(difference / (1000 * 60 * 60 * 24));
  let result: string;

  switch (daysAgo) {
    case 0:
      result = 'opened today';
      break;
    case 1:
      result = 'opened 1 day ago';
      break;
    default:
      result = `opened ${daysAgo} days ago`;
  }

  return result;
}

export const validateUrl = (_rule: RuleObject, value: string) => {
  if (value) {
    const pattern = /^https:\/\/github\.com\/[a-zA-Z0-9-_.]+\/[a-zA-Z0-9-_.]+$/;

    if (!pattern.test(value)) {
      return Promise.reject("'url' should be https://github.com/owner/repo");
    }
  }
  return Promise.resolve();
};
