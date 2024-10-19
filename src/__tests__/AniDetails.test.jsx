import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { describe, it, expect, beforeEach } from "vitest";
import AniDetails from "../components/AniDetails";
import store from "../app/store";
import { setData } from "../feature/aniDetailsSlice"; // Assuming this is your action

// Mock anime data
const mockAnimeData = {
  large_image: "https://example.com/anime-image.jpg",
  title: "Naruto",
  title_japanese: "ナルト",
  rank: 4,
  score: 8.5,
  popularity: 1,
  members: 2000000,
  episodes: 220,
  status: "Finished Airing",
  year: 2002,
  favorites: 50000,
  rating: "PG-13",
  synopsis:
    "Naruto Uzumaki, a mischievous adolescent ninja, struggles as he searches for recognition and dreams of becoming the Hokage.",
};

describe("AniDetails Component", () => {
  const renderWithProvider = (component) => {
    return render(<Provider store={store}>{component}</Provider>);
  };

  beforeEach(() => {
    // Dispatch an action to set the anime data in the store before each test
    store.dispatch(setData(mockAnimeData));
  });

  it("should render the anime details correctly", () => {
    renderWithProvider(<AniDetails />);

    const Header = screen.getByText(`${mockAnimeData.title} / ${mockAnimeData.title_japanese}`);
    expect(Header).toBeInTheDocument();

    const rank = screen.getByText(`Ranked ${mockAnimeData.rank}`);
    expect(rank).toBeInTheDocument();
    
    const score = screen.getByText(`score: ${mockAnimeData.score}/10`);
    expect(score).toBeInTheDocument();

    const popularity = screen.getByText(`Popularity #${mockAnimeData.popularity}`);
    expect(popularity).toBeInTheDocument();

    const membersSpan = screen.getByText(`${mockAnimeData.members}`);
    expect(membersSpan).toBeInTheDocument();
    expect(membersSpan).toHaveClass("font-bold");

    const info = screen.getByText(/Information/i);
    expect(info).toBeInTheDocument();

    const episodes = screen.getByText(`Episodes: ${mockAnimeData.episodes}`);
    expect(episodes).toBeInTheDocument();

    const status = screen.getByText(`Status: ${mockAnimeData.status}`);
    expect(status).toBeInTheDocument();

    const year = screen.getByText(`Year: ${mockAnimeData.year}`);
    expect(year).toBeInTheDocument();

    const favorites = screen.getByText(`Favorites: ${mockAnimeData.favorites}`);
    expect(favorites).toBeInTheDocument();

    const rating = screen.getByText(`Rating: ${mockAnimeData.rating}`);
    expect(rating).toBeInTheDocument();

    const synopsis = screen.getByText(/Synopsis/i);
    expect(synopsis).toBeInTheDocument();

    const synopsisData = screen.getByText(mockAnimeData.synopsis);
    expect(synopsisData).toBeInTheDocument();
  });
});
