import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import SeasonalAni from '../components/SeasonalAni';
import configureStore from 'redux-mock-store';
import fetchSeasonalAniData from '../api/seasonalAniApi';

const mockStore = configureStore([]);

vi.mock('../api/seasonalAniApi'); // Mock the actual API call

describe('Seasonal anime component', () => {
  let store;

  beforeEach(() => {
    // Mock store
    store = mockStore({
      seasonalAni: {
        seasonalAniData: [],
        seasons: [
          { year: '2025', seasons: ["summer", "winter"] },
          { year: '2024', seasons: ["fall", "spring"] },
        ],
      },
    });

    // Mock dispatch
    store.dispatch = vi.fn();

    // Render the component
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SeasonalAni />
        </BrowserRouter>
      </Provider>
    );
  });

  it('should render properly', () => {
    // checks if dropdown exists
    const Dropdown = screen.getByText(/Select any season/i);
    expect(Dropdown).toBeInTheDocument();
    fireEvent.click(Dropdown);

    // checks if the dropdown menu is working
    expect(screen.getByText(/summer 2025/i)).toBeInTheDocument();
    expect(screen.getByText(/winter 2025/i)).toBeInTheDocument();
    expect(screen.getByText(/fall 2024/i)).toBeInTheDocument();
    expect(screen.getByText(/spring 2024/i)).toBeInTheDocument();
  });

  it('should dispatch fetchSeasonalAniData when a season is clicked', () => {
    // Mock the fetchSeasonalAniData to return a function since it's a thunk
    fetchSeasonalAniData.mockReturnValue({ type: 'FETCH_SEASONAL_ANI' });

    // Simulate clicking the "Select any season" dropdown
    fireEvent.click(screen.getByText(/Select any season/i));

    // Simulate clicking the season (Winter 2025)
    fireEvent.click(screen.getByText(/winter 2025/i));

    // Check that fetchSeasonalAniData is dispatched with the correct arguments
    expect(store.dispatch).toHaveBeenCalledWith(
      fetchSeasonalAniData({ url: expect.any(String), season: 'winter', year: '2025' })
    );

    // Check if the current season and year are updated
    expect(screen.getByText(/winter 2025/i)).toBeInTheDocument();
  });
});
