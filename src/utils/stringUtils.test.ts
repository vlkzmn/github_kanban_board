import {
  firstCapital,
  getRepoName,
  getDateDifference,
  validateUrl,
} from './stringUtils';

test('firstCapital should capitalize the first letter of a string', () => {
  const result = firstCapital('hello');
  expect(result).toBe('Hello');
});

test('getRepoName should extract the repository name from a URL', () => {
  const result = getRepoName('https://github.com/owner/repo');
  expect(result).toBe('owner/repo');
});

test('getDateDifference should return correct time difference strings', () => {
  const todayResult = getDateDifference(new Date().toISOString());
  expect(todayResult).toBe('opened today');

  const oneDayAgoResult = getDateDifference(
    new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  );
  expect(oneDayAgoResult).toBe('opened 1 day ago');

  const fiveDaysAgoResult = getDateDifference(
    new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  );
  expect(fiveDaysAgoResult).toBe('opened 5 days ago');
});

test('validateUrl should resolve for a valid URL', async () => {
  await expect(
    validateUrl({}, 'https://github.com/owner/repo'),
  ).resolves.toBeUndefined();
});

test('validateUrl should reject for an invalid URL', async () => {
  await expect(validateUrl({}, 'invalid-url')).rejects.toMatch(
    "'url' should be https://github.com/owner/repo",
  );
});
