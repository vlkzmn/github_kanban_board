import { Droppable } from '@hello-pangea/dnd';
import cn from 'classnames';

import { Column, Task } from '../../types/Issue';
import { TaskComponent } from '../Task/Task';
import './column.css';

interface Props {
  column: Column;
  tasks: Task[];
}

export const ColumnComponent: React.FC<Props> = ({ column, tasks }) => {
  return (
    <Droppable droppableId={column.id}>
      {(provided, snapshot) => (
        <div
          className={cn('column-container', {
            'dragging-over': snapshot.isDraggingOver,
          })}
          ref={provided.innerRef}
          {...provided.droppableProps}
          data-testid={column.id}
        >
          {tasks.map((task: Task, index) => (
            <TaskComponent key={task.id} task={task} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
