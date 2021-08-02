import SequenceCard from "./SequenceCard";

export const SequenceOtherRooms = ({ dataRooms, currentDoctor }) => {
  return (
    <div className="cards">
      {dataRooms?.getRooms &&
        dataRooms.getRooms.map((sequence, index) =>
          sequence.ownerName !== currentDoctor ? (
            <SequenceCard
              name={sequence.name}
              key={`sequence_${index}`}
              id={sequence.id}
              ownerId={sequence.ownerId}
              ownerName={sequence.ownerName}
            />
          ) : (
            ""
          )
        )}
    </div>
  );
};
