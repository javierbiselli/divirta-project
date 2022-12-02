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

  window.localStorage.setItem("salons", JSON.stringify(listSalons));

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
              comments={salons.comments.map((content) => {
                return [
                  content.commenter.name + " " + content.commenter.last_name,
                  content.comment,
                  content.rating,
                ];
              })}
              topComment={salons.comments[0]?.comment}
              ratings={salons.comments.map((comment) => comment.rating)}
            />
          ))}
          <div className={styles.tableContainer}></div>
        </div>
      )}
    </>
  );
};

export default GetSalons;
