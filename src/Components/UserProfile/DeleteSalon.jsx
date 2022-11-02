import styles from "./deleteSalon.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteSalon } from "../../redux/salons/thunks";
import Modal from "../Shared/Modal/Modal";
import { useNavigate } from "react-router-dom";

const DeleteSalon = ({ userData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [children, setChildren] = useState("");
  const [closeButton, setCloseButton] = useState("Cerrar");
  const [okButton, setOkButton] = useState(false);
  const [salonId, setSalonId] = useState(null);
  const [salonIdModal, setSalonIdModal] = useState(null);

  const data = userData.ownSalons.filter((salon) => salon.id !== null);

  const handleSalonDelete = () => {
    const confirmar = confirm("Estas seguro de que queres borrar el salon?");
    if (confirmar === true) {
      dispatch(deleteSalon(salonId, userData._id)).then(
        () => {
          alert("Salon borrado correctamente");
          setSalonId(null);
          navigate("/");
        },
        () => {
          setOpenModal(true);
          setChildren("ocurrio un error");
        }
      );
    } else {
      setSalonId(null);
    }
  };

  if (salonId) {
    handleSalonDelete();
  }

  const handleModal = () => {
    const selectedSalon = data.find((salon) => salon._id === salonIdModal);
    if (selectedSalon) {
      setCloseButton("Cancelar");
      setOkButton(true);
      setOpenModal(true);
      setChildren(
        <section className={styles.deleteSalonSectionModal}>
          <div className={styles.deleteSalonInfo}>
            <b>Nombre: </b>
            <input type="text" value={selectedSalon.id.name} disabled />
          </div>
          <div className={styles.deleteSalonInfo}>
            <b>Telefono: </b>
            <input type="text" value={selectedSalon.id.tel} disabled />
          </div>
          <div className={styles.deleteSalonInfo}>
            <b>Descripcion: </b>
            <input type="text" value={selectedSalon.id.description} disabled />
          </div>
          <div className={styles.deleteSalonInfo}>
            <b>Direccion: </b>
            <input type="text" value={selectedSalon.id.address} disabled />
          </div>
          <div className={styles.deleteSalonInfo}>
            <b>Email: </b>
            <input type="email" value={selectedSalon.id.email} disabled />
          </div>
          <div className={styles.deleteSalonInfo}>
            <b>Redes sociales: </b>
            <div>
              Facebook:{" "}
              <input type="text" value={selectedSalon.id.facebook} disabled />
            </div>
            <div>
              Instagram:{" "}
              <input type="text" value={selectedSalon.id.instagram} disabled />
            </div>
            <div>
              Whatsapp:{" "}
              <input type="text" value={selectedSalon.id.whatsapp} disabled />
            </div>
          </div>
        </section>
      );
      setSalonIdModal(null);
    } else {
      setSalonIdModal(null);
    }
  };

  if (salonIdModal) {
    handleModal();
  }

  const formatDate = (date) => {
    const year = date.slice(2, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);
    return `${day}/${month}/${year}`;
  };

  return (
    <div className={styles.deleteSalonContainer}>
      {data == ""
        ? "no tenes ningun salon"
        : data.map((salons) => (
            <div key={salons._id} className={styles.deleteSalon}>
              <div className={styles.deleteSalonBox}>
                <div>Salon: {salons.id.name}</div>
                <div>Agregado el {formatDate(salons.addedOn.slice(0, 10))}</div>
              </div>
              <button
                onClick={() => {
                  setSalonIdModal(salons._id);
                }}
              >
                {"\u270E"}
              </button>
              <button
                onClick={() => {
                  setSalonId(salons.id._id);
                }}
              >
                X
              </button>
            </div>
          ))}
      <Modal
        isOpen={openModal}
        closeButton={closeButton}
        okButton={okButton}
        okButtonText="Editar"
        handleClose={() => setOpenModal(false)}
      >
        {children}
      </Modal>
    </div>
  );
};

export default DeleteSalon;
