import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import FilteredMissionsList from '../Task2/FilteredMissionsList';

jest.mock('axios');

beforeEach(() => {
  axios.get.mockClear();
});

test('displays data after loading', async () => {
  const mockData = {
    data: [{ flight_number: '123', mission_name: 'Mock Mission', payloads_count: 3, launch_date_utc: '2018-01-01T00:00:00.000Z' }]
  };
  axios.get.mockResolvedValueOnce(mockData);
  render(<FilteredMissionsList />);
  expect(screen.getByText(/Loading.../)).toBeInTheDocument();
});

test('handles no data scenario', async () => {
  axios.get.mockResolvedValueOnce({ data: [] });
  render(<FilteredMissionsList />);
  await waitFor(() => {
    expect(screen.getByText(/No data/i)).toBeInTheDocument();
  });
});
