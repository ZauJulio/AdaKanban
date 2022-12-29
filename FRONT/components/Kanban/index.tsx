import { memo } from "react";

import {
  DndContext,
  PointerSensor,
  rectIntersection,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Flex } from "@chakra-ui/react";

import { LISTAS } from "@/types";
import { useKanban } from "@/hooks";
import KanbanLane from "@/components/Lane";
import NewCard from "@/components/Card/NewCard";

function KanbanBoard() {
  const { addCard, items, handleDragEnd } = useKanban();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  return (
    <DndContext
      collisionDetection={rectIntersection}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <Flex
        flexDirection="row"
        min-height="100vh"
        max-height="100%"
        overflowX="hidden"
      >
        <NewCard addCard={addCard} />

        <Flex flex="3" height="90vh">
          {Object.keys(LISTAS).map((key) => (
            <KanbanLane
              key={key}
              titulo={LISTAS[key]}
              items={items.filter((item) => item.lista === LISTAS[key])}
            />
          ))}
        </Flex>
      </Flex>
    </DndContext>
  );
}

const KanbanMemo = memo(KanbanBoard);

export default KanbanMemo;
