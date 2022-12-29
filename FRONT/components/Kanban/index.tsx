import { memo } from "react";

import {
  DndContext,
  PointerSensor,
  rectIntersection,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { Flex, Heading } from "@chakra-ui/react";

import KanbanLane from "@/components/Lane";
import NewCard from "@/components/Card/NewCard";
import { useKanban } from "@/hooks";

import { LISTAS } from "@/types";

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
      <Flex direction="column" align="center" justify="center" w="100%">
        {/* Add line on bottom on hover with animate */}
        <Heading as="h1" margin="3rem 0" padding="0.8rem 0">
          My Kanban Board 📋
        </Heading>

        <Flex
          flexDirection={{ base: "column", lg: "row" }}
          min-height="80vh"
          max-height="100%"
          width="100%"
          wrap="wrap"
          overflowX="hidden"
        >
          <NewCard addCard={addCard} />

          <Flex flex="3" height="80vh" wrap="wrap">
            {Object.keys(LISTAS).map((key) => (
              <KanbanLane
                key={key}
                titulo={LISTAS[key]}
                items={items.filter((item) => item.lista === LISTAS[key])}
              />
            ))}
          </Flex>
        </Flex>
      </Flex>
    </DndContext>
  );
}

const KanbanMemo = memo(KanbanBoard);

export default KanbanMemo;
