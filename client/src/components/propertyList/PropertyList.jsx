import useFetch from "../../hooks/useFetch";
import "./propertyList.css";
import image1 from 'D:/Documents/Restaurant reservation/client/src/images/photo_2.jpg'; 
import image2 from 'D:/Documents/Restaurant reservation/client/src/images/catogories/dhaba.avif';
import image3 from 'D:/Documents/Restaurant reservation/client/src/images/catogories/cafe.jpg'
import image4 from 'D:/Documents/Restaurant reservation/client/src/images/catogories/5star.jpg'
import image5 from 'D:/Documents/Restaurant reservation/client/src/images/catogories/outdoor.jpg'


const PropertyList = () => {
  const { data, loading, error } = useFetch("/restaurants/countByType");

  
  const images = [
    image1,image2,image3,image4,image5
  ];
  return (
    <div className="pList">
      {loading ? (
        "loading"
      ) : (
        <>
          {data &&
            images.map((img,i) => (
              <div className="pListItem" key={i}>
                <img
                  src={img}
                  alt=""
                  className="pListImg"
                />
                <div className="pListTitles">
                  <h1>{data[i]?.type}</h1>
                  <h2>{data[i]?.count} {data[i]?.type}</h2>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default PropertyList;
