import { useDispatch, useSelector } from "react-redux";
import { setData, setShowDetails } from "../feature/aniDetailsSlice";
import { setSearchShowFalse } from "../feature/searchSlice";
import { Link } from 'react-router-dom';

const SearchLandingPage = () => {
  const { searchData, searchFor } = useSelector((state) => state.search);

  const dispatch = useDispatch();

  // This function helps to send data to show anime details page and hide the SearchLandingPage
  const handleClick = (data) => {
    dispatch(setShowDetails());
    dispatch(setData(data));
    dispatch(setSearchShowFalse());
  };

  return (
    <div className="mt-9 flex flex-col gap-4">
      <h2>Search results for &quot;{searchFor}&quot;</h2>
      {searchData.map((anime) => (
        <Link 
          key={anime.mal_id} 
          to={`/details/${anime.title}`} 
          onClick={() => handleClick({
            // Passing anime data to show details page
            title: anime.title,
            title_japanese: anime.title_japanese,
            image: anime.images.webp.image_url,
            large_image: anime.images.webp.large_image_url,
            episodes: anime.episodes,
            score: anime.score,
            rank: anime.rank ? anime.rank : null,
            synopsis: anime.synopsis,
            popularity: anime.popularity,
            members: anime.members,
            status: anime.status,
            year: anime.year,
            favorites: anime.favorites,
            rating: anime.rating,
          })}
        >
          <div className="flex items-start gap-3">
            <img
              src={anime.images.webp.image_url}
              alt={`${anime.title} image`}
              className="h-30 w-24 object-cover"
            />
            <div className="flex flex-col gap-1">
              <p className="text-lg">{anime.title}</p>
              <p>
                {anime.type}({anime.episodes} eps)
              </p>
              <p>Scored {anime.score}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SearchLandingPage;
