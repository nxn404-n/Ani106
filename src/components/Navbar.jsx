import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import fetchSearchData from "../api/searchApi";
import {
  deleteSearchData,
  setSearchFor,
  setSearchShowFalse,
  setSearchShowTrue,
} from "../feature/searchSlice";

const Navbar = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(deleteSearchData());
    dispatch(setSearchShowFalse());
  }, [dispatch]);

  // This function triggers the search and redirects the user to the search results page
  const handleSubmit = () => {
    dispatch(fetchSearchData({ url: apiUrl, value: input }));
    dispatch(setSearchShowTrue());
    dispatch(setSearchFor(input));
    setInput(""); //Empties the input field
    navigate(`/search/${input}`); // Redirects after the search is handled
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="flex justify-between gap-4">
      {/* Click the main logo to go back to the homepage */}
      <a href="/">
        <h1 className="font-anton text-4xl text-white">Ani106</h1>
      </a>

      <div className="flex h-42 items-center justify-center bg-white">
        <input
          type="text"
          placeholder="Search anime"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="ml-2 w-36 text-left opacity-50 placeholder:text-black focus:opacity-70 focus:outline-none sm:w-full text-black"
          onKeyDown={handleKeyDown}
        />
        <div
          className="flex h-full w-9 items-center justify-center"
          onClick={handleSubmit}
        >
          <IoSearch className="text-2xl text-black" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
