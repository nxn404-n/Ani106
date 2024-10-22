import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import NewAnime from "../components/NewAnime";
import { beforeEach, describe, expect, test, vi } from "vitest";
import configureStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import { setShowDetails, setData } from "../feature/aniDetailsSlice";

const mockStore = configureStore([]);

const newAnimeDataMock = [
  {
    mal_id: 1,
    title: "Mock Anime Title",
    title_japanese: "モックアニメ",
    images: {
      webp: {
        image_url: "https://mock-url.com/mock-image.jpg",
        large_image_url: "https://mock-url.com/mock-large-image.jpg",
      },
    },
    episodes: 12,
    score: 8.5,
    synopsis: "This is a mock synopsis of the anime.",
    type: "TV",
    popularity: 1000,
    members: 50000,
    status: "Airing",
    year: 2024,
    favorites: 1200,
    rating: "PG-13",
  },
];

describe("NewAnime Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      newAnime: {
        newAnimeData: newAnimeDataMock,
        newAnimeStatus: 'succeeded',
      },
    });

    store.dispatch = vi.fn(); // Mock dispatch

    render(
      <Provider store={store}>
        <BrowserRouter>
          <NewAnime />
        </BrowserRouter>
      </Provider>,
    );
  });

  test('should render correctly', () => {
    expect(screen.getByText(/New This Season/i)).toBeInTheDocument();
    expect(screen.getByText(/Mock Anime Title/i)).toBeInTheDocument();
  });

  test('should handle click and dispatch setShowDetails and setData', () => {
    const animeCard = screen.getByText(/Mock Anime Title/i);
    
    // Simulate user clicking the anime card
    fireEvent.click(animeCard);

    // Check if the correct actions are dispatched with the correct data
    expect(store.dispatch).toHaveBeenCalledWith(setShowDetails(true));
    expect(store.dispatch).toHaveBeenCalledWith(setData({
      title: "Mock Anime Title",
      title_japanese: "モックアニメ",
      image: "https://mock-url.com/mock-image.jpg",
      large_image: "https://mock-url.com/mock-large-image.jpg",
      episodes: 12,
      score: 8.5,
      rank: null,
      synopsis: "This is a mock synopsis of the anime.",
      popularity: 1000,
      members: 50000,
      status: "Airing",
      year: 2024,
      favorites: 1200,
      rating: "PG-13",
    }));
  });
});
