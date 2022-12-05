import styles from "./search.module.css";
import { useState } from "react";
import Salon from "../Shared/Salon/Salon";

const Search = () => {
  let listSalons = window.localStorage.getItem("salons");
  listSalons = JSON.parse(listSalons);

  const [search, setSearch] = useState("");
  const [salons, setSalons] = useState([]);

  const handleSearchBar = (e) => {
    setSearch(e.target.value);
    if (e.target.value.length > 1) {
      filterSalons(e.target.value);
    }
  };

  const filterSalons = (value) => {
    const searchResult = listSalons.filter((salon) => {
      if (
        salon.name
          .toString()
          .toLowerCase()
          .includes(value.toString().toLowerCase()) ||
        salon.address
          .toString()
          .toLowerCase()
          .includes(value.toString().toLowerCase()) ||
        salon.description
          .toString()
          .toLowerCase()
          .includes(value.toString().toLowerCase())
      ) {
        return salon;
      }
    });
    setSalons(searchResult);
  };
  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchBarContainer}>
        <h3>Buscar salones</h3>
        <input
          type="text"
          value={search}
          onChange={handleSearchBar}
          placeholder="buscar..."
        />
      </div>
      <div className={styles.searchResultContainer}>
        {salons.map((salons) => (
          <Salon
            key={salons._id}
            id={salons._id}
            name={salons.name}
            tel={salons.tel}
            salonId={salons._id}
            img={salons.images.map((images) => images.url)}
            address={salons.address}
            description={salons.description}
            email={salons.email}
            facebook={salons.facebook}
            instagram={salons.instagram}
            whatsapp={salons.whatsapp}
            owner={salons.owner.name + " " + salons.owner.last_name}
            comments={salons.comments.filter((comment) => comment.rating)}
            topComment={salons.comments[0]?.comment}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
