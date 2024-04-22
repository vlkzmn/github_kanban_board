import issuesReducer, { update } from './issuesSlice';
import {
  initialIssuesState,
  issuesForTestUpdate,
  issuesUpdatedStateForTest,
} from '../utils/dataStorage';

test('Should handle initial state for issuesSlice reducer', () => {
  expect(issuesReducer(undefined, { type: 'unknown' })).toEqual(
    initialIssuesState,
  );
});

test('Should update issues state correctly for issuesSlice reducer', () => {
  expect(
    issuesReducer(initialIssuesState, update(issuesForTestUpdate)),
  ).toStrictEqual(issuesUpdatedStateForTest);
});
