import useFetch from "../../hooks/useFetch";
import "./featured.css";
import img from "D:/Documents/Restaurant reservation/client/src/images/cities/vij.jpg";
import img2 from "D:/Documents/Restaurant reservation/client/src/images/cities/hydrabad.jpg";
import img3 from "D:/Documents/Restaurant reservation/client/src/images/cities/mangalagiri.jpg";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "/restaurants/countByCity?cities=vijayawada,mangalagiri,hydrabad"
  );
    console.log(data)
  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img
              src={img}
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Vijayawada</h1>
              <h2>{data[0]} Restaurents</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src={img2}
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Hydrabad</h1>
              <h2>{data[1]} Restaurents</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src={img3}
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Managalagiri</h1>
              <h2>{data[2]} Restaurents</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
