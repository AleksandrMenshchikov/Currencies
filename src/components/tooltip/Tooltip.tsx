import React, { memo, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import {
  selectTooltip,
  setCoordinates,
} from '../../features/tooltip/tooltipSlice';
import styles from './Tooltip.module.css';
const TooltipModalRoot = document.getElementById('tooltip-modal-root');

const Tooltip = memo(() => {
  const { x, y, text, opacity } = useAppSelector(selectTooltip);
  const dispatch = useAppDispatch();
  const refElement: any = useRef(null);

  useEffect(() => {
    if (refElement.current) {
      const childHeight =
        refElement.current.offsetTop + refElement.current.offsetHeight;
      const parentHeight = refElement.current.offsetParent.clientHeight;

      if (childHeight > parentHeight) {
        dispatch(setCoordinates({ x: x, y: y - (childHeight - parentHeight) }));
      }
    }
  }, [dispatch, x, y]);

  return TooltipModalRoot
    ? createPortal(
        <div
          ref={refElement}
          className={styles.tooltip}
          style={{ top: y + 20, left: x + 10, opacity }}
        >
          {text}
        </div>,
        TooltipModalRoot
      )
    : null;
});

export default Tooltip;
