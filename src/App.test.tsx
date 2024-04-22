import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { screen, waitFor } from '@testing-library/react';
import { handlers, renderWithProviders } from './utils/test-utils';
import App from './App';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('Testing empty URL input and submit', async () => {
  const { user } = renderWithProviders(<App />);
  await user.click(screen.getByTestId('button'));
  expect(await screen.findByText(/'url' is required/i)).toBeInTheDocument();
});

test('Testing invalid URL input', async () => {
  const { user } = renderWithProviders(<App />);

  const urlInput = screen.getByTestId('input');
  await user.clear(urlInput);
  await user.type(urlInput, 'https://invalid.url');
  expect(
    await screen.findByText(
      /'url' should be https:\/\/github.com\/owner\/repo/i,
    ),
  ).toBeInTheDocument();
});

test('Uploading the repository and fill up the board with three tasks.', async () => {
  const { user } = renderWithProviders(<App />);

  const urlInput = screen.getByTestId('input');
  await user.clear(urlInput);
  await user.type(urlInput, 'https://github.com/facebook/react');
  expect(screen.queryByTestId('links-skeleton')).toBeNull();
  expect(screen.queryByTestId('board-skeleton')).toBeNull();

  await user.click(screen.getByTestId('button'));

  expect(screen.getByTestId('links-skeleton')).toBeInTheDocument();
  expect(screen.getByTestId('board-skeleton')).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.queryByTestId('links-skeleton')).not.toBeInTheDocument();
    expect(screen.queryByTestId('board-skeleton')).not.toBeInTheDocument();
    expect(screen.getByTestId('owner-link')).toHaveTextContent(/facebook/i);
    expect(screen.getByTestId('repo-link')).toHaveTextContent(/react/i);
    expect(screen.getByTestId('stars')).toHaveTextContent(/221 K stars/i);
    expect(screen.getAllByTestId('task')).toHaveLength(3);
  });
});

test('Testing no issues for repository', async () => {
  server.use(
    http.get('https://api.github.com/repos/vlkzmn/vite_template', () => {
      return HttpResponse.json({
        owner: { html_url: 'https://github.com/vlkzmn', login: 'vlkzmn' },
        name: 'vite_template',
        html_url: 'https://github.com/vlkzmn/vite_template',
        stargazers_count: 0,
      });
    }),
    http.get('https://api.github.com/repos/vlkzmn/vite_template/issues', () => {
      return HttpResponse.json([]);
    }),
  );

  const { user } = renderWithProviders(<App />);

  const urlInput = screen.getByTestId('input');
  await user.clear(urlInput);
  await user.type(urlInput, 'https://github.com/vlkzmn/vite_template');
  expect(screen.queryByTestId('links-skeleton')).toBeNull();
  expect(screen.queryByTestId('board-skeleton')).toBeNull();

  await user.click(screen.getByTestId('button'));

  expect(screen.queryByTestId('links-skeleton')).toBeInTheDocument();
  expect(screen.queryByTestId('board-skeleton')).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.queryByTestId('links-skeleton')).not.toBeInTheDocument();
    expect(screen.queryByTestId('board-skeleton')).not.toBeInTheDocument();
    expect(screen.getByTestId('owner-link')).toHaveTextContent(/vlkzmn/i);
    expect(screen.getByTestId('repo-link')).toHaveTextContent(/vite_template/i);
    expect(screen.queryByTestId('stars')).toBeNull();
    expect(screen.getByText(/No issues for this repo./i)).toBeInTheDocument();
  });
});

test('Testing no repository exists on GitHub', async () => {
  server.use(
    http.get('https://api.github.com/repos/owner/repo', () => {
      return new HttpResponse('Not found', {
        status: 404,
      });
    }),
    http.get('https://api.github.com/repos/owner/repo/issues', () => {
      return new HttpResponse('Not found', {
        status: 404,
      });
    }),
  );

  const { user } = renderWithProviders(<App />);

  const urlInput = screen.getByTestId('input');
  await user.clear(urlInput);
  await user.type(urlInput, 'https://github.com/owner/repo');
  await user.click(screen.getByTestId('button'));

  expect(screen.queryByTestId('links-skeleton')).toBeInTheDocument();
  expect(screen.queryByTestId('board-skeleton')).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.queryByTestId('links-skeleton')).not.toBeInTheDocument();
    expect(screen.queryByTestId('board-skeleton')).not.toBeInTheDocument();
    expect(
      screen.queryByText(/No such "owner\/repo" repository exists on GitHub./i),
    ).toBeInTheDocument();
  });
});
