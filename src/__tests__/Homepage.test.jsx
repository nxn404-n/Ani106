import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Homepage from "../components/Homepage";
import { Provider } from "react-redux";
import store from "../app/store";

vi.mock("../components/NewAnime", () => ({
  default: () => <div>New Anime Section</div>,
}));

vi.mock("../components/TopAni", () => ({
  default: () => <div>Top Anime Section</div>,
}));

vi.mock("../components/SeasonalAni", () => ({
  default: () => <div>Seasonal Anime Section</div>,
}));

vi.mock("../components/UpcomingAni", () => ({
  default: () => <div>Upcoming Anime Section</div>,
}));

describe("Homepage Component", () => {
  const renderWithProvider = (component) => {
    return render(<Provider store={store}>{component}</Provider>);
  };

  it("should render all the sections correctly", () => {
    renderWithProvider(<Homepage />);

    // Check if each section is rendered
    expect(screen.getByText("New Anime Section")).toBeInTheDocument();
    expect(screen.getByText("Top Anime Section")).toBeInTheDocument();
    expect(screen.getByText("Seasonal Anime Section")).toBeInTheDocument();
    expect(screen.getByText("Upcoming Anime Section")).toBeInTheDocument();
  });
});
