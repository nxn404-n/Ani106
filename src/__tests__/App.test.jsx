import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "../App";
import configureStore from "redux-mock-store";
const mockStore = configureStore([]);

describe("App component", () => {
  let store;
  let mockAniData = [{
    id: 1,
    title: 'Attack on Titan',
    images: { webp: { image_url: 'https://example.com/aot.webp' } },
  },
  {
    id: 2,
    title: 'My Hero Academia',
    images: { webp: { image_url: 'https://example.com/mha.webp' } },
  }];

  beforeEach(() => {
    store = mockStore({
      aniDetails: { showDetails: false },
      search: { searchShow: false },
      newAnime: { newAnimeData: mockAniData },
      topAni: { topAniData: mockAniData },
      seasonalAni: { seasonalAniData: mockAniData },
      upcomingAni: { upcomingAniData: mockAniData },
    });

    // Mock the dispatch function
    store.dispatch = vi.fn();
  });

  it("renders correctly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Ani106/i)).toBeInTheDocument();

  });
});
