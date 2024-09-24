import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
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

  // This useEffect empties the search data everytime the page refresh and it runs setSearchShowFalse which makes searchShow to false and for that the SearchLandingPage doesnt appear
  useEffect(() => {
    dispatch(deleteSearchData());
    dispatch(setSearchShowFalse());
  }, [dispatch]);

  // This function triggers the fetchSearchData function to get the data from the api and it runs setSearchShowTrue so that it shows the SearchLandingPage
  const handleSubmit = () => {
    dispatch(fetchSearchData({ url: apiUrl, value: input }));
    dispatch(setSearchShowTrue());
    // This function sends the value of the input box to the redux state which we're gonna use later to show the "Searching for ''" this header in the SearchLandingPage
    dispatch(setSearchFor(input));
  };

  // When pressed enter in the input form it fires the handle submit funtion
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="flex justify-between gap-4">
      {/* click the main logo to goes back to the homepage*/}
      <a href="/">
        <h1 className="font-anton text-4xl text-white">Ani106</h1>
      </a>

      <Link to={`/search/${input}`}>
        <div className="flex h-full items-center justify-center bg-white">
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
      </Link>
    </div>
  );
};

export default Navbar;
