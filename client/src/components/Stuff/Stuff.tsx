import React, { FC, useState } from "react";
import { useQuery } from "@apollo/client";
import { GetByRole, GetByRoleResponse } from "../../graphql/Stuff/GetStuff";
import StuffCard from "./StuffCard";
import { ModalStuff } from "./Modals/ModalStuff";
import "./Stuff.scss";

type StuffProps = {
  activePerson: number;
  setActivePerson: (arg: number) => void;
};

const availableRoles = [`Doctor`, `Assistant`, `Receptionist`];

export const Stuff: FC<StuffProps> = ({ activePerson, setActivePerson }) => {
  const { data, loading } = useQuery<GetByRoleResponse>(GetByRole, {
    variables: { role: availableRoles[activePerson] },
  });

  const [modalStuff, setModalStuffActive] = useState(false);
  const toggleModal = () => {
    setModalStuffActive((store) => !store);
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
                role={stuff.role}
                email={stuff.email}
                phone={stuff.phone}
                key={`stuff_${index}`}
              />
            ))
          : ""}
        {activePerson === 1
          ? data?.getByRole &&
            data.getByRole.map((stuff, index) => (
              <StuffCard
                number={index + 1}
                id={stuff.id}
                name={stuff.name}
                role={stuff.role}
                email={stuff.email}
                phone={stuff.phone}
                key={`stuff_${index}`}
              />
            ))
          : ""}
        {activePerson === 2
          ? data?.getByRole &&
            data.getByRole.map((stuff, index) => (
              <StuffCard
                number={index + 1}
                id={stuff.id}
                name={stuff.name}
                role={stuff.role}
                email={stuff.email}
                phone={stuff.phone}
                key={`stuff_${index}`}
              />
            ))
          : ""}
      </div>
      {modalStuff && (
        <ModalStuff
          active={modalStuff}
          setModalStuffActive={setModalStuffActive}
        ></ModalStuff>
      )}
    </div>
  );
};

export default Stuff;
