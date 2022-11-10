import React, { useEffect } from "react";
import styles from "./postSalon.module.css";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { addSalon } from "../../redux/salons/thunks";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { getUsers } from "../../redux/users/thunks";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import ImageSlider from "../Shared/ImageSlider/ImageSlider";

const PostSalon = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [url, setUrl] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const usersList = useSelector((state) => state.users.list);

  const isLogged = () => {
    const user = getAuth();
    if (user.currentUser == null) {
      return false;
    } else {
      return true;
    }
  };
  const getUserData = () => {
    const auth = getAuth();
    if (isLogged()) {
      const user = usersList.find(
        (user) => user.firebaseUid === auth.currentUser.uid
      );
      return user;
    } else {
      return false;
    }
  };

  const userData = getUserData();

  const salonSchema = Joi.object({
    name: Joi.string().required(),
    tel: Joi.number().required(),
    address: Joi.string().required(),
    rate: Joi.number().required(),
    facebook: Joi.string().required(),
    instagram: Joi.string().required(),
    whatsapp: Joi.number().required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    description: Joi.string().required().min(30).max(500),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: joiResolver(salonSchema),
  });

  const storageRef = ref(
    storage,
    `/${userData.name + userData.last_name}/${v4()}`
  );

  const uploadImg = () => {
    uploadBytes(storageRef, image)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => {
            setImageList((prev) => [...prev, url]);
            setUrl((prev) => [...prev, { url }]);
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  if (image) {
    uploadImg();
    setImage(null);
  }

  const handleSalonAdd = (data) => {
    if (userData) {
      try {
        dispatch(addSalon(data, url, userData._id)).then((response) => {
          if (!response.error) {
            alert(`${response.name} agregado con exito`);
            navigate("/");
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className={styles.postSalonContainer}>
      <h2>Publica tu salon</h2>
      <div className={styles.postInputContainerFile}>
        <b>Fotos (hasta 6):</b>
        <input
          type="file"
          name="file"
          accept="image/*"
          className={styles.uploadPhoto}
          disabled={imageList.length > 5 ? "disabled" : ""}
          onChange={(e) => setImage(e.target.files[0])}
        />
        {imageList.length >= 1 ? <ImageSlider slides={imageList} /> : ""}
      </div>
      <form onSubmit={handleSubmit(handleSalonAdd)}>
        <h4>Datos del salon</h4>
        <div className={styles.postInputContainer}>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            {...register("name")}
          />
          {errors.name?.message ? (
            <div className={styles.error}>{errors.name?.message}</div>
          ) : (
            ""
          )}
        </div>
        <div className={styles.postInputContainer}>
          <input
            type="number"
            name="tel"
            placeholder="Telefono"
            {...register("tel")}
          />
          {errors.tel?.message ? (
            <div className={styles.error}>{errors.tel?.message}</div>
          ) : (
            ""
          )}
        </div>
        <div className={styles.postInputContainer}>
          <input
            type="text"
            name="address"
            placeholder="Direccion"
            {...register("address")}
          />
          {errors.address?.message ? (
            <div className={styles.error}>{errors.address?.message}</div>
          ) : (
            ""
          )}
        </div>
        <div className={styles.postInputContainer}>
          <input
            type="text"
            name="rate"
            placeholder="rating (no va a ir mas)"
            {...register("rate")}
          />
          {errors.rate?.message ? (
            <div className={styles.error}>{errors.rate?.message}</div>
          ) : (
            ""
          )}
        </div>
        <h4>Redes sociales del salon</h4>
        <div className={styles.postInputContainer}>
          <input
            type="text"
            name="facebook"
            placeholder="Facebook"
            {...register("facebook")}
          />
          {errors.facebook?.message ? (
            <div className={styles.error}>{errors.facebook?.message}</div>
          ) : (
            ""
          )}
        </div>
        <div className={styles.postInputContainer}>
          <input
            type="text"
            name="instagram"
            placeholder="Instagram"
            {...register("instagram")}
          />
          {errors.instagram?.message ? (
            <div className={styles.error}>{errors.instagram?.message}</div>
          ) : (
            ""
          )}
        </div>
        <div className={styles.postInputContainer}>
          <input
            type="text"
            name="whatsapp"
            placeholder="WhatsApp"
            {...register("whatsapp")}
          />
          {errors.whatsapp?.message ? (
            <div className={styles.error}>{errors.whatsapp?.message}</div>
          ) : (
            ""
          )}
        </div>
        <div className={styles.postInputContainer}>
          <input
            type="text"
            name="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email?.message ? (
            <div className={styles.error}>{errors.email?.message}</div>
          ) : (
            ""
          )}
        </div>
        <h4>Breve descripcion de tu salon</h4>
        <textarea name="description" {...register("description")}></textarea>
        {errors.description?.message ? (
          <div className={styles.error}>{errors.description?.message}</div>
        ) : (
          ""
        )}
        <div className={styles.submit}>
          <input type="submit" onClick={handleSalonAdd} />
        </div>
      </form>
    </div>
  );
};

export default PostSalon;
