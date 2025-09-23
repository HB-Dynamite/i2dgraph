import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';

const Interactive2DGraph = ({ id, width, height, xLabel, yLabel, data, smoothingType, smoothingFactor,setProps, mainDataColor, additionalData, additionalDataColor, addpoints }) => {
    const  [hoveredCircle, setHoveredCircle] = useState(null);  
    const svgRef = useRef(null);

    const margin = { top: 20, right: 20, bottom: 60, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();
        
        // Background
        svg.append('rect')
            .attr('width', width)
            .attr('height', height)
            .attr('fill', "#b3b3b3");

        // Chart
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

        // Compute min, max for x and y
        const xMin = d3.min(data, d => d.x);
        const xMax = d3.max(data, d => d.x);
        const yMin = d3.min(data, d => d.y);
        const yMax = d3.max(data, d => d.y);

        // Compute 10% padding for both axes
        const xRange = xMax - xMin;
        const yRange = Math.max(0.1,yMax - yMin);


        const xPadding = xRange * 0.1;
        const yPadding = yRange * 0.2;



        const xScale = d3.scaleLinear()
            .domain([xMin - xPadding, xMax + xPadding])
            .range([0, innerWidth]);

        const yScale = d3.scaleLinear()
            .domain([yMin - yPadding, yMax + yPadding])
            .range([innerHeight, 0]);

        // Sort a copy of the data for the line
        const sorteddata = [...data].sort((a, b) => a.x - b.x);


        // plot Background
        chart.append('rect')
            .attr('width', innerWidth)
            .attr('height', innerHeight)
            .attr('fill', 'white');

        // Grid lines
        const xAxisGrid = d3.axisBottom(xScale)
            .tickSize(-innerHeight)
            .tickFormat('')
            .ticks(10);

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

        // Line generator
        const lineGenerator = d3.line()
            .x(d => xScale(d.x))
            .y(d => yScale(d.y));

        
        // Add main line
        chart.append('path')
            .datum(sorteddata)
            .attr('fill', 'none')
            .attr('stroke', mainDataColor)
            .attr('stroke-width', 2)
            .attr('d', lineGenerator);

        // Add additional lines
        if (additionalData && additionalData.length > 0) {
            additionalData.forEach((lineData, i) => {
                const lineColor = additionalDataColor[i] || 'black';
                chart.append('path')
                    .datum(lineData)
                    .attr('fill', 'none')
                    .attr('stroke', lineColor)
                    .attr('stroke-width', 2)
                    .attr('d', lineGenerator);
            });
        }

        // Axes
        const xAxis = d3.axisBottom(xScale).ticks(10);
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

        // Listen for mouse wheel events on the chart group
        chart.on('wheel', (event) => {
            event.preventDefault(); // prevent the page from scrolling

            // Decide how much to increment/decrement
            const step = 0.1;

            // If user scrolls down (deltaY > 0), reduce smoothingFactor
            // If user scrolls up (deltaY < 0), increase smoothingFactor
            let newSmoothing = smoothingFactor;
            if (event.deltaY > 0) {
                // Scrolling down
                newSmoothing = smoothingFactor - step;
            } else {
                // Scrolling up
                newSmoothing = smoothingFactor + step;
            }

            // Optional: clamp the range so it doesn't go negative or too large
            newSmoothing = Math.max(0.001, Math.min(5, newSmoothing));

            // Now setProps with the updated smoothing factor
            setProps({ smoothingFactor: newSmoothing });
        });

        // Compute domain width
        const domainWidth = xMax - xMin;

        // define color scale
        const colorScale = d3.scaleLinear()
        .domain([0, 1])
        .range(['blue', 'red']);

        const fractionToApply = (circle, hoveredCircle) => {
            const dx = Math.abs(circle.x - hoveredCircle.x);
            const fractionX = dx / domainWidth;
            let frac;
            switch(smoothingType){
                case 'constant':
                    frac = fractionX > smoothingFactor*0.1 ? 0 : 1; // const smoothing;
                    break
                case 'linear':
                    frac = (Math.max(0, 1-fractionX*2*(1/smoothingFactor)) ); //linear smoothing
                    break
                case 'bellcurve':
                    frac = (Math.max(0, Math.exp(0-(fractionX*3*(1/smoothingFactor))**2) )); // belle curve smoothing
                    break
                }
            // Clamp to [0, 1], just in case
            frac = Math.max(0, frac);
        
            return frac;
        };
        // Draw points
        const addpoints = chart.selectAll('circle')
            .data(addpoints)
            .join('circle')
            .attr('cx', (d) => xScale(d.x))
            .attr('cy', (d) => yScale(d.y))
            .attr('r', 7)
            .attr('fill', '')

        // Draw circles
        const circles = chart.selectAll('circle')
            .data(data)
            .join('circle')
            .attr('cx', (d) => xScale(d.x))
            .attr('cy', (d) => yScale(d.y))
            .attr('r', 4)
        
        if (hoveredCircle) {
            circles.attr('fill', (d) => {
                const frac = fractionToApply(d, hoveredCircle);
                return colorScale(frac);
            });
        } else {
            circles.attr('fill', 'blue');
        }
        circles
            .on('mouseover', function(event, hoveredCircle) {
                // set the hovered circle
                setHoveredCircle(hoveredCircle);

            })
            .on('mouseout', function(event, d) {
                // Clear the hovered circle
                 setHoveredCircle(null);
            })
            .call(
                d3.drag()
                    .on('start', (event, d) => {
                        const [mx, my] = d3.pointer(event, svgRef.current);
                        const localY = my - margin.top;
                        const circleY = yScale(d.y);
                        // Store offset in d temporarily
                        d.dragOffsetY = circleY - localY;
                    })
                    .on('drag', (event, d) => {
                        const [mx, my] = d3.pointer(event, svgRef.current);
                        const localY = my - margin.top;
                        const adjustedY = localY + d.dragOffsetY;
                        const clampedY = Math.min(Math.max(adjustedY, 0), innerHeight);
                        const newY = yScale.invert(clampedY);
                    
                        const updated = [...data];
                        const idx = updated.indexOf(d);
                        if (idx === -1) return;
                    
                        // Store oldY before updating
                        const oldY = updated[idx].y;
                        updated[idx] = { x: updated[idx].x, y: newY };
                    
                        const deltaY = newY - oldY;
                    
                        updated.forEach((p, i) => {
                            if (i !== idx) {
                                const dx = Math.abs(p.x - updated[idx].x);
                                const fractionX = dx / domainWidth;

                                //const fractionToApply = (Math.max(0, 1-fractionX*2*(1/smoothingFactor)) ); //linear smoothing
                                const frac = fractionToApply(p, d);
                                // const fractionToApply = (Math.max(0, Math.exp(0-(fractionX*3*(1/smoothingFactor))**2) ));


                                // Apply fraction of deltaY to neighbors
                                updated[i] = { x: p.x, y: p.y + deltaY * frac};
                            }
                        });
                    
                        setProps({ data: updated });
                    })
            );

    }, [data, width, height, xLabel, yLabel, smoothingType,smoothingFactor,hoveredCircle, setProps]);

    return (
        <div id={id}>
            <svg ref={svgRef} width={width} height={height} />
        </div>
    );
};

