import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the data entry form', () => {
  render(<App />);
  expect(screen.getByText(/data entry form/i)).toBeInTheDocument();
});