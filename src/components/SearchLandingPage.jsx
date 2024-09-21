import { useDispatch, useSelector } from "react-redux";
import { setData, setShowDetails } from "../feature/aniDetailsSlice";
import { setSearchShowFalse } from "../feature/searchSlice";

const SearchLandingPage = () => {
  const { searchData, searchFor } = useSelector((state) => state.search);

  const dispatch = useDispatch();

  // This function helps to send data to show anime details page and its running setSearchShowFalse which causes the SearchLandingPage to dissapear
  const handleClick = (data) => {
    dispatch(setShowDetails());
    dispatch(setData(data));
    dispatch(setSearchShowFalse());
  };

  return (
    <div className='flex flex-col gap-4 mt-9'>
      <h2>Search results for &quot;{ searchFor }&quot;</h2>
      {searchData.map((anime) => (
        <div
          key={anime.mal_id}
          className='flex items-start border-2'
          onClick={() =>
            handleClick({
              // Passing anime data for to show anime details
              title: anime.title,
              title_japanese: anime.title_japanese,
              image: anime.images.webp.image_url,
              large_image: anime.images.webp.large_image_url,
              episodes: anime.episodes,
              score: anime.score,
              rank: anime.rank ? anime.rank : null,
              synopsis: anime.synopsis,
              popularity: anime.popularity,
              // for information part
              members: anime.members,
              status: anime.status,
              year: anime.year,
              favorites: anime.favorites,
              rating: anime.rating,
            })
          }
        >
          <img
            src={anime.images.webp.image_url}
            alt={`${anime.title} image`}
            className='w-24 h-30 object-cover'
          />
          <div className='flex flex-col gap-1'>
            <p>{anime.title}</p>
            <p>
              {anime.type}({anime.episodes} eps)
            </p>
            <p>Scored {anime.score}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchLandingPage;
