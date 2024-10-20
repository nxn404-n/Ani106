import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, beforeEach, expect, vi } from "vitest";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import SearchLandingPage from "../components/SearchLandingPage";
import store from "../app/store";
import { setSearchData, setSearchFor } from "../feature/searchSlice";
import { setData, setShowDetails } from "../feature/aniDetailsSlice";

// Mock anime data for testing
const mockSearchData = [
  {
    mal_id: 1,
    title: "Anime Title 1",
    images: {
      webp: {
        image_url: "https://via.placeholder.com/150",
      },
    },
  },
  {
    mal_id: 2,
    title: "Anime Title 2",
    images: {
      webp: {
        image_url: "https://via.placeholder.com/150",
      },
    },
  },
];

describe("SearchLandingPage Component", () => {
  beforeEach(() => {
    store.dispatch(setSearchData(mockSearchData));
    store.dispatch(setSearchFor("Anime"));
  })

  it("renders search results correctly", () => {
    render(
      <Provider store={store}>
        <Router>
          <SearchLandingPage />
        </Router>
      </Provider>
    );

    // Check if the anime titles are rendered
    expect(screen.getByText("Search results for \"Anime\"")).toBeInTheDocument();
    expect(screen.getByText("Anime Title 1")).toBeInTheDocument();
    expect(screen.getByText("Anime Title 2")).toBeInTheDocument();
  });

  it('should show anime details when the anime is clicked', () => {
    store.dispatch = vi.fn(); // Spy on dispatch

    render(
      <Provider store={store}>
        <Router>
          <SearchLandingPage />
        </Router>
      </Provider>
    );
    const animeCard = screen.getByText(/Anime Title 1/i);
    fireEvent.click(animeCard);

    // Expect setShowDetails to be dispatched first
    expect(store.dispatch).toHaveBeenNthCalledWith(1, setShowDetails(true));
  
    // Expect setData to be dispatched with the full data payload
    expect(store.dispatch).toHaveBeenNthCalledWith(2, setData({
      title: "Anime Title 1",
      title_japanese: undefined,
      image: "https://via.placeholder.com/150",
      large_image: undefined,
      episodes: undefined,
      score: undefined,
      rank: null,
      synopsis: undefined,
      popularity: undefined,
      members: undefined,
      status: undefined,
      year: undefined,
      favorites: undefined,
      rating: undefined,
    }));
  });
});
