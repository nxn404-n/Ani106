import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom"; // Import React Router components
import Navbar from "./components/Navbar";
import AniDetails from "./components/AniDetails";
import SearchLandingPage from "./components/SearchLandingPage";
import Homepage from './components/Homepage';

function App() {
  const { showDetails } = useSelector((state) => state.aniDetails);
  const { searchShow } = useSelector((state) => state.search);

  return (
    <div className='p-3'>
      <Navbar />

      <Routes>
        {/* Conditional Routes based on searchShow and showDetails */}
        {searchShow ? (
          <Route path="/search" element={<SearchLandingPage />} />
        ) : showDetails ? (
          <Route path="/details/:title" element={<AniDetails />} />
        ) : (
          <Route path="/" element={<Homepage />} />
        )}

        {/* Catch-all route that redirects to home if no match */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
