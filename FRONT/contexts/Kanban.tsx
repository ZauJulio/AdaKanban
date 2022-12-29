import { ReactNode, useState, createContext } from "react";
import { DragEndEvent } from "@dnd-kit/core";
import { useToast } from "@chakra-ui/react";

import { CardType, LISTAS } from "@/types";
import { useAuth } from "@/hooks";
import { APIClient } from "@/services";

export interface IKanbanContext {
  items: CardType[];
  selectedCard: CardType | null;
  addCard: (props: { titulo: string; conteudo: string }) => void;
  editCard: (id: string) => void;
  updateCard: (cardUpdated: CardType) => void;
  moveCard: (props: { id: string; toList: string }) => void;
  deleteCard: (id: string) => void;
  deselectCard: () => void;
  handleDragEnd: (e: DragEndEvent) => void;
}

export type SelectedCardType = {
  data: CardType;
  index: number;
  parent: string;
};

export const KanbanContext = createContext({} as IKanbanContext);

interface KanbanContextProviderProps {
  children: ReactNode;
}

export function KanbanContextProvider(props: KanbanContextProviderProps) {
  const [cards, setCards] = useState<Array<CardType>>([]);
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);

  const toast = useToast();
  const { token } = useAuth();

  const getCard = (id: string) => cards.find((card) => card.id === id);

  const getCardIndex = (id: string) =>
    cards.findIndex((card) => card.id === id);

  const addCard = (props: { titulo: string; conteudo: string }) => {
    const { titulo, conteudo } = props;

    APIClient({
      method: "POST",
      resource: "cards",
      body: { titulo, conteudo, lista: LISTAS.todo },
      token,
    })
      .then((data) => setCards([...cards, data]))
      .catch((err) => {
        toast({
          title: "Erro ao criar card!",
          description: err.message,
          status: "error",
          position: 'top-right',
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const updateCard = (cardUpdated: CardType) => {
    APIClient({
      method: "PUT",
      resource: `cards/${cardUpdated.id}`,
      body: cardUpdated,
      token,
    })
      .then((data) => {
        const index = getCardIndex(data.id);
        const _cards = [...cards];

        _cards[index] = data;

        setCards(_cards);
        setSelectedCard(null);
      })
      .catch((err) => {
        toast({
          title: "Erro ao atualizar card!",
          description: err.message,
          status: "error",
          position: 'top-right',
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const deleteCard = (id: string) => {
    APIClient({
      method: "DELETE",
      resource: `cards/${id}`,
      token,
    })
      .then((data) => setCards(data))
      .catch((err) => {
        toast({
          title: "Erro ao apagar card!",
          description: err.message,
          status: "error",
          position: 'top-right',
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const moveCard = (props: { id: string; toList: string }) => {
    APIClient({
      method: "PUT",
      resource: `cards/${props.id}`,
      body: {
        ...getCard(props.id),
        lista: props.toList,
      },
      token,
    })
      .then((data) => {
        const index = getCardIndex(data.id);
        const _cards = [...cards];

        _cards[index] = data;

        setCards(_cards);
      })
      .catch((err) => {
        toast({
          title: "Erro ao mover card!",
          description: err.message,
          status: "error",
          position: 'top-right',
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const data = e.active.data.current;

    const container = e.over?.id;
    const parent = data?.parent;

    if (container === parent || container === undefined) return;

    APIClient({
      method: "PUT",
      resource: `cards/${data?.id}`,
      body: {
        ...getCard(data?.id),
        lista: container,
      },
      token,
    })
      .then((data) => {
        const index = getCardIndex(data.id);
        const _cards = [...cards];

        _cards[index] = data;

        setCards(_cards);
      })
      .catch((err) => {
        toast({
          title: "Erro ao mover card!",
          description: err.message,
          status: "error",
          position: 'top-right',
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <KanbanContext.Provider
      value={{
        items: cards,
        selectedCard,
        addCard,
        editCard: (id: string) => setSelectedCard(getCard(id) || null),
        updateCard,
        deleteCard,
        moveCard,
        deselectCard: () => setSelectedCard(null),
        handleDragEnd,
      }}
    >
      {props.children}
    </KanbanContext.Provider>
  );
}
