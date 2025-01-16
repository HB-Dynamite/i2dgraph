// InteractiveGraph.js
import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useResizeObserver } from '../hooks/useResizeObserver';

// Child components (unchanged)
import Interactive_2d_graph_smooth from './interactive_2d_graph_smooth.react';
import Interactive_bar_chart from './interactive_bar_chart.react';

/**
 * This parent component measures its own container size
 * then passes numeric width & height to the child graph.
 */
export default function InteractiveGraph({
  id,
  chartType,
  data,
  xLabel,
  yLabel,
  smoothingType,
  smoothingFactor,
  style,
  setProps
}) {
  // 1) A ref for the container <div> that will have 100% width/height
  const containerRef = useRef(null);

  // 2) useResizeObserver to get numeric width/height of the container
  const { width: measuredWidth, height: measuredHeight } = useResizeObserver(containerRef);

  // 3) Decide which chart to use
  let determinedChartType = chartType;
  if (!determinedChartType) {
    const hasStringX = data.some(d => typeof d.x === 'string');
    determinedChartType = hasStringX ? 'categorical' : 'continuous';
  }

  // 4) Render child only if measuredWidth & measuredHeight are > 0
  // otherwise, you might get 0x0 or weird calculations
  const renderChild = () => {
    if (measuredWidth <= 0 || measuredHeight <= 0) {
      return null; // or a loading spinner
    }

    if (determinedChartType === 'categorical') {
      return (
        <Interactive_bar_chart
          id={`${id}-bar`}
          width={measuredWidth}
          height={measuredHeight}
          xLabel={xLabel}
          yLabel={yLabel}
          data={data}
          setProps={setProps}
        />
      );
    } else {
      return (
        <Interactive_2d_graph_smooth
          id={`${id}-continuous`}
          width={measuredWidth}
          height={measuredHeight}
          xLabel={xLabel}
          yLabel={yLabel}
          data={data}
          smoothingType={smoothingType}
          smoothingFactor={smoothingFactor}
          setProps={setProps}
        />
      );
    }
  };

  return (
    <div
      id={id}
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        ...style
      }}
    >
      {renderChild()}
    </div>
  );
}

InteractiveGraph.propTypes = {
  id: PropTypes.string.isRequired,
  chartType: PropTypes.oneOf(['categorical', 'continuous']),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      y: PropTypes.number.isRequired
    })
  ),
  xLabel: PropTypes.string,
  yLabel: PropTypes.string,
  smoothingType: PropTypes.string,
  smoothingFactor: PropTypes.number,
  style: PropTypes.object,
  setProps: PropTypes.func
};

InteractiveGraph.defaultProps = {
  data: [],
  chartType: null, // let the component infer
  xLabel: 'X Label',
  yLabel: 'Y Label',
  smoothingType: 'bellcurve',
  smoothingFactor: 0.1,
  style: {}
};
