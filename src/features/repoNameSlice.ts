import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface RepoNameState {
  repoName: string;
  errorLoadingData: boolean;
}

export const initialState: RepoNameState = {
  repoName: '',
  errorLoadingData: false,
};

export const repoNameSlice = createSlice({
  name: 'repoName',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      state.repoName = action.payload;
    },
    addErrorLoading: (state, action: PayloadAction<boolean>) => {
      state.errorLoadingData = action.payload;
    },
  },
  selectors: {
    selectRepoName: (counter) => counter.repoName,
    selectErrorLoadingData: (counter) => counter.errorLoadingData,
  },
});

export const { add, addErrorLoading } = repoNameSlice.actions;
export const { selectRepoName, selectErrorLoadingData } =
  repoNameSlice.selectors;
export default repoNameSlice.reducer;
