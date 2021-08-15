import { useState, useEffect } from 'react';

import { ResizableBox, ResizableBoxProps } from 'react-resizable';

import './resizable.css';
interface ResizableProps {
  direction: 'horizontal' | 'vertical';
}
const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizeableProps: ResizableBoxProps;

  const [width, setWidth] = useState(window.innerWidth / 1.5);
  useEffect(() => {
    let timer: any;
    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        if (window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75);
        }
      }, 100);
    };

    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);
    };
  }, [width]);
  if (direction === 'horizontal') {
    resizeableProps = {
      className: 'resize-horizontal',
      maxConstraints: [window.innerWidth * 0.75, Infinity],
      minConstraints: [window.innerWidth * 0.2, Infinity],
      height: Infinity,
      width: width,
      resizeHandles: ['e'],
      onResizeStop: (event, data) => {
        setWidth(data.size.width);
      },
    };
  } else {
    resizeableProps = {
      maxConstraints: [Infinity, window.innerHeight * 0.9],
      minConstraints: [Infinity, window.innerHeight * 0.2],
      height: 300,
      width: Infinity,
      resizeHandles: ['s'],
    };
  }
  return <ResizableBox {...resizeableProps}>{children}</ResizableBox>;
};

export default Resizable;
