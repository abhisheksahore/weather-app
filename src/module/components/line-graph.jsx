import React, { useEffect, useLayoutEffect, useRef } from 'react';
import * as d3 from "d3";
import _ from "lodash";

const LineGraph = (props) => {

    const svgRef = useRef(null);
    const svgParentRef = useRef(null);
    useLayoutEffect(() => {
        const margins = {
            top: 25,
            right: 25,
            bottom: 25,
            left: 25,
        };
        const width = svgParentRef.current.offsetWidth - margins.right - margins.left;
        const height = 200 - margins.top - margins.bottom;

        const x = d3.scaleTime().range([0, width]);
        const y = d3.scaleLinear().range([height, 0]);


        const svg = d3
            .select(svgRef.current)
            .attr("width", width + margins.right + margins.left)
            .attr("height", height + margins.top + margins.bottom)
            .attr("color", "white")
            .append("g")
            .attr("transform", `translate(${margins.left},${margins.top})`);
        const d = JSON.parse(JSON.stringify(props.data));
        d.unshift([d[0][0], 0]);
        d.push([d[d.length - 1][0], 0]);
        const responseData = d.map((d) => {
            return {
                epoch: new Date(_.get(d, 0) * 1000),
                value: _.get(d, 1),
            };
        });

        x.domain(d3.extent(responseData, (d) => d.epoch));
        y.domain([0, d3.max(responseData, (d) => d.value)]);


        // LINE GRAPH
        svg.append("g").attr("transform", `translate(0,${height})`).attr("class", "axis-white").call(d3.axisBottom(x))
        x.ticks(d3.timeHour.every(4))
        x.tickFormat(d3.timeFormat("%H"));

        svg.append("g").attr("class", "axis-white").call(d3.axisLeft(y));

        const line = d3
            .line()
            .x((d) => x(d.epoch))
            .y((d) => y(d.value));

        
        svg.append("path")
            .datum(responseData)
            // .attr("fill", "#FF5A5E"
            .attr("fill", "rgba(255,255,255,.1)")
            .attr("stroke", "white")
            .attr("stroke-width", 2)
            .attr("d", line)




        // for pointers
        const tooltip = d3.select("#line-graph-container").append("div").attr("class", "tooltip");
        const circle = svg.append('circle').attr("r", 0).attr("fill", "tomato").attr("stroke", "white").attr("opacity", .7).attr("pointer-events", "none")
        const listeningRect = svg.append("rect").attr("width", width).attr("height", height);

        listeningRect.on("mousemove", function(event) {
            const [xCoord] = d3.mouse(this);
            const bisectEpoch = d3.bisector(d => d.epoch).left
            const x0 = x.invert(xCoord);
            const i = bisectEpoch(responseData, x0, 1);
            const d0 = responseData[i - 1];
            const d1 = responseData[i];
            const d = x0 - d0.epoch > d1.epoch - x0 ? d1 : d0;  
            const xPos = x(d.epoch);
            const yPos = y(d.value);
            circle.attr("cx", xPos).attr("cy", yPos);
            
            circle.transition().duration(50).attr("r", 8);
            tooltip.style("display", "block").style("position", "absolute").style("left", `${xPos - 0}px`).style("top", `${yPos - 0}px`).html(`<strong>Time : ${d.epoch.toLocaleString([], {year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'})}</strong><br/><strong>${props.name} : ${d.value}</strong>`)
        })

        listeningRect.on("mouseleave", function (event) {
            circle.transition().duration(50).attr('r', 0);
            tooltip.style("display", "none");
        })
    }, [props])

  return (
    <div id="line-graph-container" style={{position: "relative", width: "100%"}} ref={svgParentRef}>
        <svg ref={svgRef} style={{position: "relative", width: "100%"}}></svg>
    </div>
  )
}

export default LineGraph