Interactive2DGraph.propTypes = {
    id: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    xLabel: PropTypes.string,
    yLabel: PropTypes.string,
    data: PropTypes.arrayOf(
        PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
        })
    ),
    mainDataColor: PropTypes.string, // color of the main dragable data points
    smoothingType: PropTypes.string,
    smoothingFactor: PropTypes.number,
    setProps: PropTypes.func,
    additionalData: PropTypes.arrayOf(
        PropTypes.shape({
            x: PropTypes.number,
            y: PropTypes.number,
        })
    ),
    additionalDataColor: PropTypes.arrayOf(PropTypes.string) // list of colors for addtional lines 

};

Interactive2DGraph.defaultProps = {
    width: 500,
    height: 500,
    xLabel: "X Axis Label",
    yLabel: "Y Axis Label",
    smoothingType: "bellcurve",
    smoothingFactor: 0.1,
    data: [
        { x: 50, y: 50 },
        { x: 150, y: 100 },
        { x: 250, y: 150 },
        { x: 350, y: 200 },
        { x: 450, y: 250 },
        { x: 550, y: 300 },
        { x: -100, y: -100 },
    ],
    mainDataColor: 'blue', // Default color for main data
    additionalData: [], // default is a empty array
    additionalDataColor: [], // default is a empty array
    
};

export default Interactive2DGraph;