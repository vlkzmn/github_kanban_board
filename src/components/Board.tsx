import { useEffect, useMemo } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import { Alert, Flex, Skeleton, Typography } from 'antd';
import { skipToken } from '@reduxjs/toolkit/query';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useDragEnd } from '../hooks/useDragEnd';
import { selectIssues, update } from '../features/issuesSlice';
import { useGetIssuesQuery } from '../features/repoDataApi';
import { DataIssues, NormalizedIssues } from '../types/Issue';
import { ColumnComponent } from './Column/Column';

export const Board = () => {
  const { repoName, errorLoadingData } = useAppSelector(
    (state) => state.repoName,
  );
  const savedIssues = localStorage.getItem(repoName);
  const { data, error, isFetching } = useGetIssuesQuery(
    !savedIssues ? repoName : skipToken,
  );
  const issues = useAppSelector(selectIssues);
  const dispatch = useAppDispatch();
  const { Title } = Typography;

  useEffect(() => {
    if (savedIssues) {
      try {
        const savedIssuesData = JSON.parse(savedIssues) as DataIssues;
        dispatch(update(savedIssuesData));
      } catch (error) {
        localStorage.removeItem(repoName);
      }
    } else {
      if (data) {
        dispatch(update(data));
      }
    }
  }, [dispatch, data, savedIssues, repoName]);

  const onDragEnd = useDragEnd();

  const normalizedIssuesData = useMemo(() => {
    return issues.columnOrder.map((columnId: string) => ({
      columnId,
      column: issues.columns[columnId],
      tasks: issues.columns[columnId].taskIds.map(
        (taskId: string) => issues.tasks[taskId],
      ),
    }));
  }, [issues]) as NormalizedIssues[];

  return (
    <>
      {isFetching && (
        <Flex gap={'20px'} data-testid="board-skeleton">
          <Skeleton active paragraph={{ rows: 20 }} />
          <Skeleton active paragraph={{ rows: 20 }} />
          <Skeleton active paragraph={{ rows: 20 }} />
        </Flex>
      )}

      {!isFetching &&
        !error &&
        (Object.keys(issues.tasks).length > 0 ? (
          <>
            <Flex justify="space-around">
              {Object.values(issues.columns).map((column) => (
                <Title key={column.id} level={4}>
                  {column.title}
                </Title>
              ))}
            </Flex>

            <DragDropContext onDragEnd={onDragEnd}>
              <Flex justify="space-between" data-testid="board">
                {normalizedIssuesData.map(({ columnId, column, tasks }) => (
                  <ColumnComponent
                    key={columnId}
                    column={column}
                    tasks={tasks}
                  />
                ))}
              </Flex>
            </DragDropContext>
          </>
        ) : (
          <Alert
            message="Not found"
            description="No issues for this repo."
            type="info"
            showIcon
          />
        ))}

      {error && !errorLoadingData && (
        <Alert
          message="Ooops!"
          description="Error loading repository issues."
          type="error"
          showIcon
        />
      )}
    </>
  );
};
