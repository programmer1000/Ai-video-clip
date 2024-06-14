import React, { useState, useEffect, useRef } from 'react';
import {DndContext} from '@dnd-kit/core';
import { useDroppable, DragOverlay } from '@dnd-kit/core';
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
  restrictToParentElement
} from '@dnd-kit/modifiers';
import { nanoid } from 'nanoid'
import VideoBlock from '@/components/VideoBlock'
import EditorArea from '@/components/EditorArea'

export const DistanceContext = React.createContext()

const TimeLine = () => {
  const [droppedItems, setDroppedItems] = useState({});
  const [compId, setCompId] = useState([])
  const [activeId, setActiveId] = useState(null);
  const [editorActiveId, setEditorActiveId] = useState(null)
  const [dragEndPosition, setDragEndPosition] = useState({ x: 0, y: 0 });
  const [distance, setDistance] = useState()
  const currentLeft = useRef()

  useEffect(() => {
    let arr = []
    for (let i = 0; i < new Array(5).length; i++) {
      arr.push({ id: nanoid(5)})
    }
    setCompId(arr)
  }, [])

  useEffect(() => {
    // 500 - distance
    
    console.log(distance, 'distance1111')
  }, [distance])

  const handleResizeWidth = (val, width, deltaWidth) => {
    console.log(deltaWidth, 'deltaWidth')
    console.log()
    let droppedItemsTemp = JSON.parse(JSON.stringify(droppedItems))
    Object.values(droppedItemsTemp).forEach(item => {
      item.forEach((subItem, subIndex) => {
        if (subItem.code === val) {
          subItem.width = width
          // subItem.x = subItem.x - deltaWidth
          // console.log(subItem.x, 'subItem.x')    
        }
      })
    })
    currentLeft.current = deltaWidth
    setDroppedItems(droppedItemsTemp)
  }

  const handleResizeWidthStop = (val, left) => {
    let droppedItemsTemp = JSON.parse(JSON.stringify(droppedItems))
    Object.values(droppedItemsTemp).forEach(item => {
      item.forEach((subItem, subIndex) => {
        if (subItem.code === val) {
          subItem.x = subItem.x + left
          // console.log(subItem.x, 'subItem.x')    
        }
      })
    })
    console.log(droppedItemsTemp, 'droppedItemsTemp1111111111111')
    setDroppedItems(droppedItemsTemp)
  }

  const handleDragEnd = (event) => {
    // debugger
    setActiveId(null)
    setEditorActiveId(null)
    console.log(event, 'event')
    // console.log(droppedItems, 'droppedItems')
    const { over, active, delta } = event;

    console.log(delta.x - 500 + distance, 'distance11111111')

    console.log(delta, 'delta11111')

    const newDroppedItems = JSON.parse(JSON.stringify(droppedItems))
    if (over && over.id === 'droppable-editor') { // 从左边容器拖动到右边容器，但是是空白的区域，而不是已经存在的轨道
      console.error('11111111111111111111111111111111111111111111111111111111111')
      if (event.active.id.startsWith('draggable')) {
        if (delta.x - 500 + distance < 0) {
          return false
        }
      }
        const [key, value] = active.id.split('/')
        const ret = droppedItems[key] && droppedItems[key].find(item => item.code === value)
        let id = nanoid(5)
  
        console.log(droppedItems, 'newDroppedItems1111111')
        // debugger
  
        newDroppedItems[id] = []
        let result
        active.id.split('/')[1]
          ? 
        newDroppedItems[id].push({ code: active.id.split('/')[1], x: ret.x + delta.x, y: 0, width: ret.width })
        :
        newDroppedItems[id].push({ code: active.id, x: delta.x - 500 + distance, y: 0, width: 160 })
  
        
        if (!active.id.startsWith('draggable')) {
          const [key, value] = active.id.split('/')
          const index = newDroppedItems[key].findIndex(item => item.code === value)
          newDroppedItems[key].splice(index, 1)
          if (newDroppedItems[key].length === 0) delete newDroppedItems[key]
        }
        let newCompId = JSON.parse(JSON.stringify(compId))
        const i = newCompId.findIndex(item => item.id === active.id.split('@')[1])
        if (i !== -1) {
          newCompId[i]['id'] = nanoid(5)
          setCompId(newCompId)
        }
      // setDroppedItems((items) => [...items, active.id]);
    } else if (over && over.id !== 'droppable-editor' && active.id.startsWith('draggable')){ // 从左边拖入到右边已经存在的轨道
      console.error('222222222222222222222222222222222222222222222222')
      if (event.active.id.startsWith('draggable')) {
        if (delta.x - 500 + distance < 0) {
          return false
        }
      }
      newDroppedItems[over.id].push({ code: active.id, x: delta.x - 500 + distance, y: 0, width: 160 })

      let newCompId = JSON.parse(JSON.stringify(compId))
      const i = newCompId.findIndex(item => item.id === active.id.split('@')[1])
      if (i !== -1) {
        newCompId[i]['id'] = nanoid(5)
        setCompId(newCompId)
      }
    } else if (over && over.id) {  // 已经存在的轨道之间的拖动
      console.error('333333333333333333333333333333333333333333333333')
      console.log(over, 'over')
      console.log(active, 'active')
      console.log(droppedItems, 'droppedItems')
      const [key, value] = active.id.split('/')
      const result = droppedItems[over.id].findIndex(item => item.code === value)
      console.log(result, 'result')
      if (key === over.id) {
        if (result !== -1) {
          console.log('1')
          newDroppedItems[key][result].x = newDroppedItems[key][result].x + delta.x
          newDroppedItems[key][result].y = 0
        }
      } else {
        if (result !== -1) {
          console.log('2')
          newDroppedItems[over.id].push({ code: value, x: delta.x + result.x, y: 0, width: result.width })
        } else {
          console.log('3')
          const index = newDroppedItems[active.id.split('/')[0]].findIndex(item => item.code === active.id.split('/')[1])
          console.log(index, 'index')
          newDroppedItems[over.id].push({ code: value, x: newDroppedItems[key][index].x + delta.x, y: 0, width: newDroppedItems[key][index].width })
        }
  
        const index = newDroppedItems[key].findIndex(item => item.code === value)
        newDroppedItems[key].splice(index, 1)
        if (newDroppedItems[key].length === 0) delete newDroppedItems[key]
      }   
     
      // newDroppedItems[over.id].push(active.id)

    } else {
      console.log(newDroppedItems, 'newDroppedItems')
      // debugger
      const [key, value] = active.id.split('/')
      if (key && value) {
        const index = droppedItems[key].findIndex(item => item.code === value)
        console.log(index, 'index')
        if (index !== -1) {
          if (droppedItems[key][index].x + delta.x < 0) return false
          newDroppedItems[key][index].x = newDroppedItems[key][index].x + delta.x
          newDroppedItems[key][index].y = 0
        }
      }
    }
    // console.log(newDroppedItems, 'newDroppedItems')
    setDroppedItems([])
    setDroppedItems(newDroppedItems)
    setDragEndPosition((prevPosition) => ({
      x: delta.x,
      y: prevPosition.y, // 只考虑水平拖动
    }));

    console.log(newDroppedItems, 'newDroppedItems')
    console.log(over, 'over')
    console.log(active, 'active')
    // console.log(compId, 'compId')
  };
  const handleDragStart = (event) => {
    if (event.active.id.startsWith('draggable')) {
      setActiveId(event.active.id)
    } else {
      setEditorActiveId(event.active.id)
    }
    console.log(event, 'event handleDragStart')
    // (event) => setActiveId(event.active.id)
  }
  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <DistanceContext.Provider value={[distance, setDistance]}>
        <section className='flex'>
          <aside className={'w-[500px] h-screen border-solid border-r-4 flex-none'}>
            <VideoBlock compId={compId} activeId={activeId}/>
          </aside>
          <main className='w-[calc(100%_-_500px)] h-scree'>
            <EditorArea droppedItems={droppedItems} activeId={activeId} editorActiveId={editorActiveId} position={dragEndPosition} handleResizeWidth={handleResizeWidth} handleResizeWidthStop={handleResizeWidthStop} />
          </main>
        </section>
      </DistanceContext.Provider>
    </DndContext>
  )
}

export default TimeLine;
