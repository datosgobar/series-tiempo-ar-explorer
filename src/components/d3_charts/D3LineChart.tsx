import * as d3 from 'd3';
import * as moment from "moment";
import * as React from 'react';
import {RefObject} from "react";
import {IDataPoint} from "../../api/DataPoint";

interface ID3LineChart {
    renderTo: RefObject<any>;
    data: IDataPoint[];
    laps: number;
}

export default class D3LineChart extends React.Component<ID3LineChart, any> {

    public componentDidMount() {
        drawLineChart(this.props.renderTo.current, this.props.data, this.props.laps);
    }

    public render() {
        return <div ref={this.props.renderTo} />
    }
}


function drawLineChart(selector: string, input: IDataPoint[], laps: number) {
    const data = input.splice(0, Math.min(laps, input.length - 1));
    const container = d3.select(selector);
    const margin = { bottom: 10, left: 10, right: 10, top: 10 };
    const width = 100;
    const height = 50;

    const minValue = d3.min(data, (d: IDataPoint) => d.value);
    const maxValue = d3.max(data, (d: IDataPoint) => d.value);
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // @ts-ignore
    const scaleX = d3.scaleTime().range([0, chartWidth]).domain(d3.extent(data, (d: IDataPoint) => moment(d.date).utcOffset('+00:00')));
    const scaleY = d3.scaleLinear().range([chartHeight, 0]).domain([minValue||1, maxValue||1]);

    // @ts-ignore
    const line = d3.line().curve(d3.curveMonotoneX).x((d: IDataPoint) => scaleX(moment(d.date).utcOffset('+00:00'))).y((d: IDataPoint) => scaleY(d.value));

    const svg = container.append('svg')
        .attr('width', chartWidth + margin.left + margin.right)
        .attr('height', chartHeight + margin.top + margin.bottom);

    const chartContainer = svg.append('g')
        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

    chartContainer.append('path')
        .attr('stroke-width', 3)
        .style('stroke', 'silver')
        .style('fill', 'none')
        .attr('d', (d) => line(data));

    chartContainer.append('circle')
        .style('fill', '#1a96d2')
        .attr('r', 4)
        .attr('cx', (d) => scaleX(moment(data[data.length-1].date).utcOffset('+00:00')))
        .attr('cy', (d) => scaleY(data[data.length-1].value));
}
