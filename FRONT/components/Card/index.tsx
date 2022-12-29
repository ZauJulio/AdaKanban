import { CSS } from "@dnd-kit/utilities";
import { Flex, Text, useToken } from "@chakra-ui/react";
import { useDraggable } from "@dnd-kit/core";

import { AiFillEdit } from "react-icons/ai";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
  BsTrash2Fill,
} from "react-icons/bs";

import MarkdownContainer from "../Markdown";
import ButtonIcon from "../ButtonIcon";
import { useKanban } from "@/hooks";

export interface KanbanCardProps {
  id: string;
  lista: string;
  titulo: string;
  conteudo: string;
}

export default function KanbanCard(props: KanbanCardProps) {
  const { id, lista, titulo, conteudo } = props;

  const [darkT100, cyan100] = useToken("colors", ["darkT.100", "cyan.100"]);

  const { editCard, deleteCard, moveCard } = useKanban();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: { id, titulo, conteudo, lista },
  });

  return (
    <Flex
      justify="center"
      align="center"
      direction="column"
      w="100%"
      transform={CSS.Translate.toString(transform)}
    >
      <Flex
        w="100%"
        padding="3"
        backgroundColor="white"
        justify="center"
        align="center"
        direction="column"
        gap="4px"
        margin="2"
        borderRadius="8"
        border="2px solid gray.500"
        boxShadow={`0px 0px 5px 2px ${darkT100}`}
        {...listeners}
        {...attributes}
        ref={setNodeRef}
      >
        <Flex
          justify="center"
          align="center"
          position="relative"
          w="100%"
          padding="5px 0"
        >
          <Text as="h1" fontWeight={600}>
            {titulo}
          </Text>

          <ButtonIcon
            justifySelf="flex-end"
            size="lg"
            position="absolute"
            right="0.2rem"
            bgColor="transparent"
            color={cyan100}
            padding={0}
            _hover={{ bgColor: "blackAlpha.200" }}
            _focus={{ bgColor: "blackAlpha.200" }}
            onClick={() => editCard(id)}
          >
            <AiFillEdit />
          </ButtonIcon>
        </Flex>

        <Flex border={`1px solid ${darkT100}`} borderRadius="8" width="100%" />

        <MarkdownContainer content={conteudo} />
      </Flex>

      <Flex
        align="center"
        justify="center"
        direction="row"
        padding-top="10px"
        gap="35px"
        w="100%"
        bg="white"
        padding="2"
        borderRadius="8"
        border="2px solid gray.500"
        boxShadow={`0px 0px 5px 2px ${darkT100}`}
      >
        {lista === "ToDo" ? (
          <Flex />
        ) : (
          <ButtonIcon
            color="gray.500"
            onClick={() => {
              if (lista === "ToDo") return;

              let toList;

              if (lista === "Doing") toList = "ToDo";
              if (lista === "Done") toList = "Doing";

              toList && moveCard({ id, toList });
            }}
          >
            <BsFillArrowLeftCircleFill />
          </ButtonIcon>
        )}

        <ButtonIcon
          color="gray.500"
          _hover={{ bgColor: "red.400" }}
          _focus={{ bgColor: "red.400" }}
          onClick={() => {
            deleteCard(id);
          }}
        >
          <BsTrash2Fill />
        </ButtonIcon>

        {lista === "Done" ? (
          <Flex />
        ) : (
          <ButtonIcon
            color="gray.500"
            onClick={() => {
              if (lista === "Done") return;

              let toList;

              if (lista === "Doing") toList = "Done";
              if (lista === "ToDo") toList = "Doing";

              toList && moveCard({ id, toList });
            }}
          >
            <BsFillArrowRightCircleFill />
          </ButtonIcon>
        )}
      </Flex>
    </Flex>
  );
}
