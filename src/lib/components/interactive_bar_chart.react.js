import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';

const InteractiveBarGraph = ({ id, width, height, xLabel, yLabel, data,mainDataColor, additionalData, additionalDataColor, setProps }) => {
    const svgRef = useRef(null);

    const margin = { top: 20, right: 20, bottom: 60, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create a list of categorical classes
    const categories = [...new Set(data.map(p => p.x))];

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        // Background
        svg.append('rect')
            .attr('width', width)
            .attr('height', height)
            .attr('fill', "#b3b3b3");

        // Chart group
        const chart = svg.append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        if (!data || data.length === 0) {
            // If no data, just draw an empty background
            chart.append('rect')
                .attr('width', innerWidth)
                .attr('height', innerHeight)
                .attr('fill', 'white');
            return;
        }

        // Compute min, max for y
        // const xMin = d3.min(points, d => d.x);
        // const xMax = d3.max(points, d => d.x);
        const yMin = d3.min(data, d => d.y);
        const yMax = d3.max(data, d => d.y);

        // Compute padding
        //const xRange = xMax - xMin;
        const yRange = Math.max(0.1,yMax - yMin);
        
        //const xPadding = xRange * 0.1;
        const yPadding = yRange * 0.2;

        // const xScale = d3.scaleLinear()
        //     .domain([xMin - xPadding, xMax + xPadding])
        //     .range([0, innerWidth]);
        const xScale = d3.scaleBand()
            .domain(categories)
            .range([0, innerWidth])
            .padding(0.1);

        const yScale = d3.scaleLinear()
            .domain([Math.min(yMin - yPadding,0-yPadding), yMax + yPadding])
            .range([innerHeight, 0]);

        // Plot background
        chart.append('rect')
            .attr('width', innerWidth)
            .attr('height', innerHeight)
            .attr('fill', 'white');

        // Grid lines
        const xAxisGrid = d3.axisBottom(xScale)
            .tickSize(-innerHeight)
            .tickFormat('')
            //.ticks(categories.length);

        const yAxisGrid = d3.axisLeft(yScale)
            .tickSize(-innerWidth)
            .tickFormat('')
            .ticks(10);

        chart.append('g')
            .attr('class', 'x-grid')
            .attr('transform', `translate(0, ${innerHeight})`)
            .call(xAxisGrid)
            .selectAll('line')
            .attr('stroke', '#ddd');

        chart.append('g')
            .attr('class', 'y-grid')
            .call(yAxisGrid)
            .selectAll('line')
            .attr('stroke', '#ddd');

        // Draw vertical lines for addtional data
            if (additionalData && additionalData.length > 0) {
                additionalData.forEach((dataset, i) => {
                    chart.selectAll('.additional-line')
                        .data(dataset)
                        .enter()
                        .append('line')
                        .attr('class', '.additional-line')
                        .attr('x1', d => xScale(d.x) + xScale.bandwidth() / 2)
                        .attr('y1', d => yScale(d.y))
                        .attr('x2', d => xScale(d.x) + xScale.bandwidth() / 2)
                        .attr('y2', yScale(0))
                        .attr('stroke', additionalDataColor[i])
                        .attr('stroke-width', 4);
                });
            };
        // Draw vertical lines from each point down to y=0
        chart.selectAll('.vertical-line')
            .data(data)
            .enter()
            .append('line')
            .attr('class', 'vertical-line')
            .attr('x1', d => xScale(d.x) + xScale.bandwidth() / 2)
            .attr('y1', d => yScale(d.y))
            .attr('x2', d => xScale(d.x) + xScale.bandwidth() / 2)
            .attr('y2', yScale(0))
            .attr('stroke', mainDataColor)
            .attr('stroke-width', 2);


        // Axes
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale).ticks(10);

        chart.append('g')
            .attr('transform', `translate(0, ${innerHeight})`)
            .call(xAxis);

        chart.append('g')
            .call(yAxis);

        // Axis Labels
        chart.append('text')
            .attr('x', innerWidth / 2)
            .attr('y', innerHeight + 40)
            .attr('text-anchor', 'middle')
            .attr('font-size', '14px')
            .text(xLabel);

        chart.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('x', -innerHeight / 2)
            .attr('y', -40)
            .attr('text-anchor', 'middle')
            .attr('font-size', '14px')
            .text(yLabel);

        // Draw circles
        chart.selectAll('circle')
            .data(data)
            .join('circle')
            .attr('cx', (d) => xScale(d.x)+xScale.bandwidth()/2)
            .attr('cy', (d) => yScale(d.y))
            .attr('r', 4)
            .attr('fill', 'blue')
            .on('mouseover', function(event, d) {
                d3.select(this)
                  .transition()
                  .duration(200)
                  .attr('r', 7)
                  .attr('fill', 'red');
            })
            .on('mouseout', function(event, d) {
                d3.select(this)
                  .transition()
                  .duration(200)
                  // Return to original style
                  .attr('r', 4)
                  .attr('fill', 'blue');
            })
            .call(
                d3.drag()
                    .on('start', (event, d) => {
                        // Store offset in the dragged element's datum
                        const [mx, my] = d3.pointer(event, svgRef.current);
                        const localY = my - margin.top;
                        const circleY = yScale(d.y);
                        d.dragOffsetY = circleY - localY;
                    })
                    .on('drag', (event, d) => {
                        const [mx, my] = d3.pointer(event, svgRef.current);
                        const localY = my - margin.top;
                        const adjustedY = localY + d.dragOffsetY;
                        const clampedY = Math.min(Math.max(adjustedY, 0), innerHeight);
                        const newY = yScale.invert(clampedY);

                        // Update the data point
                        const updated = data.map(p => p.x === d.x ? { ...p, y: newY } : p);

                        // Call setProps to update
                        setProps({ data: updated});
                    })
            );

    }, [width, height, xLabel, yLabel, data, setProps, categories]);

    return (
        <div id={id}>
            <svg ref={svgRef} width={width} height={height} />
        </div>
    );
};

InteractiveBarGraph.propTypes = {
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
    ),
    mainDataColor: PropTypes.string,
    additionalData: PropTypes.arrayOf(
        PropTypes.arrayOf(
            PropTypes.shape({
                x: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
                y: PropTypes.number
            })
        )
    ),
    additionalDataColor: PropTypes.arrayOf(PropTypes.string),
    setProps: PropTypes.func
};

InteractiveBarGraph.defaultProps = {
    width: 500,
    height: 500,
    xLabel: "X Axis Label",
    yLabel: "Y Axis Label",
    data: [
        { x: "cat", y: 50 },
        { x: "dog", y: 100 },
        { x: "human", y: 150 },
        { x: "whale", y: 200 },
        { x: "bear", y: 250 },
        { x: "chimp", y: 300 },
        { x: "Tiger", y: -100 },
    ],
    additionalData: [], // default is a empty array
    mainDataColor: "blue", // default main color is blue
};

export default InteractiveBarGraph;
