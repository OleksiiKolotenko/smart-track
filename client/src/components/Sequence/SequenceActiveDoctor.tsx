import SequenceCard from "./SequenceCard";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export const SequenceActiveDoctor = ({ dataRooms, currentDoctor }) => {
  return (
    <DragDropContext>
      <Droppable droppableId="active_sequence">
        {(provided) => (
          <div
            className="active_cards"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {dataRooms?.getRooms &&
              dataRooms.getRooms.map((sequence, index) => {
                return (
                  <Draggable
                    key={sequence.id}
                    draggableId={sequence.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="div"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        {sequence.ownerName === currentDoctor ? (
                          <SequenceCard
                            name={sequence.name}
                            key={`sequence_${index}`}
                            id={sequence.id}
                            ownerId={sequence.ownerId}
                            ownerName={sequence.ownerName}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    )}
                  </Draggable>
                );
              })}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
