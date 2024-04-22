import { setupServer } from 'msw/node';
import { repoDataApi } from '../features/repoDataApi';
import { RootState, makeStore } from '../app/store';
import { handlers } from '../utils/test-utils';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const store = makeStore();

test('should intercept and process actions correctly', async () => {
  const action = repoDataApi.endpoints.getRepoData.initiate('facebook/react');

  await store.dispatch(action);

  const state: RootState = store.getState();
  expect(state.repoData.queries['getRepoData("facebook/react")']?.data).toEqual(
    {
      repo_url: 'https://github.com/facebook/react',
      repo_name: 'React',
      owner_url: 'https://github.com/facebook',
      owner: 'Facebook',
      stars: 221484,
    },
  );
});
