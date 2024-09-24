// This component is made for making the code DRY and its the horizontal slide of the top anime and seasonal anime section
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setData, setShowDetails } from "../feature/aniDetailsSlice";
import "../index.css";
import { Link } from "react-router-dom";

const HorizontalSlide = ({ data, sliderId }) => {
  const dispatch = useDispatch();
  // This functions controll the left and right slide buttons
  const slideLeft = () => {
    const slider = document.getElementById(sliderId);
    slider.scrollLeft -= 400;
  };

  const slideRight = () => {
    const slider = document.getElementById(sliderId);
    slider.scrollLeft += 400;
  };

  // This function helps to send data to show anime details page
  const handleClick = (data) => {
    dispatch(setShowDetails());
    dispatch(setData(data));
  };

  return (
    <>
      {data.length > 0 && (
        <div className="group relative flex">
          <div className="absolute right-0 flex h-full flex-col justify-center gap-2 py-1">
            {/* Left Arrow */}
            <MdOutlineKeyboardArrowLeft
              className="slideBtn"
              onClick={slideLeft}
            />

            {/* Right Arrow */}
            <MdOutlineKeyboardArrowRight
              className="slideBtn"
              onClick={slideRight}
            />
          </div>
          {/* Horizontal scrolling container */}
          <div
            className="scroll-container z-0 flex items-center gap-14 overflow-x-auto scroll-smooth pl-9"
            id={sliderId}
          >
            {data.map((anime) => (
              <Link key={anime.mal_id} to={`/details/${anime.title}`}>
                <div
                  key={anime.mal_id}
                  className="relative flex w-48 flex-shrink-0 hover:brightness-90"
                  onClick={() =>
                    handleClick({
                      // Passing anime data for to show in anime details
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
                  <div className="absolute -left-24 top-[65px] w-40 rotate-90 self-end">
                    <p className="w-full truncate whitespace-nowrap text-sm text-white">
                      <span className="text-xl font-bold">
                        {anime.rank ? `#${anime.rank}` : ""}
                      </span>{" "}
                      {anime.title}
                    </p>
                  </div>
                  <img
                    className="h-64 w-full rounded-lg object-cover"
                    src={anime.images.webp.image_url}
                    alt={anime.title}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

HorizontalSlide.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      mal_id: PropTypes.number.isRequired,
      images: PropTypes.shape({
        webp: PropTypes.shape({
          image_url: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
      title: PropTypes.string.isRequired,
      rank: PropTypes.number,
    }),
  ).isRequired,
  sliderId: PropTypes.string.isRequired,
};

export default HorizontalSlide;
