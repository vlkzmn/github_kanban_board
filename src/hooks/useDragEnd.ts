import { useCallback } from 'react';
import { DraggableEvent } from '../types/DraggableEvent';
import { saveToStorage } from '../utils/storageUtils';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectIssues, update } from '../features/issuesSlice';
import { selectRepoName } from '../features/repoNameSlice';

export function useDragEnd() {
  const issues = useAppSelector(selectIssues);
  const dispatch = useAppDispatch();
  const repoName = useAppSelector(selectRepoName);

  return useCallback(
    (result: DraggableEvent) => {
      const { destination, source, draggableId } = result;

      if (!destination) {
        return;
      }

      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }

      const start = issues.columns[source.droppableId];
      const finish = issues.columns[destination.droppableId];

      if (start === finish) {
        const newTaskIds = [...start.taskIds];
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newColumn = { ...start, taskIds: newTaskIds };

        const newIssues = {
          ...issues,
          columns: { ...issues.columns, [newColumn.id]: newColumn },
        };

        dispatch(update(newIssues));
        saveToStorage(newIssues, repoName);
        return;
      }

      const startTaskIds = [...start.taskIds];
      startTaskIds.splice(source.index, 1);
      const newStart = { ...start, taskIds: startTaskIds };

      const finishTaskIds = [...finish.taskIds];
      finishTaskIds.splice(destination.index, 0, draggableId);
      const finishStart = { ...finish, taskIds: finishTaskIds };

      const newIssues = {
        ...issues,
        columns: {
          ...issues.columns,
          [newStart.id]: newStart,
          [finishStart.id]: finishStart,
        },
      };

      dispatch(update(newIssues));
      saveToStorage(newIssues, repoName);
    },
    [dispatch, issues, repoName],
  );
}
