import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Navbar from "../components/Navbar";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import store from '../app/store';
import { setSearchFor, setSearchShowTrue } from "../feature/searchSlice";

describe("Navbar Component", () => {
  const renderWithProvider = (component) => {
    return render(
      <MemoryRouter>
        <Provider store={store}>{component}</Provider>
      </MemoryRouter>,
    );
  };

  beforeEach(() => {
    // Reset the store's state and any spies before each test
    store.dispatch = vi.fn(); // Mock the dispatch function
  });

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

    // Check if the dispatch was called with the correct action
    expect(store.dispatch).toHaveBeenCalledWith(setSearchShowTrue());
    expect(store.dispatch).toHaveBeenCalledWith(setSearchFor("Naruto"));
  });

  it('should call handleSubmit when pressed enter key', () => {
    renderWithProvider(<Navbar />);
  
    const searchInput = screen.getByPlaceholderText(/search anime/i);
    fireEvent.change(searchInput, { target: { value: "Naruto" } });
  
    // Simulate pressing Enter key
    fireEvent.keyDown(searchInput, { key: "Enter", code: "Enter", charCode: 13 });
  
    // Check if the input is cleared
    expect(searchInput.value).toBe("");
  
    // Check if the dispatch was called with the correct actions
    expect(store.dispatch).toHaveBeenCalledWith(setSearchShowTrue());
    expect(store.dispatch).toHaveBeenCalledWith(setSearchFor("Naruto"));
  });
  
});
