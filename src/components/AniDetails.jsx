import { useSelector } from "react-redux";
import { FaStar } from "react-icons/fa6";

const AniDetails = () => {
  const animeData = useSelector((state) => state.aniDetails.animeData);

  return (
    <div className="flex flex-col sm:p-6">
      <div className="flex flex-col sm:flex-row gap-3">

      <div>
        <img
          src={animeData.large_image}
          alt={`${animeData.title} image`}
          className="w-fit"
        />
        </div>
        <div className="flex flex-col w-full items-start">

        <h1 className="pt-2 text-xl text-white sm:text-2xl">
          {animeData.title} / {animeData.title_japanese}
        </h1>

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
          <h2 className="border-b-2 border-[#FFBADE] mb-3 sm:text-xl">Information</h2>
          <p>Episodes: {animeData.episodes}</p>
          <p>Status: {animeData.status}</p>
          <p>Year: {animeData.year}</p>
          <p>Favorites: {animeData.favorites}</p>
          <p>Rating: {animeData.rating}</p>
        </div>
      </div>
      </div>
        </div>
      {/* Here is the synopsis section */}
      <div className="h-60 overflow-scroll mt-3 sm:text-xl">
        <h2 className="sticky top-0 border-b-2 border-[#FFBADE] bg-[#201F31] mb-3">
          Synopsis
        </h2>

        <p className="text-sm sm:text-lg">{animeData.synopsis}</p>
      </div>
    </div>
  );
};

export default AniDetails;
