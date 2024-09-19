import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import fetchSearchData from "../api/searchApi";

const Navbar = () => {
  const [input, setInput] = useState("");

  const dispatch = useDispatch();
  const apiUrl = import.meta.env.VITE_API_URL;
  const { data } = useSelector((state) => state.search);

  // This function triggers the fetchSearchData function to get the data from the api
  const handleSubmit = () => {
    dispatch(fetchSearchData({ url: apiUrl, value: input }));
    console.log(data);
    console.log("submitted");
    console.log(input);
  };

  // When pressed enter in the input form it fires the handle submit funtion
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className='flex justify-between gap-4'>
      <h1 className='text-4xl text-white'>Ani106</h1>
      <div className='flex justify-center items-center bg-slate-400'>
        <input
          type='text'
          placeholder='Search anime'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className='text-left placeholder:text-black bg-slate-400 ml-2 focus:outline-none w-36 sm:w-full'
          onKeyDown={handleKeyDown}
        />
        <div
          className='bg-slate-700 h-full flex items-center w-9 justify-center'
          onClick={handleSubmit}
        >
          <IoSearch className='text-2xl' />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
