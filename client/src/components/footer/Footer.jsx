import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="fLists">
        <ul className="fList">
        </ul>
        <ul className="fList">
          <li className="fListItem">Restaurants </li>
          <li className="fListItem">Dabas </li>
          <li className="fListItem">Star Hotels </li>
          <li className="fListItem">Outdoor</li>
          <li className="fListItem">Cafes</li>
        </ul>
      </div>
      <div className="fText">Copyright © 2023 TableTales</div>
    </div>
  );
};

export default Footer;
