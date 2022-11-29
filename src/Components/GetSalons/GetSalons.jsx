import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./getSalons.module.css";
import Salon from "../Shared/Salon/Salon";
import { getSalons } from "../../redux/salons/thunks";
import Loader from "../Shared/Loader/Loader";

const GetSalons = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSalons());
  }, []);

  const isLoading = useSelector((state) => state.salons.isLoading);
  const listSalons = useSelector((state) => state.salons.list);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.containerSalon}>
          <h2>Salones</h2>
          {listSalons.map((salons) => (
            <Salon
              key={salons._id}
              name={salons.name}
              rate={salons.rate}
              tel={salons.tel}
              salonId={salons._id}
              img={salons.images[0].url.map((urls) => urls.url)}
              address={salons.address}
              description={salons.description}
              email={salons.email}
              facebook={salons.facebook}
              instagram={salons.instagram}
              whatsapp={salons.whatsapp}
              owner={salons.owner.name + " " + salons.owner.last_name}
              topComment={"falta hacer la parte de reviews"}
            />
          ))}
          <div className={styles.tableContainer}></div>
        </div>
      )}
    </>
  );
};

export default GetSalons;
