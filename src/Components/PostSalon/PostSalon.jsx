import styles from "./postSalon.module.css";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { addSalon } from "../../redux/salons/thunks";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";
import ImageSlider from "../Shared/ImageSlider/ImageSlider";
import Modal from "../Shared/Modal/Modal";
import ButtonLoader from "../Shared/Loader/ButtonLoader";
import { AnimatePresence, motion } from "framer-motion";
import Input from "../Shared/Input/Input";
import { getAuth } from "firebase/auth";

const PostSalon = () => {
  const auth = getAuth();

  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [url, setUrl] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [children, setChildren] = useState("");

  const [loading, setLoading] = useState(false);

  const [showSalonData, setShowSalonData] = useState(1);

  const [direction, setDirection] = useState(0);

  const dispatch = useDispatch();

  let userData = window.localStorage.getItem("user");
  userData = JSON.parse(userData);

  const salonSchema = Joi.object({
    name: Joi.string().required().min(3).max(30),
    tel: Joi.number().required().max(99999999999),
    address: Joi.string().required(),
    facebook: Joi.string().required(),
    instagram: Joi.string().required(),
    whatsapp: Joi.number().required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    description: Joi.string().required().min(30).max(500).messages({
      "string.min": "La descripcion debe tener al menos 30 caracteres",
      "string.empty": "Escribe una descripcion para tu salon",
    }),
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

  const variants = {
    initial: (direction) => {
      return {
        x: direction > 0 ? -300 : 300,
        opacity: 0,
      };
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: "ease-in",
    },
    exit: (direction) => {
      return {
        x: direction > 0 ? 300 : -300,
        opacity: 0,
        transition: "ease-in",
      };
    },
  };

  const uploadImg = () => {
    auth
      ? uploadBytes(storageRef, image)
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
          })
      : "";
  };

  if (image) {
    uploadImg();
    setImage(null);
  }

  const pushSalonToLS = (res1, res2) => {
    const index = res2.data.ownSalons.length - 1;
    userData.ownSalons.push({
      id: res1.data,
      addedOn: res2.data.ownSalons[index].addedOn,
      _id: res2.data.ownSalons[index]._id,
    });
    window.localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleSalonAdd = (data) => {
    if (userData) {
      if (
        errors.name ||
        errors.address ||
        errors.description ||
        errors.email ||
        errors.facebook ||
        errors.instagram ||
        errors.tel ||
        errors.whatsapp
      ) {
        alert("Tenes campos en rojo, porfavor verifica que esten correctos");
      } else {
        setLoading(true);
        try {
          dispatch(addSalon(data, url, userData._id)).then((response) => {
            if (!response.error) {
              setLoading(false);
              setOpenModal(true);
              setChildren(`${response[0].data.name} agregado con exito`);
              pushSalonToLS(response[0], response[1]);
            }
          });
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      }
    }
  };

  return (
    <AnimatePresence custom={direction} initial={false}>
      <motion.div
        className={styles.postSalonContainer}
        variants={variants}
        animate="animate"
        initial="initial"
        exit="exit"
        custom={direction}
        key={showSalonData}
      >
        <h2 className={showSalonData == 2 ? styles.postH2Hidden : ""}>
          Publica tu salon
        </h2>
        <div
          className={
            showSalonData == 1
              ? styles.postInputContainerFile
              : styles.postInputContainerFileHidden
          }
        >
          <div className={styles.containerUploadImg}>
            <b>Fotos (hasta 6): </b>
            preferiblemente horizontales
            <input
              type="file"
              name="file"
              accept="image/x-png,image/gif,image/jpeg"
              className={styles.uploadPhoto}
              disabled={imageList.length > 5 ? "disabled" : ""}
              onChange={(e) => setImage(e.target.files[0])}
            />
            {imageList.length >= 1 ? <ImageSlider slides={imageList} /> : ""}
          </div>
        </div>
        <form
          onSubmit={handleSubmit(handleSalonAdd)}
          className={
            showSalonData == 1 ? styles.postFormHidden : styles.postForm
          }
        >
          <div
            className={
              showSalonData == 2
                ? styles.salonDataContainer
                : styles.salonDataContainerHidden
            }
          >
            <h4>Datos del salon</h4>
            <div className={styles.postInputContainer}>
              <Input
                type={"text"}
                name={"name"}
                placeholder={"Nombre (ejemplo: Salon de eventos Divirta)"}
                register={register}
                error={errors.name?.message}
              />
            </div>
            <div className={styles.postInputContainer}>
              <Input
                type={"number"}
                name={"tel"}
                placeholder={"Telefono (con codigo de area, sin 15)"}
                register={register}
                error={errors.tel?.message}
              />
            </div>
            <div className={styles.postInputContainer}>
              <Input
                type={"text"}
                name={"address"}
                placeholder={"Direccion (ejemplo: Avenida Mendoza 1234)"}
                register={register}
                error={errors.address?.message}
              />
            </div>
            <h4 className={styles.h4Space}>Redes sociales del salon</h4>
            <div className={styles.postInputContainer}>
              <Input
                type={"text"}
                name={"facebook"}
                placeholder={"Facebook (ejemplo: @Divirta)"}
                register={register}
                error={errors.facebook?.message}
              />
            </div>
            <div className={styles.postInputContainer}>
              <Input
                type={"text"}
                name={"instagram"}
                placeholder={"Instagram (ejemplo: @Divirta)"}
                register={register}
                error={errors.instagram?.message}
              />
            </div>
            <div className={styles.postInputContainer}>
              <Input
                type={"number"}
                name={"whatsapp"}
                placeholder={"Whatsapp (con codigo de area, sin 15)"}
                register={register}
                error={errors.whatsapp?.message}
              />
            </div>
            <div className={styles.postInputContainer}>
              <Input
                type={"text"}
                name={"email"}
                placeholder={"Email (ejemplo: divirta@gmail.com)"}
                register={register}
                error={errors.email?.message}
              />
            </div>
          </div>

          <div
            className={
              showSalonData == 3
                ? styles.salonDescriptionContainer
                : styles.salonDescriptionContainerHidden
            }
          >
            <h4>Contanos mas acerca de tu salon</h4>
            <textarea
              name="description"
              {...register("description")}
            ></textarea>
            {errors.description?.message ? (
              <div className={styles.error}>{errors.description?.message}</div>
            ) : (
              ""
            )}
            <p>(hasta 500 caracteres)</p>
          </div>
          <div
            className={showSalonData == 3 ? styles.submit : styles.submitHidden}
          >
            <input type="submit" />
          </div>
        </form>
        <div className={styles.postPageButtons}>
          <button
            onClick={() => {
              setShowSalonData(showSalonData - 1);
              setDirection(1);
            }}
            className={showSalonData == 1 ? styles.backButtonHidden : ""}
          >
            Atras
          </button>
          <button
            onClick={() => {
              setShowSalonData(showSalonData + 1);
              setDirection(-1);
            }}
            className={showSalonData == 3 ? styles.nextButtonHidden : ""}
          >
            Siguiente
          </button>
        </div>
        <ButtonLoader loading={loading} />
        <Modal
          isOpen={openModal}
          closeButton="Cerrar"
          handleClose={() => {
            setOpenModal(false);
            navigate("/");
          }}
        >
          {children}
        </Modal>
      </motion.div>
    </AnimatePresence>
  );
};

export default PostSalon;
