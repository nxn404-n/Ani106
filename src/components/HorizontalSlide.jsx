// This component is made for making the code DRY and its the horizontal slide of the top anime and seasonal anime section

import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setData, setShowDetails } from "../feature/aniDetailsSlice";

const HorizontalSlide = ({ data, sliderId }) => {
  const dispatch = useDispatch();
  // This functions controll the left and right slide buttons
  const slideLeft = () => {
    const slider = document.getElementById(sliderId);
    slider.scrollLeft -= 250;
  };

  const slideRight = () => {
    const slider = document.getElementById(sliderId);
    slider.scrollLeft += 250;
  };

  // This function helps to send data to show anime details page
  const handleClick = (data) => {
    dispatch(setShowDetails());
    dispatch(setData(data));
  };

  return (
    // This two are the buttons on the horizontal slider
    <div className='relative group'>
      {/* Left Arrow */}
      <MdOutlineKeyboardArrowLeft
        className='slideBtn left-0 rounded-e-full z-10'
        onClick={slideLeft}
      />

      {/* Right Arrow */}
      <MdOutlineKeyboardArrowRight
        className='slideBtn right-0 rounded-s-full z-10'
        onClick={slideRight}
      />

      {/* Horizontal scrolling container */}
      <div
        className='flex items-center overflow-x-auto gap-5 scroll-smooth scroll-container z-0'
        id={sliderId}
      >
        {data.map((anime) => (
          <div
            key={anime.mal_id}
            className='flex-shrink-0 w-48 p-3 bg-gray-800 rounded-lg text-center hover:brightness-90'
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
              className='w-full h-64 object-cover rounded-lg mb-3'
              src={anime.images.webp.image_url}
              alt={anime.title}
            />
            <p className='text-white text-sm truncate'>
              {anime.rank ? `#${anime.rank}` : ""} {anime.title}
            </p>
          </div>
        ))}
      </div>
    </div>
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
    })
  ).isRequired,
  sliderId: PropTypes.string.isRequired,
};

export default HorizontalSlide;
