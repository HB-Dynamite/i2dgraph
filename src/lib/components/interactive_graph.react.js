import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

// Import your existing components
import Interactive_2d_graph_smooth from './interactive_2d_graph_smooth.react';
import Interactive_bar_chart from './interactive_bar_chart.react';

const InteractiveGraph = ({ id, width, height, xLabel, yLabel, data, chartType, smoothingType,smoothingFactor, setProps }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        // This component is a wrapper, so no D3 logic is needed here
    }, [id, width, height, xLabel, yLabel, data, chartType, setProps]);

    // Determine chart type based on prop or data
    let determinedChartType = chartType;
    if (!determinedChartType) {
        // Infer chart type based on data
        const hasStringX = data.some(d => typeof d.x === 'string');
        determinedChartType = hasStringX ? 'categorical' : 'continuous';
    }

    return (
        <div id={id} ref={containerRef}>
            {determinedChartType === 'categorical' ? (
                <Interactive_bar_chart
                    id={`${id}-bar`}
                    width={width}
                    height={height}
                    xLabel={xLabel}
                    yLabel={yLabel}
                    data={data}
                    setProps={setProps}
                />
            ) : (
                <Interactive_2d_graph_smooth
                    id={`${id}-continuous`}
                    width={width}
                    height={height}
                    xLabel={xLabel}
                    yLabel={yLabel}
                    data={data}
                    smoothingType={smoothingType}
                    smoothingFactor={smoothingFactor}
                    setProps={setProps}
                />
            )}
        </div>
    );
};

InteractiveGraph.propTypes = {
    id: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    xLabel: PropTypes.string,
    yLabel: PropTypes.string,
    data: PropTypes.arrayOf(
        PropTypes.shape({
            x: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            y: PropTypes.number.isRequired
        })
    ).isRequired,
    chartType: PropTypes.oneOf(['categorical', 'continuous']), // Optional prop to override
    smoothingType: PropTypes.string,
    smoothingFactor: PropTypes.number,
    setProps: PropTypes.func
};

InteractiveGraph.defaultProps = {
    width: 500,
    height: 500,
    xLabel: "X Axis Label",
    yLabel: "Y Axis Label",
    smoothingType: "bellcurve",
    chartType: null // Let the component infer by default
};

export default InteractiveGraph;
