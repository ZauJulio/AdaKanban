import { IKanbanContext, KanbanContext } from "@/contexts";
import { useContext } from "react";

export function useKanban(): IKanbanContext {
  return useContext(KanbanContext);
}
