export interface DraggableEvent {
  draggableId: string;
  type: string;
  source: {
    index: number;
    droppableId: string;
  };
  reason: string;
  mode: string;
  destination: {
    droppableId: string;
    index: number;
  } | null;
}
