import React, { useRef, useContext } from 'react';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import './styles.css';

import TaskContext from '../TaskList/context';

interface TaskProps {
  task: {
    id: string;
    title: string;
    closed: boolean;
    order: number;
  };
  index: number;
}

const Task: React.FC<TaskProps> = ({ task, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { move, handleStatus } = useContext(TaskContext);
  const [{ isDragging }, dragRef] = useDrag({
    type: 'TASK',
    item: { type: 'TASK', id: task.id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const [, dropRef] = useDrop({
    accept: 'TASK',
    hover(item: { id: string; index: number }, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragged = item;
      const target = task;
      const targetSize = ref.current.getBoundingClientRect();
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;
      const draggedOffset = monitor.getClientOffset();
      const draggedTop = draggedOffset?.y - targetSize.top;

      if (!draggedOffset || dragged.id === target.id) {
        return;
      }

      if (dragged.order < target.order && draggedTop! < targetCenter) {
        return;
      }
      if (dragged.order > target.order && draggedTop! > targetCenter) {
        return;
      }

      move(item.index, index);
      item.index = index;
    }
  });

  dragRef(dropRef(ref));

  return (
    <div ref={ref} className={isDragging ? 'Task Dragging' : 'Task'}>
      <div>{task.title}</div>
      <span onClick={() => handleStatus(task)}>{task.closed ? 'Open' : 'Close'}</span>
    </div>
  );
};

export default Task;
