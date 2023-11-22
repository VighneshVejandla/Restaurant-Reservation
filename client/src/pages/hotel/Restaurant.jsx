import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve.jsx";

const Restaurant = () => {
  const location = useLocation()
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModel, setOpenModal] = useState(false);

  const { data, loading, error } = useFetch(`/restaurants/find/${id}`);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { dates, options } = useContext(SearchContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0].endDate, dates[0].startDate);
  // const table = options.table;

console.log(dates);
console.log(days);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };

  const handleClick=() =>{
    console.log('Button clicked!'); 
    if(user){setOpenModal(true);
    }else{
      navigate("/login")
    }
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? ( "loading" 
      ) : (
      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="hotelWrapper">
          <button className="bookNow" onClick={handleClick}>Reserve a table Now!</button>
          <h1 className="hotelTitle">{data.name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{data.address}</span>
          </div>
          <span className="hotelDistance">
            Excellent restaurant – {data.distance}m from center
          </span>
          <span className="hotelPriceHighlight">
            Book a table over {data.cheapestPrice}rs at this restaurant and get a stater for free..
          </span>
          <div className="hotelImages">
            {data.photos?.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photo}
                  alt=""
                  className="restaurantImg"
                />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">{data.title}</h1>
              <p className="hotelDesc">
                {data.desc}
              </p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a 2 tables!</h1>
              <span>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus, eaque.
              </span>
              {/* <h2>
                <b>${days * data.cheapestPrice * options.table }</b> ({days} tables)
                <b>10rs</b> per table tables
              </h2> */}
              <h2>
                  <b>${days * data.cheapestPrice * options.table}</b> ({days}{" "}
                  nights)
                </h2>
              <button onClick={handleClick}>Reserve</button>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div> 
      )}
      {openModel && <Reserve setOpen={setOpenModal} restaurantId={id}/>}
    </div>
  );
};

export default Restaurant;
