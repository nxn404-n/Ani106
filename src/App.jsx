import "./App.css";
import Navbar from "./components/Navbar";
import SeasonalAni from "./components/SeasonalAni";
import TopAni from "./components/TopAni";

function App() {
  return (
    <div className="bg-[#996DAD] h-full w-full p-3">
      <Navbar />
      <TopAni />
      <SeasonalAni />
    </div>
  );
}

export default App;
