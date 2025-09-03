import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Tic Tac Toe title', () => {
  render(<App />);
  const title = screen.getByText(/Tic Tac Toe/i);
  expect(title).toBeInTheDocument();
});

test('shows initial turn indicator', () => {
  render(<App />);
  const status = screen.getByText(/Player X's turn/i);
  expect(status).toBeInTheDocument();
});
