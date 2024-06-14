import {useDraggable, DragOverlay} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';
import { useRef, useEffect, useContext } from 'react'
import { DistanceContext } from '../pages/index'

const DraggableItem = ({ id, dragContainer }) => {
  const [distance, setDistance] = useContext(DistanceContext)
  const dragContainerrrr = useRef()
  const { attributes, listeners, setNodeRef, isDragging, transform } = useDraggable({
    id,
  });
  useEffect(() => {
    setDistance(dragContainerrrr.current.offsetLeft)
  }, [transform, setDistance])
  // console.log(dragContainer, 'dragContainer')
  // console.log(transform, 'transform1234')
  const styler = {
    // transform: CSS.Translate.toString(transform),
    height: '100px',
    backgroundColor: 'white',
    position: 'relative',
    zIndex: 99,
    opacity: 1
  };
  return (
    <div ref={dragContainerrrr}>
      <div
        ref={setNodeRef}
        style={styler}
        {...listeners}
        {...attributes}
        className='w-[160px] h-[100px] border-2 mt-5 flex justify-center items-center'
      >
        {` ${id}`}
      </div>
    </div>
  );
};

const VideoBlock = ({ compId, activeId }) => {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: 'unique-id',
  });
  const dragContainer = useRef()
  // const style = {
  //   transform: CSS.Translate.toString(transform),
  // };
  const style = {
    // transform: CSS.Translate.toString(transform),
    height: '100px',
    backgroundColor: 'lightblue',
    position: 'relative',
    zIndex: 99
  };
  return (
    <>
      <div ref={dragContainer} className='flex flex-wrap justify-between w-[360px] mx-auto'>
        {compId.map(item => (
          <DraggableItem id={`draggable@${item.id}`} key={item.id} dragContainer={dragContainer} />
        ))}
      </div>
      {/* <DragOverlay>
        {activeId ? (
            <div style={style} className={'flex items-center justify-center cursor-pointer'}>
              I'm being dragged! 
            </div>
          ) : null}
      </DragOverlay> */}
    </>
  )
}
export default VideoBlock