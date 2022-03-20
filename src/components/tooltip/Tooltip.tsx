import React, { memo } from 'react';
import { createPortal } from 'react-dom';
import { useAppSelector } from '../../features/hooks';
import { selectTooltip } from '../../features/tooltip/tooltipSlice';
import styles from './Tooltip.module.css';
const TooltipModalRoot = document.getElementById('tooltip-modal-root');

const Tooltip = memo(() => {
  const { x, y, text, display } = useAppSelector(selectTooltip);

  return TooltipModalRoot
    ? createPortal(
        <div
          className={styles.tooltip}
          style={{ top: y + 20, left: x + 10, display }}
        >
          {text}
        </div>,
        TooltipModalRoot
      )
    : null;
});

export default Tooltip;
