import { useSelector } from "react-redux";
import { FaStar } from "react-icons/fa6";

const AniDetails = () => {
  const animeData = useSelector((state) => state.aniDetails.animeData);
  console.log(animeData)

  return (
    <div>
      <div className='flex mt-7 flex-col'>
        <img src={animeData.large_image} alt={`${animeData.title} image`} />
        <h1 className='text-xl text-white'>
          {animeData.title} / {animeData.title_japanese}
        </h1>
      </div>

      {animeData.rank && (
        <div>
          <p>Ranked {animeData.rank}</p>
        </div>
      )}
      {/* This is the box where rating popularity and member is shown */}
      <div className='border-2 flex'>
        <div className='flex items-center'>
          <FaStar className='text-[#F9A50B]' />
          <p>rating: {animeData.score}/10</p>
        </div>
        <p>Popularity #{animeData.popularity}</p>
        <p>
          Members <span className='font-bold'>{animeData.members}</span>
        </p>
      </div>

      {/* Here is the information section */}
      <div>
        <h2>Information</h2>
        <hr className='border-black' />
        <p>Episodes: {animeData.episodes}</p>
        <p>Status: {animeData.status}</p>
        <p>Year: {animeData.year}</p>
        <p>Favorites: {animeData.favorites}</p>
        <p>Rating: {animeData.rating}</p>
      </div>

      {/* Here is the synopsis section */}
      <div className='border-2 border-black h-60 overflow-scroll'>
        <h2>Synopsis</h2>
        <hr className='border-black' />
        <p className='text-sm'>{animeData.synopsis}</p>
      </div>
    </div>
  );
};

export default AniDetails;
