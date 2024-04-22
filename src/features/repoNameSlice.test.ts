import repoNameReducer, {
  add,
  addErrorLoading,
  RepoNameState,
} from './repoNameSlice';

test('Initial state should be set correctly', () => {
  expect(repoNameReducer(undefined, { type: 'unknown' })).toEqual({
    repoName: '',
    errorLoadingData: false,
  });
});

test('Adding repository name should modify state correctly', () => {
  const previousState: RepoNameState = {
    repoName: '',
    errorLoadingData: false,
  };

  expect(repoNameReducer(previousState, add('axios/axios'))).toEqual({
    repoName: 'axios/axios',
    errorLoadingData: false,
  });
});

test('Setting error loading flag should modify state correctly', () => {
  const previousState: RepoNameState = {
    repoName: 'axios/axios',
    errorLoadingData: false,
  };

  expect(repoNameReducer(previousState, addErrorLoading(true))).toEqual({
    repoName: 'axios/axios',
    errorLoadingData: true,
  });
});
