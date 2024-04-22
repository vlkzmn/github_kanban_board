import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataIssues } from '../types/Issue';
import { initialIssuesState } from '../utils/dataStorage';

export const issuesSlice = createSlice({
  name: 'issues',
  initialState: initialIssuesState,
  reducers: {
    update: (state, action: PayloadAction<DataIssues>) => {
      state.issues = action.payload;
    },
  },
  selectors: {
    selectIssues: (issues) => issues.issues,
  },
});

export const { update } = issuesSlice.actions;
export const { selectIssues } = issuesSlice.selectors;
export default issuesSlice.reducer;
