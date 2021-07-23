import React, { FC } from "react";
import "./Stuff.scss";
import StuffCard from "./StuffCard";

type StuffProps = {
  activePerson: number | null;
  setActivePerson: (arg: number | null) => void;
};

export const Stuff: FC<StuffProps> = ({ activePerson, setActivePerson }) => {
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
        <button className="stuff_add">Add new</button>
      </div>
      <div className="info_block">
        <StuffCard />
        <StuffCard />
        <StuffCard />
        <StuffCard />
      </div>
    </div>
  );
};

export default Stuff;
