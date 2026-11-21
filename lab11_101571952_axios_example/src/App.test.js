import { render, screen } from '@testing-library/react';
import App from './App';

// fake axios so the test does not call the real API
jest.mock('axios', () => ({
  get: () => Promise.resolve({ data: { results: [] } }),
}));

test('renders the user list heading', () => {
  render(<App />);
  expect(screen.getByText(/user list/i)).toBeInTheDocument();
});
