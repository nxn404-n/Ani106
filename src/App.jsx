import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import AniDetails from "./components/AniDetails";
import SearchLandingPage from "./components/SearchLandingPage";
import Homepage from "./components/Homepage";
import { setShowDetails } from './feature/aniDetailsSlice'; // Import your actions
import { setSearchShowFalse, setSearchShowTrue } from './feature/searchSlice';

function App() {
  const { showDetails } = useSelector((state) => state.aniDetails);
  const { searchShow } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const location = useLocation();

  // Function to determine which route to display
  const getRoutes = () => {
    if (searchShow) {
      return <Route path="/search/:searchFor" element={<SearchLandingPage />} />;
    } else if (showDetails) {
      return <Route path="/details/:title" element={<AniDetails />} />;
    } else {
      return <Route path="/" element={<Homepage />} />;
    }
  };

  useEffect(() => {
    // Listen for route changes and update Redux state accordingly
    if (location.pathname.startsWith("/details")) {
      // If we are on the details page, show the details
      dispatch(setShowDetails(true));
    } else {
      // If we are not on the details page, hide the details
      dispatch(setShowDetails(false));
    }
  }, [location.pathname, dispatch]);

  useEffect(() => {
    if (location.pathname.startsWith("/search")) {
      dispatch(setSearchShowTrue());
    } else {
      dispatch(setSearchShowFalse());
    }
  }, [location.pathname, dispatch]);

  return (
    <div className="p-3">
      <Navbar />

      <Routes>
        {/* Render dynamic routes based on state */}
        {getRoutes()}

        {/* Catch-all route that redirects to home if no match */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
