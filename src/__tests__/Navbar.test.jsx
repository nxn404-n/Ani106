import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Navbar from "../components/Navbar";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import store from '../app/store';

describe("Navbar Component", () => {
  const renderWithProvider = (component) => {
    return render(
      <MemoryRouter>
        <Provider store={store}>{component}</Provider>
      </MemoryRouter>,
    );
  };

  it("should render correctly", () => {
    renderWithProvider(<Navbar />);

    const headerText = screen.getByText(/Ani106/i);
    expect(headerText).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText(/search anime/i);
    expect(searchInput).toBeInTheDocument();
  });

  it('should dispatch actions and navigate correctly on search submit', () => {
    renderWithProvider(<Navbar />);

    const searchInput = screen.getByPlaceholderText(/search anime/i);
    fireEvent.change(searchInput, { target: { value: "Naruto" } });

    const searchBtn = screen.getByRole("button");
    fireEvent.click(searchBtn);

    // Check if the input is cleared
    expect(searchInput.value).toBe("");

    // Check the state directly
    const state = store.getState().search;
    expect(state.searchShow).toBe(true);
    expect(state.searchFor).toBe("Naruto");
  });

  it('should call handleSubmit when pressed enter key', () => {
    renderWithProvider(<Navbar />);

    const searchInput = screen.getByPlaceholderText(/search anime/i);
    fireEvent.change(searchInput, { target: { value: "Naruto" } });

    const searchBtn = screen.getByRole("button");
    fireEvent.click(searchBtn);

    // Check if the input is cleared
    expect(searchInput.value).toBe("");

    // Check the state directly
    const state = store.getState().search;
    expect(state.searchShow).toBe(true);
    expect(state.searchFor).toBe("Naruto");
  });
});
