import { useEffect } from "react";
import styles from "./salonFull.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getSalonById } from "../../../redux/salons/thunks";
import Loader from "../Loader/Loader";
import { addCommentToSalon } from "../../../redux/salons/thunks";
// import { deleteCommentFromSalon } from "../../../redux/salons/thunks";
import ButtonLoader from "../../Shared/Loader/ButtonLoader";
import { useState } from "react";
import Input from "../Input/Input";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";

const SalonFull = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const salonId = window.location.href.slice(-24);

  useEffect(() => {
    dispatch(getSalonById(salonId));
    console.log("useeffect salon ejecutado");
  }, []);

  const salon = useSelector((state) => state.salons.salon);
  const isLoading = useSelector((state) => state.salons.isLoading);

  let commenter = window.localStorage.getItem("user");
  commenter = JSON.parse(commenter);

  const commentSchema = Joi.object({
    comment: Joi.string().required().min(15).max(200).messages({
      "string.min": "El comentario debe tener al menos 15 caracteres",
      "string.max": "El comentario debe tener como maximo 200 caracteres",
      "string.empty": "Escribe tu comentario para tu salon",
    }),
    rating: Joi.number().required().min(1).max(10),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: joiResolver(commentSchema),
  });

  const addComment = async (data) => {
    console.log(data);
    setLoading(true);
    const date = new Date().toLocaleString("es-AR");
    const fullSalon = {
      comment: data.comment,
      commenter: commenter._id,
      rating: data.rating,
      date: date,
    };
    const alreadyCommented = salon.comments.find(
      (commenterId) => commenterId.commenter == commenter._id
    );
    if (alreadyCommented) {
      alert("Ya agregaste un comentario");
    } else {
      try {
        const response = await dispatch(addCommentToSalon(salonId, fullSalon));
        console.log("response", response);
        setLoading(false);
        dispatch(getSalonById(salonId));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const checkUserComment = () => {
    if (commenter) {
      const ownComment = salon.comments.find(
        (commentId) => commentId.commenter == commenter._id
      );
      return ownComment;
    } else {
      return false;
    }
  };

  // const deleteComment = async () => {
  //   const comment = checkUserComment();
  //   console.log("comment", comment);
  //   setLoading(true);
  //   try {
  //     const response = await dispatch(
  //       deleteCommentFromSalon(salon._id, comment._id)
  //     );
  //     console.log("response", response);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : !salon.name ? (
        <div className={styles.errorContainer}>
          error 404 este salon no existeeeeeeeeeeeee!!!11!!!1!!!unouno
        </div>
      ) : (
        <>
          <div className={styles.salonFullContainer}>
            <div className={styles.salonCommentContainer}>
              <div>{salon.name}</div>
              <div>Descripcion: {salon.description}</div>
              <div>Direccion: {salon.address}</div>
              <div>Telefono: {salon.tel}</div>
            </div>
            {!checkUserComment() && commenter ? (
              <form
                onSubmit={handleSubmit(addComment)}
                className={styles.commentFormContainer}
              >
                <h4>Contanos tu experiencia con este salon</h4>
                <div className={styles.commentInput}>
                  <textarea name="comment" {...register("comment")}></textarea>
                </div>
                {errors.comment?.message ? (
                  <div className={styles.error}>{errors.comment?.message}</div>
                ) : (
                  ""
                )}
                <div className={styles.ratingInput}>
                  <Input
                    type={"number"}
                    name={"rating"}
                    placeholder={"Puntaje (del 1 al 10)"}
                    register={register}
                    error={errors.rating?.message}
                  />
                </div>
                <div className={styles.submitCommentContainer}>
                  <input type="submit" className={styles.submitComment} />
                </div>
              </form>
            ) : !commenter ? (
              <div>Logueate para dejar un comentario</div>
            ) : (
              ""
            )}
            {checkUserComment() ? (
              <div className={styles.userCommentContainer}>
                <div>tu comentario: {checkUserComment().comment}</div>
                <div>le diste un puntaje de: {checkUserComment().rating}</div>
                <div>
                  a las {checkUserComment().date.slice(10, 16)} del dia{" "}
                  {checkUserComment().date.length == 20
                    ? checkUserComment().date.slice(0, 10)
                    : checkUserComment().date.slice(0, 9)}
                </div>
                {/* <button onClick={deleteComment}>x</button> */}
              </div>
            ) : (
              ""
            )}
            <ButtonLoader loading={loading} />
          </div>
        </>
      )}
    </>
  );
};
export default SalonFull;
