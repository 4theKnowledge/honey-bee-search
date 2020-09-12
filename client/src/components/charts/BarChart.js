// BarChart.js
import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react';
//https://www.pluralsight.com/guides/drawing-charts-in-react-with-d3


function BarChart({ width, height, data }){
    const ref = useRef();

    useEffect(() => {
        const svg = d3.select(ref.current)
            .attr("width", width)
            .attr("height", height)
            .style("border", "1px solid black")
    }, []);

    useEffect(() => {
        draw();
    }, [data]);

    const draw = () => {
        
        const svg = d3.select(ref.current);
        var selection = svg.selectAll("rect").data(data);
        var yScale = d3.scaleLinear()
                            .domain([0, d3.max(data)])
                            .range([0, height-100]);
        
        selection
            .transition().duration(300)
                .attr("height", (d) => yScale(d))
                .attr("y", (d) => height - yScale(d))

        selection
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * 45)
            .attr("y", (d) => height)
            .attr("width", 40)
            .attr("height", 0)
            .attr("fill", "orange")
            .transition().duration(300)
                .attr("height", (d) => yScale(d))
                .attr("y", (d) => height - yScale(d))
            .on("mouseover", showTooltip)
            .on("mousemove", moveTooltip)
            .on("mouseleave", hideTooltip)
        
        selection
            .exit()
            .transition().duration(300)
                .attr("y", (d) => height)
                .attr("height", 0)
            .remove()
    }

    // // Add a tooltip div. Here I define the general feature of the tooltip: stuff that do not depend on the data point.
    // // Its opacity is set to 0: we don't see it by default.
    // var tooltip = d3.select(ref.current)
    //                 .append("div")
    //                 .style("opacity", 0)
    //                 .attr("class", "tooltip")
    //                 .style("background-color", "black")
    //                 .style("color", "white")
    //                 .style("border-radius", "5px")
    //                 .style("padding", "10px")

    // // A function that change this tooltip when the user hover a point.
    // // Its opacity is set to 1: we can now see it. Plus it set the text and position of tooltip depending on the datapoint (d)
    // var showTooltip = function(d) {
    //     tooltip
    //     .transition()
    //     .duration(100)
    //     .style("opacity", 1)
    //     tooltip
    //     .html("Range: " + d.x0 + " - " + d.x1)
    //     .style("left", (d3.mouse(this)[0]+20) + "px")
    //     .style("top", (d3.mouse(this)[1]) + "px")
    // }
    
    // var moveTooltip = function(d) {
    //     tooltip
    //     .style("left", (d3.mouse(this)[0]+20) + "px")
    //     .style("top", (d3.mouse(this)[1]) + "px")
    //   }
    // // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
    // var hideTooltip = function(d) {
    //     tooltip
    //       .transition()
    //       .duration(100)
    //       .style("opacity", 0)
    // }

    return (
        <div className="chart">
            <svg ref={ref}>
            </svg>
        </div>
        
    )

}

export default BarChart;