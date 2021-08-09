import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import StuffCard from "./StuffCard";
import { ModalCreateStuff } from "./Modals/ModalCreateStuff";

import { GetByRole, GetByRoleResponse } from "../../graphql/Stuff/GetStuff";

import "./Stuff.scss";

enum availableRoles {
  Doctor,
  Assistant,
  Receptionist,
}

export const Stuff = ({}) => {
  const [activePerson, setActivePerson] = useState<number>(0);
  const [modalCreateStuff, setModalCreateStuffActive] = React.useState(false);

  const { data, loading } = useQuery<GetByRoleResponse>(GetByRole, {
    variables: { role: availableRoles[activePerson] },
  });

  const toggleModal = () => {
    setModalCreateStuffActive((store) => !store);
  };

  if (loading) {
    return <span>Page is loading...</span>;
  }

  return (
    <div className="stuff">
      <div className="top">
        <button
          onClick={() => setActivePerson(0)}
          className={activePerson === 0 ? "button_active" : "choice"}
        >
          Doctors
        </button>
        <button
          onClick={() => setActivePerson(1)}
          className={activePerson === 1 ? "button_active" : "choice"}
        >
          Assistants
        </button>
        <button
          onClick={() => setActivePerson(2)}
          className={activePerson === 2 ? "button_active" : "choice"}
        >
          Receptionist
        </button>

        <button className="stuff_add" onClick={toggleModal}>
          Add new
        </button>
      </div>

      <div className="info_block">
        {activePerson === 0
          ? data?.getByRole &&
            data.getByRole.map((stuff, index) => (
              <StuffCard
                number={index + 1}
                id={stuff.id}
                name={stuff.name}
                role={"Doctor"}
                email={stuff.email}
                phone={stuff.phone}
                rooms={stuff.rooms}
                key={stuff.id}
              />
            ))
          : null}
        {activePerson === 1
          ? data?.getByRole &&
            data.getByRole.map((stuff, index) => (
              <StuffCard
                number={index + 1}
                id={stuff.id}
                name={stuff.name}
                role={"Assistant"}
                email={stuff.email}
                phone={stuff.phone}
                key={stuff.id}
              />
            ))
          : null}
        {activePerson === 2
          ? data?.getByRole &&
            data.getByRole.map((stuff, index) => (
              <StuffCard
                number={index + 1}
                id={stuff.id}
                name={stuff.name}
                role={"Receptionist"}
                email={stuff.email}
                phone={stuff.phone}
                key={stuff.id}
              />
            ))
          : null}
      </div>
      {modalCreateStuff && (
        <ModalCreateStuff
          active={modalCreateStuff}
          setModalCreateStuffActive={setModalCreateStuffActive}
        ></ModalCreateStuff>
      )}
    </div>
  );
};

export default Stuff;
