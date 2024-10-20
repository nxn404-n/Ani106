import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import HorizontalSlide from "../components/HorizontalSlide";
import { setData, setShowDetails } from "../feature/aniDetailsSlice";
import store from "../app/store";

describe("HorizontalSlide Component", () => {
  const mockAnimeData = [
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

  const sliderId = "test-slider";

  it("renders anime data correctly", () => {
    render(
      <Provider store={store}>
        <Router>
          <HorizontalSlide data={mockAnimeData} sliderId={sliderId} />
        </Router>
      </Provider>
    );

    // Check if the anime titles are rendered
    expect(screen.getByText(/Anime Title 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Anime Title 2/i)).toBeInTheDocument();
  });

  it("dispatches actions when an anime is clicked", () => {
    store.dispatch = vi.fn(); // Spy on dispatch
  
    render(
      <Provider store={store}>
        <Router>
          <HorizontalSlide data={mockAnimeData} sliderId={sliderId} />
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
