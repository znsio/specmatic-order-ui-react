import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { 
  startStub,
  stopStub,
  setExpectations
} from 'specmatic';
import path from 'path';

var stub;

beforeAll(async () => {
  stub = await startStub();
  await setExpectations("__test__/specmatic-expectations/expectation.json");
}, 10000);

test('renders gadgets list', async () => {
  process.env.REACT_APP_API_URL="http://localhost:9000"

  const { getAllByText } = render(<App />);
  await waitFor(() => {
    expect(getAllByText("Product name").length).toBe(2);
  })

  expect(screen.getByText(/Mobile/)).toBeInTheDocument;
  expect(screen.getByText(/Headphone/)).toBeInTheDocument;
});

afterAll(() => {
  stopStub(stub);
});