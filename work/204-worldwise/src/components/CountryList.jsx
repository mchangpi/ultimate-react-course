import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";
import styles from "./CountryList.module.css";

function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  const countries = cities.reduce((arr, city) => {
    const isCountryDuplicate = arr.map((e) => e.country).includes(city.country);
    if (!isCountryDuplicate)
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  console.log(countries);

  return (
    <ul className={styles.countryList}>
      {countries.map((c) => (
        <CountryItem country={c} key={c} />
      ))}
    </ul>
  );
}

export default CountryList;
