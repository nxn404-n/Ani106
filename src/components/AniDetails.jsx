import { useSelector } from "react-redux";
import { FaStar } from "react-icons/fa6";

const AniDetails = () => {
  const animeData = useSelector((state) => state.aniDetails.animeData);

  return (
    <div>
      <div className="mt-7 flex flex-col">
        <img src={animeData.large_image} alt={`${animeData.title} image`} />
        <h1 className="text-xl text-white pt-2">
          {animeData.title} / {animeData.title_japanese}
        </h1>
      </div>

      <div className="flex flex-col gap-3">
        {animeData.rank && (
          <div className="pt-3">
            <p>Ranked {animeData.rank}</p>
          </div>
        )}
        {/* This is the box where rating popularity and member is shown */}
        <div className="flex gap-3">
          <div className="flex items-center">
            <FaStar className="text-[#F9A50B]" />
            <p>rating: {animeData.score}/10</p>
          </div>
          <p>Popularity #{animeData.popularity}</p>
          <p>
            Members <span className="font-bold">{animeData.members}</span>
          </p>
        </div>

        {/* Here is the information section */}
        <div>
          <h2 className="border-b-2 border-[#FFBADE]">Information</h2>
          <p>Episodes: {animeData.episodes}</p>
          <p>Status: {animeData.status}</p>
          <p>Year: {animeData.year}</p>
          <p>Favorites: {animeData.favorites}</p>
          <p>Rating: {animeData.rating}</p>
        </div>

        {/* Here is the synopsis section */}
        <div className="h-60 overflow-scroll">
          <h2 className="sticky top-0 bg-[#201F31] border-b-2 border-[#FFBADE]">Synopsis</h2>
          <hr className="border-black" />
          <p className="text-sm">{animeData.synopsis}</p>
        </div>
      </div>
    </div>
  );
};

export default AniDetails;
