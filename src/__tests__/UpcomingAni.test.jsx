import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import UpcomingAni from '../components/UpcomingAni';
import configureStore from 'redux-mock-store';
import fetchUpcomingAni from '../api/upcomingAniApi';

const mockStore = configureStore([]);

vi.mock('../api/upcomingAniApi', () => ({
  default: vi.fn(),
}));

describe('UpcomingAni component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      upcomingAni: {
        upcomingAnidata: [
          {
            id: 1,
            title: 'Chainsaw Man',
            images: { webp: { image_url: 'https://example.com/chainsawman.webp' } },
          },
          {
            id: 2,
            title: 'Jujutsu Kaisen',
            images: { webp: { image_url: 'https://example.com/jujutsukaisen.webp' } },
          },
        ],
        upcomingAnimeStatus: 'succeeded',
      },
    });

    store.dispatch = vi.fn();
    fetchUpcomingAni.mockReturnValue({ type: 'FETCH_UPCOMING_ANI_SUCCESS' });
  });

  it('should render Upcoming Anime section when status is succeeded', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <UpcomingAni />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText(/Upcoming Anime/i)).toBeInTheDocument();
    expect(screen.getByText(/Chainsaw Man/i)).toBeInTheDocument();
    expect(screen.getByText(/Jujutsu Kaisen/i)).toBeInTheDocument();
  });

  it('should not render Upcoming Anime section when status is failed', () => {
    // Change the status to 'failed'
    store = mockStore({
      upcomingAni: {
        upcomingAnidata: [
          {
            id: 1,
            title: 'Chainsaw Man',
            images: { webp: { image_url: 'https://example.com/chainsawman.webp' } },
          },
          {
            id: 2,
            title: 'Jujutsu Kaisen',
            images: { webp: { image_url: 'https://example.com/jujutsukaisen.webp' } },
          },
        ],
        upcomingAnimeStatus: 'failed',
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <UpcomingAni />
        </BrowserRouter>
      </Provider>
    );

    // Check if the heading is not rendered
    expect(screen.queryByText(/Chainsaw Man/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Jujutsu Kaisen/i)).not.toBeInTheDocument();
  });

  it('should dispatch fetchUpcomingAni when the component mounts', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <UpcomingAni />
        </BrowserRouter>
      </Provider>
    );
    expect(store.dispatch).toHaveBeenCalledWith(fetchUpcomingAni(expect.any(String)));
  });
});
