import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";

import { useCities } from "../contexts/CitiesContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  const { currentCity, deleteCityById } = useCities();
  const { cityName, emoji, date, id, position } = city;

  // console.log(position);

  function handleClick(e) {
    e.preventDefault();
    console.log("delete city:", cityName);
    deleteCityById(id);
  }

  /* Return <Link/> to <City /> with params `/app/cities/${id}?${lat}&${lng}` */
  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id && styles["cityItem--active"]
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoij}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
