import { useState } from "react";
import { IoSearch } from "react-icons/io5";

const Navbar = () => {
  const [input, setInput] = useState("");
  return (
    <div className='flex justify-between'>
      <h1 className="text-5xl text-white">Ani106</h1>
      <div className="flex justify-center items-center bg-slate-400">
        <IoSearch />
        <input
          type='text'
          placeholder='Search anime'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className='text-center placeholder:text-black bg-slate-400'
        />
      </div>
    </div>
  );
};

export default Navbar;
