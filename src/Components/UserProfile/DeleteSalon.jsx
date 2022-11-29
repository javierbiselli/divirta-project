import styles from "./deleteSalon.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteSalon, editSalon } from "../../redux/salons/thunks";
import Modal from "../Shared/Modal/Modal";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import ButtonLoader from "../Shared/Loader/ButtonLoader";

const DeleteSalon = ({ userData }) => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [children, setChildren] = useState("");
  const [closeButton, setCloseButton] = useState("Cerrar");
  const [okButton, setOkButton] = useState(false);
  const [salonId, setSalonId] = useState(null);
  const [salonIdModal, setSalonIdModal] = useState(null);
  const [state, setState] = useState(false);
  const [deleteState, setDeleteState] = useState(false);

  const [loading, setLoading] = useState(false);

  const data = userData.ownSalons.filter((salon) => salon.id !== null);
  const selectedSalon = data.find((salon) => salon._id === salonIdModal);

  const { handleSubmit, register, reset } = useForm({
    mode: "onChange",
  });

  const deleteSalonFromLS = () => {
    const userSalon = data.find((salon) => salonId == salon.id._id);
    const index = data.indexOf(userSalon);
    data.splice(index, 1);
    userData.ownSalons = data;
    window.localStorage.setItem("user", JSON.stringify(userData));
  };

  const editSalonFromLS = (res) => {
    let index = data.indexOf(selectedSalon);
    data.splice(index, 1);
    selectedSalon.id = res;
    data.push(selectedSalon);
    userData.ownSalons = data;
    window.localStorage.setItem("user", JSON.stringify(userData));
    setSalonIdModal(null);
  };

  const handleSalonDelete = () => {
    const confirmar = confirm("Estas seguro de que queres borrar el salon?");
    if (confirmar) {
      setLoading(true);
      try {
        dispatch(deleteSalon(salonId, userData._id)).then((response) => {
          setLoading(false);
          if (!response[0].error && !response[1].error) {
            alert("Salon borrado correctamente");
            setSalonId(null);
            setOpenModal(false);
            deleteSalonFromLS();
          } else {
            alert(`${response.message}`);
            if (response.message == "Este salon no existe") {
              deleteSalonFromLS();
            }
          }
        });
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    } else {
      setSalonId(null);
    }
  };

  const handleSalonEdit = (data) => {
    setLoading(true);
    try {
      dispatch(editSalon(data, selectedSalon.id._id)).then((response) => {
        setLoading(false);
        if (!response.error) {
          console.log("despues", response);
          alert(`${response.data.name} editado con exito`);
          setOpenModal(false);
          editSalonFromLS(response.data);
        } else {
          alert(`${response.message}`);
          if (response.message == "El salon no existe") {
            deleteSalonFromLS();
            setOpenModal(false);
          }
        }
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  if (deleteState) {
    handleSalonDelete();
    setDeleteState(false);
  }

  const handleModal = () => {
    setCloseButton("Cancelar");
    setOkButton(true);
    setOpenModal(true);
    setChildren(
      <section className={styles.deleteSalonSectionModal}>
        <form onSubmit={handleSubmit(handleSalonEdit)} key={selectedSalon._id}>
          <div className={styles.deleteSalonInfo}>
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              name="name"
              defaultValue={selectedSalon.id.name}
              {...register("name")}
            />
          </div>
          <div className={styles.deleteSalonInfo}>
            <label htmlFor="tel">Telefono:</label>
            <input
              type="number"
              name="tel"
              defaultValue={selectedSalon.id.tel}
              {...register("tel")}
            />
          </div>
          <div className={styles.deleteSalonInfo}>
            <label htmlFor="description">Descripcion:</label>
            <input
              type="text"
              name="description"
              defaultValue={selectedSalon.id.description}
              {...register("description")}
            />
          </div>
          <div className={styles.deleteSalonInfo}>
            <label htmlFor="address">Direccion:</label>
            <input
              type="text"
              name="address"
              defaultValue={selectedSalon.id.address}
              {...register("address")}
            />
          </div>
          <div className={styles.deleteSalonInfo}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              defaultValue={selectedSalon.id.email}
              {...register("email")}
            />
          </div>
          <div className={styles.deleteSalonInfo}>
            <b>Redes sociales: </b>
            <div>
              <label htmlFor="facebook">Facebook:</label>{" "}
              <input
                type="text"
                name="facebook"
                defaultValue={selectedSalon.id.facebook}
                {...register("facebook")}
              />
            </div>
            <div>
              <label htmlFor="instagram">Instagram:</label>{" "}
              <input
                type="text"
                name="instagram"
                defaultValue={selectedSalon.id.instagram}
                {...register("instagram")}
              />
            </div>
            <div>
              <label htmlFor="whatsapp">Whatsapp:</label>{" "}
              <input
                type="text"
                name="whatsapp"
                defaultValue={selectedSalon.id.whatsapp}
                {...register("whatsapp")}
              />
            </div>
          </div>
          <input
            type="submit"
            value="Editar"
            className={styles.editSalonButton}
          />
        </form>
      </section>
    );
  };

  if (state) {
    handleModal();
    setState(false);
    reset();
  }

  // const formatDate = (date) => {
  //   const year = date.slice(2, 4);
  //   const month = date.slice(8, 10);
  //   const day = date.slice(5, 7);
  //   return `${day}/${month}/${year}`;
  // };

  return (
    <div className={styles.deleteSalonContainer}>
      {data == "" ? (
        <div className={styles.noSalonsContainer}>
          <div>no tenes ningun salon</div>
          <Link to="/post">Publicar mi salon</Link>
        </div>
      ) : (
        data.map((salons) => (
          <div key={salons._id} className={styles.deleteSalon}>
            <div className={styles.deleteSalonBox}>
              <div>Salon: {salons.id.name}</div>
              <div>Agregado el {salons.addedOn.slice(0, 10)}</div>
            </div>
            <button
              onClick={() => {
                setSalonIdModal(salons._id);
                setState(true);
              }}
            >
              {"\u270E"}
            </button>
            <button
              onClick={() => {
                setSalonId(salons.id._id);
                setDeleteState(true);
              }}
            >
              X
            </button>
          </div>
        ))
      )}
      <ButtonLoader loading={loading} />
      <Modal
        isOpen={openModal}
        closeButton={closeButton}
        okButton={okButton}
        okButtonText="Editar"
        loading={loading}
        handleClose={() => setOpenModal(false)}
      >
        {children}
      </Modal>
    </div>
  );
};

export default DeleteSalon;
