'use client';

import { useState, useCallback } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableWidget } from './SortableWidget';
import { WidgetRenderer } from './WidgetRenderer';
import type { Widget } from '@/types';

interface WidgetContainerProps {
  initialWidgets: Widget[];
  onReorder?: (widgets: Widget[]) => void;
  className?: string;
}

export function WidgetContainer({
  initialWidgets,
  onReorder,
  className = '',
}: WidgetContainerProps) {
  const [widgets, setWidgets] = useState<Widget[]>(initialWidgets);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveId(null);

      if (over && active.id !== over.id) {
        setWidgets((items) => {
          const oldIndex = items.findIndex((item) => item.id === active.id);
          const newIndex = items.findIndex((item) => item.id === over.id);

          const newItems = arrayMove(items, oldIndex, newIndex).map((item, index) => ({
            ...item,
            position: index,
          }));

          // Notifier le parent du nouveau ordre
          onReorder?.(newItems);

          return newItems;
        });
      }
    },
    [onReorder]
  );

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);

  const activeWidget = activeId ? widgets.find((w) => w.id === activeId) : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={widgets.map((w) => w.id)} strategy={rectSortingStrategy}>
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}
        >
          {widgets
            .filter((widget) => widget.isVisible)
            .map((widget) => (
              <SortableWidget key={widget.id} widget={widget} />
            ))}
        </div>
      </SortableContext>

      <DragOverlay>
        {activeWidget ? (
          <div className="opacity-80 shadow-2xl">
            <WidgetRenderer widget={activeWidget} isDragging />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default WidgetContainer;
