import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import TopAni from '../components/TopAni';  // Import the TopAni component
import configureStore from 'redux-mock-store';
import { fetchTopAni } from '../api/topAniApi';  // Mock the API function

const mockStore = configureStore([]);

// Mock the API call
vi.mock('../api/topAniApi', () => ({
  fetchTopAni: vi.fn(),
}));

describe('TopAni component', () => {
  let store;

  beforeEach(() => {
    // Mock store with complete anime data structure
    store = mockStore({
      topAni: {
        topAnidata: [
          {
            id: 1,
            title: 'Attack on Titan',
            images: { webp: { image_url: 'https://example.com/aot.webp' } },
          },
          {
            id: 2,
            title: 'My Hero Academia',
            images: { webp: { image_url: 'https://example.com/mha.webp' } },
          },
        ],
        topAniStatus: 'succeeded',
      },
    });

    // Mock dispatch
    store.dispatch = vi.fn();
    fetchTopAni.mockReturnValue({ type: "FETCH_TOPANI_SUCCESS" });
  });

  it('should render Top Anime section when status is succeeded', () => {
    // Render the component
    render(
      <Provider store={store}>
        <BrowserRouter>
          <TopAni />
        </BrowserRouter>
      </Provider>
    );
    // Check if the heading is rendered
    expect(screen.getByText(/Top Anime/i)).toBeInTheDocument();

    // Check if anime titles are rendered
    expect(screen.getByText(/Attack on Titan/i)).toBeInTheDocument();
    expect(screen.getByText(/My Hero Academia/i)).toBeInTheDocument();
  });

  it('should not render Top Anime section when status is failed', () => {
    // Change the status to 'failed'
    store = mockStore({
      topAni: {
        topAnidata: [],
        topAniStatus: 'failed',
      },
    });

    // Re-render the component with the updated store
    render(
      <Provider store={store}>
        <BrowserRouter>
          <TopAni />
        </BrowserRouter>
      </Provider>
    );

    // Check if the heading is not rendered
    expect(screen.queryByText(/Top Anime/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Attack on Titan/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/My Hero Academia/i)).not.toBeInTheDocument();
  });

  it('should dispatch fetchTopAni when the component mounts', () => {
    // Render the component
    render(
      <Provider store={store}>
        <BrowserRouter>
          <TopAni />
        </BrowserRouter>
      </Provider>
    );
    // Check if the fetchTopAni function was dispatched with the correct URL
    expect(store.dispatch).toHaveBeenCalledWith(fetchTopAni(expect.any(String)));
  });
});
