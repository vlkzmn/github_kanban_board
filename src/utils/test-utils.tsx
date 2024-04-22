import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { PropsWithChildren, ReactElement } from 'react';
import { Provider } from 'react-redux';
import { http, HttpResponse, delay } from 'msw';

import type { AppStore, RootState } from '../app/store';
import { makeStore } from '../app/store';
import {
  issuesDataResponseForTest,
  repoDataResponseForTest,
} from './dataStorage';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export const renderWithProviders = (
  ui: ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {},
) => {
  const {
    preloadedState = {},
    store = makeStore(preloadedState),
    ...renderOptions
  } = extendedRenderOptions;

  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>{children}</Provider>
  );

  return {
    store,
    user: userEvent.setup(),
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
};

export const handlers = [
  http.get('https://api.github.com/repos/facebook/react', async () => {
    await delay(150);
    return HttpResponse.json(repoDataResponseForTest);
  }),
  http.get('https://api.github.com/repos/facebook/react/issues', async () => {
    await delay(150);
    return HttpResponse.json(issuesDataResponseForTest);
  }),
];
