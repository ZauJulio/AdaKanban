import { Flex, Text } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";

import KanbanCard from "@/components/Card";

import { CardType } from "@/types";

export interface KanbanLaneProps {
  titulo: string | any;
  items: CardType[];
}

export default function KanbanLane({ titulo, items }: KanbanLaneProps) {
  const { setNodeRef } = useDroppable({
    id: titulo,
  });

  return (
    <Flex flex="3" padding="5" flexDirection="column" minH="10rem">
      <Text fontWeight="bold">{titulo}</Text>

      <Flex
        ref={setNodeRef}
        backgroundColor="gray.200"
        borderRadius="8"
        flex="1"
        padding="2"
        flexDirection="column"
      >
        {items.map(({ titulo, conteudo, id, lista }, key) => (
          <KanbanCard
            key={key}
            id={id}
            lista={lista}
            titulo={titulo}
            conteudo={conteudo}
          />
        ))}
      </Flex>
    </Flex>
  );
}
