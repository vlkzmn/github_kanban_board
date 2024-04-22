import { Draggable } from '@hello-pangea/dnd';
import { Typography } from 'antd';
import cn from 'classnames';

import { Task } from '../../types/Issue';
import { getDateDifference } from '../../utils/stringUtils';
import './task.css';

interface Props {
  task: Task;
  index: number;
}

export const TaskComponent: React.FC<Props> = ({ task, index }) => {
  const { Paragraph, Text } = Typography;
  const { id, title, admin, comments } = task;
  const createdAt = getDateDifference(task.opened);

  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={cn('task-container', {
            isDragging: snapshot.isDragging,
          })}
          data-testid="task"
        >
          <Paragraph strong>{title}</Paragraph>
          <Paragraph>{`#${id} ${createdAt}`}</Paragraph>
          <Text>{`${admin} | Coments: ${comments}`}</Text>
        </div>
      )}
    </Draggable>
  );
};
