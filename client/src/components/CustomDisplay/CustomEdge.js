import React from 'react';
import { getBezierPath, getMarkerEnd } from 'react-flow-renderer';

export default React.memo(({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  arrowHeadType,
  markerEndId,
}) => {
  const edgePath = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });
  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);

  return (
    <>
      <path id={id}
        className="react-flow__edge-path"
        style={{
          strokeWidth: '5px',
          stroke: '#1a6dba'
        }}
        d={edgePath}
        markerEnd={markerEnd} />
    </>
  );
})