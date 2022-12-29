import { useState, useEffect } from "react";

import { Flex, Text, Input, Textarea, Button } from "@chakra-ui/react";
import { IoIosAddCircle } from "react-icons/io";
import { GiCancel } from "react-icons/gi";

import { useKanban } from "@/hooks";
import { AiFillCheckCircle } from "react-icons/ai";

export interface NewCardProps {
  addCard: (props: { titulo: string; conteudo: string }) => void;
}

export default function AddCard(props: NewCardProps) {
  const { addCard } = props;

  const { updateCard, selectedCard, deselectCard } = useKanban();

  const [titulo, setTitle] = useState<string>(
    selectedCard ? selectedCard.titulo : ""
  );
  const [conteudo, setContent] = useState<string>(
    selectedCard ? selectedCard.conteudo : ""
  );

  useEffect(() => {
    setTitle(selectedCard ? selectedCard.titulo : "");
    setContent(selectedCard ? selectedCard.conteudo : "");
  }, [selectedCard]);

  const handleAddCard = () => {
    if (titulo !== "" && conteudo !== "") {
      if (selectedCard) {
        updateCard({
          id: selectedCard.id,
          lista: selectedCard.lista,
          titulo,
          conteudo,
        });
      } else {
        addCard({ titulo, conteudo });
      }

      setTitle("");
      setContent("");
    }
  };

  return (
    <Flex w="30%" p="5" alignItems="center" direction="column" gap="1rem">
      <Text flex="1" textAlign="center">
        {selectedCard === null ? "Adicionar Card" : "Editar Card"}
      </Text>

      <Input
        type="text"
        flex="1"
        onChange={(e) => setTitle(e.target.value)}
        value={titulo}
        placeholder="Título"
      />

      <Textarea
        flex="12"
        onChange={(e) => setContent(e.target.value)}
        value={conteudo}
        placeholder="Conteúdo"
      />
      <Flex width="100%" justify={"space-betwen"}>
        {selectedCard && (
          <Button
            flex="1"
            display="flex"
            justifyContent="flex-start"
            alignSelf="flex-end"
            cursor="pointer"
            bgColor="transparent"
            onClick={deselectCard}
            _hover={{ bgColor: "transparent" }}
          >
            <GiCancel size="3rem" color="#F56565" />
          </Button>
        )}

        <Button
          flex="1"
          display="flex"
          justifyContent="flex-end"
          alignSelf="flex-end"
          cursor="pointer"
          bgColor="transparent"
          onClick={handleAddCard}
          _hover={{ bgColor: "transparent" }}
        >
          {selectedCard ? (
            <AiFillCheckCircle size="3rem" color="#48BB78" />
          ) : (
            <IoIosAddCircle size="3rem" color="#256D85" />
          )}
        </Button>
      </Flex>
    </Flex>
  );
}
