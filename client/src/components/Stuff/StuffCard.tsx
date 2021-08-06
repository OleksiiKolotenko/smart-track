import React, { useState } from "react";
import { StuffT } from "../../graphql/Stuff/GetStuff";
import { ModalEditStuff } from "./Modals/ModalEditStuff";
import { ModalDeleteUser } from "./Modals/ModalDeleteUser";
import "./StuffCard.scss";
import edit from "../../img/editPen.svg";
import del from "../../img/trash.svg";

export const StuffCard: React.FC<StuffT> = ({
  number,
  name,
  email,
  phone,
  rooms,
  role,
  id,
}) => {
  const [modalEditStuff, setModalEditStuffActive] = useState(false);
  const [modalDeleteUser, setModalDeleteUserActive] = useState(false);

  const toggleEditModal = () => {
    setModalEditStuffActive((store) => !store);
  };

  const toggleDeleteModal = () => {
    setModalDeleteUserActive((store) => !store);
  };

  return (
    <div className="stuffCard">
      <div className="doctor_id">
        <span className="id">{number}</span>
      </div>
      <span className="name" style={{ marginRight: "80px" }}>
        {name}
      </span>
      <span className="email" style={{ marginRight: "80px" }}>
        {email}
      </span>
      <span className="phone" style={{ marginRight: "120px" }}>
        {`+${phone}`}
      </span>
      {role === "Doctor"
        ? rooms && (
            <div className="colors">
              {rooms.map((color, index) => {
                return (
                  <span
                    className="colors_round"
                    key={index}
                    style={{
                      background: color.statusAlert?.color,
                    }}
                  ></span>
                );
              })}
            </div>
          )
        : ""}

      {role === "Doctor" ? (
        rooms ? (
          rooms.length >= 1 ? (
            <>
              <div className="rooms_list">
                <span>
                  Rooms:
                  {rooms.map((room, index) => (index ? ", " : "") + room.name)}
                </span>
              </div>
            </>
          ) : (
            <span className="rooms_list">Rooms: none</span>
          )
        ) : (
          ""
        )
      ) : (
        ""
      )}

      <div className="buttons">
        <button>
          <img src={edit} alt="editUser" onClick={toggleEditModal} />
        </button>
        <button>
          <img src={del} alt="deleteUser" onClick={toggleDeleteModal} />
        </button>
        {modalEditStuff && (
          <ModalEditStuff
            name={name}
            phone={phone}
            email={email}
            id={id}
            active={modalEditStuff}
            setModalEditStuffActive={setModalEditStuffActive}
          ></ModalEditStuff>
        )}
        {modalDeleteUser && (
          <ModalDeleteUser
            id={id}
            active={modalDeleteUser}
            setModalDeleteUserActive={setModalDeleteUserActive}
          ></ModalDeleteUser>
        )}
      </div>
    </div>
  );
};

export default StuffCard;
