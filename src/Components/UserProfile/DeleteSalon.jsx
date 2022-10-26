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
  const [salonId, setSalonId] = useState(null);

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

  return (
    <div className={styles.deleteSalonContainer}>
      {data == ""
        ? "no tenes ningun salon"
        : data.map((salons) => (
            <div key={salons._id} className={styles.deleteSalon}>
              <div>
                <div>Salon: {salons.id.name}</div>
                <div>Agregado el {salons.addedOn.slice(0, 10)}</div>
              </div>
              <button
                onClick={() => {
                  setSalonId(salons.id._id);
                }}
              >
                X
              </button>
            </div>
          ))}
      <Modal isOpen={openModal} handleClose={() => setOpenModal(false)}>
        {children}
      </Modal>
    </div>
  );
};

export default DeleteSalon;
