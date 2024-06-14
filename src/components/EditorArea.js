import React, { useState, useEffect, useRef } from 'react';
import { useDroppable, useDraggable, DragOverlay } from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';
import { Resizable } from 'react-resizable';
import { nanoid } from 'nanoid'
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';

const PieceEle = ({ item, id, index, editorActiveId, handleResizeWidth, handleResizeWidthStop }) => {
  const mainRef = useRef(null)
  const [width, setWidth] = useState({width: 160})
  const [left, setLeft] = useState(0)
  let isResizing = useRef(false)
  const { attributes, listeners, setNodeRef: setDraggableRef, isDragging, transform } = useDraggable({
    id: `${id}/${item.code.split('/')[1] ? item.code.split('/')[1] : item.code}`,
    // id: item
  });

  // console.log(transform, 'transform')
  // console.log(CSS.Translate.toString(transform), 'CSS.Translate.toString(transform)123456')
  const style = {
    // transform: transform ? `translate3d(${transform.x + item.x}px, ${transform.y}px, 0)` : `translate3d(${item.x}px, ${item.y}px, 0)`,
    // transform: CSS.Translate.toString(transform),
    height: '100px',
    backgroundColor: 'white',
    width: width.width + 'px',
    position: 'absolute',
    left: isResizing.current ? item.x + left + 'px' : item.x + 'px',
    width: item.width + 'px',
    opacity: isDragging ? 0 : 1,
    zIndex: 999
  };

  const onResize = (event, {node, size, handle}) => {
    console.log(size.width - item.width, 'delta width')
    console.log(size, 'size')
    console.log(event, 'event')
    console.log(node.dataset, 'node.dataset')
    console.log(node.parentNode.dataset.id, 'node')
    console.log(handle, 'handle')
    if (handle === 'w') {
      setLeft(left - (size.width - item.width))
    }
    setWidth({width: size.width });
    handleResizeWidth(node.parentNode.dataset.id, size.width, left - (size.width - item.width))
    console.log(left - (size.width - item.width), 'onResize')
    isResizing.current = true
  };

  const onResizeStop = (event, {node, size, handle}) => {
    if (handle === 'w') {
      handleResizeWidthStop(node.parentNode.dataset.id, left)
      setLeft(0)
    }
    isResizing.current = false
    console.log(left, 'onResizeStop')
  }
  


  return (
    <>
    <Resizable width={item.width} resizeHandles={['e', 'w']} onResize={onResize} onResizeStop={onResizeStop}>
      <div ref={(node) => {
        setDraggableRef(node);
      }}
      data-id={`${item.code}`}
      style={style}
      className='w-[160px] h-[30px] bg-red-100 flex z-50 justify-between' key={index}>
        <div className='bg-green-100 w-[20px] h-[100px] cursor-ew-resize flex-none'>{''}</div>
        <span ref={mainRef} {...listeners} {...attributes} style={{width: item.width + 'px', backgroundColor: 'white'}} className='flex-none overflow-hidden'>{`Dropped: ${item.code} index:${index} x: ${item.x} y: ${item.y}`}</span>
        <div dataSet={`${item.code}`} className='bg-green-100 w-[20px] h-[100px] flex-none cursor-ew-resize'>{''}</div>
      </div>
    </Resizable>
    </>
  )
}

const ListItem = ({ compId, id, index, position, editorActiveId, handleResizeWidth, handleResizeWidthStop }) => {
  // console.log(id, 'id')
  const { setNodeRef: setDroppableRef } = useDroppable({
    id: compId
  });

  return (
    <div
      ref={(node) => {
        setDroppableRef(node);
      }}
      key={index}

      className='bg-slate-200 mt-5 flex h-[100px]'
    >
      {id.map((item, index) => (
        <PieceEle item={item} id={compId} index={index} key={index} position={position} editorActiveId={editorActiveId} handleResizeWidth={handleResizeWidth} handleResizeWidthStop={handleResizeWidthStop} />
      ))}
    </div>
  )
}


const EditorArea = ({ droppedItems, position, editorActiveId, activeId, handleResizeWidth, handleResizeWidthStop }) => {
  // console.log(droppedItems, 'droppedItems')
  const { setNodeRef } = useDroppable({
    id: 'droppable-editor',
  });

  const handleMouseOver = () => {
    // console.log('155466')
  }

  const styleOverlay = {
    // transform: CSS.Translate.toString(transform),
    height: '100px',
    backgroundColor: 'lightblue',
    position: 'relative',
    zIndex: 99
  };

  return (
    <>
    <div
      ref={setNodeRef}
      className='w-full h-screen border-dashed p-2 relative z-40'
    >
      {/* <div onMouseOver={handleMouseOver} className='w-full h-[40px] bg-slate-200'>hello</div> */}
      {/* <div className='absolute h-screen w-full flex items-center justify-center text-8xl text-teal-400'> Drop here </div> */}
      {Object.entries(droppedItems).map(([key, value]) => (
        <ListItem compId={key} id={value} index={key} key={key} position={position} editorActiveId={editorActiveId} handleResizeWidth={handleResizeWidth} handleResizeWidthStop={handleResizeWidthStop} />
      ))}
    </div>
        <DragOverlay>
        {editorActiveId || activeId ? (
            <div style={styleOverlay} className={'flex items-center justify-center cursor-pointer'}>
              Im being dragged!!!!!
            </div>
          ) : null}
    </DragOverlay>
  </>
  );
};

export default EditorArea;
