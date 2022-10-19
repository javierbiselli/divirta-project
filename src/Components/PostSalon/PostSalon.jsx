import React, { useEffect } from "react";
import styles from "./postSalon.module.css";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { addSalon, getSalons } from "../../redux/salons/thunks";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { getUsers } from "../../redux/users/thunks";
import { getAuth } from "firebase/auth";
import Modal from "../Shared/Modal/Modal";

const PostSalon = () => {
  const [images, setImages] = useState(null);
  const [url, setUrl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [children, setChildren] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getSalons());
  }, []);

  // const isLoading = useSelector((state) => state.salons.isLoading);
  const usersList = useSelector((state) => state.users.list);
  // const salonsList = useSelector((state) => state.salons.list);

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

  const handleImages = (e) => {
    if (e.target.files[0]) {
      setImages(e.target.files[0]);
    }
    uploadImg(e.target.files[0]);
  };

  const uploadImg = (img) => {
    const storageRef = ref(storage, v4());
    uploadBytes(storageRef, img)
      .then(() => {
        getDownloadURL(storageRef)
          .then((url) => {
            setUrl(url);
          })
          .catch((error) => {
            alert(error.message, "error getting the image");
          });
        setImages(null);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  console.log(images);

  const handleSalonAdd = (data) => {
    const auth = getAuth();

    const user = usersList.find(
      (user) => user.firebaseUid === auth.currentUser.uid
    );

    try {
      dispatch(addSalon(data, url, user._id));
      setOpenModal(true);
      setChildren("Salon agregado con exito");
    } catch (error) {
      console.log(error);
    }
  };

  // const handleSalonAddToUser = () => {
  //   dispatch(getSalons());
  //   const auth = getAuth();

  //   const user = usersList.find(
  //     (user) => user.firebaseUid === auth.currentUser.uid
  //   );
  //   const salon = salonsList.find((salon) => salon.owner === user._id);
  //   console.log("userid", user);
  //   console.log("salonid", salon);
  //   try {
  //     dispatch(addSalonToUser(user._id, salon._id));
  //     setOpenModal(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className={styles.container}>
      <h2>Publica tu salon</h2>
      <form onSubmit={handleSubmit(handleSalonAdd)}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          {...register("name")}
        />
        <div className={styles.error}>{errors.name?.message}</div>
        <input
          type="number"
          name="tel"
          placeholder="Telefono"
          {...register("tel")}
        />
        <div className={styles.error}>{errors.tel?.message}</div>
        <input
          type="text"
          name="address"
          placeholder="Direccion"
          {...register("address")}
        />
        <div className={styles.error}>{errors.address?.message}</div>
        <input
          type="text"
          name="rate"
          placeholder="rate (no va a ir mas)"
          {...register("rate")}
        />
        <div className={styles.error}>{errors.rate?.message}</div>
        <div>
          <input
            type="file"
            name="file"
            className={styles.uploadPhoto}
            onChange={handleImages}
          />
          <img src={url} alt="" />
        </div>
        <h4>Redes sociales del salon</h4>
        <input
          type="text"
          name="facebook"
          placeholder="Facebook"
          {...register("facebook")}
        />
        <div className={styles.error}>{errors.facebook?.message}</div>
        <input
          type="text"
          name="instagram"
          placeholder="Instagram"
          {...register("instagram")}
        />
        <div className={styles.error}>{errors.instagram?.message}</div>
        <input
          type="text"
          name="whatsapp"
          placeholder="WhatsApp"
          {...register("whatsapp")}
        />
        <div className={styles.error}>{errors.whatsapp?.message}</div>
        <input
          type="text"
          name="email"
          placeholder="Email"
          {...register("email")}
        />
        <div className={styles.error}>{errors.email?.message}</div>
        <h4>Breve descripcion de tu salon</h4>
        <div>
          <textarea name="description" {...register("description")}></textarea>
        </div>
        <div className={styles.error}>{errors.description?.message}</div>
        <input
          type="submit"
          className={styles.submit}
          onClick={handleSalonAdd}
        />
      </form>
      <Modal isOpen={openModal} handleClose={() => setOpenModal(false)}>
        {children}
      </Modal>
    </div>
  );
};

export default PostSalon;
