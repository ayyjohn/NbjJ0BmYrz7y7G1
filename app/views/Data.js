import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { range } from 'lodash';

class Data extends Component {
  constructor(props) {
    super(props);
    this.state = {
      salaries: [30.0, 27.5, 36.0, 26.0, 28.0, 26.0, 25.0, 45.0, 28.0, 28.0, 19.0, 28.0, 55.0, 37.02, 24.0, 71.0, 46.0, 18.65, 30.0, 32.0, 22.0, 30.98, 28.0, 23.0, 32.0, 24.0, 21.0, 35.52, 24.0, 29.1, 21.0, 33.0, 33.0, 35.0, 18.0, 25.52, 40.0, 26.0, 32.0, 29.49, 11.0, 76.0, 22.0, 48.0, 22.0, 39.0, 40.0, 53.41, 36.0, 80.12, 36.32, 32.0, 15.0, 32.49, 30.0, 25.0, 38.48, 36.5, 34.0, 35.0, 55.0, 34.0, 75.0, 42.73, 35.0, 34.0, 33.3, 43.0, 34.0, 33.5, 45.0, 48.0, 51.0, 63.79, 32.05, 78.0, 36.15, 34.0, 27.0, 45.0, 30.5, 30.0, 71.0, 39.75, 36.0, 32.05, 32.05, 58.76, 39.0, 46.0, 62.0, 43.24, 67.0, 76.0, 64.0, 24.0, 49.0, 37.43, 43.0, 62.0, 51.0, 52.77, 25.0, 50.24, 48.05, 45.5, 57.97, 22.0, 35.0, 50.0, 54.68, 40.0, 50.0, 37.11, 41.04, 76.0, 22.87, 22.44, 25.42, 23.0, 60.0, 52.0, 49.95, 37.0, 25.64, 36.0, 23.04, 29.15, 23.5, 27.0, 26.25, 26.0, 20.25, 22.98, 26.1, 30.0, 29.0, 26.51, 24.61, 22.53, 29.0, 24.91, 20.4, 28.85, 26.69, 32.0, 27.0, 28.0, 29.2, 34.72, 31.0, 99.0, 28.0, 84.0, 30.25, 32.0, 23.05, 42.77, 37.0, 23.85, 23.0, 23.78, 34.0, 31.0, 41.0, 22.5, 21.0, 23.75, 25.51, 31.76, 27.0, 25.6, 28.56, 13.0, 31.25, 26.04, 26.70, 27.0, 30.25, 32.0, 56.0, 48.0, 110.0, 26.0, 24.0, 25.67, 28.0, 28.0, 22.0, 38.99, 50.0, 27.0, 26.0, 25.0, 35.0, 27.62, 49.94, 38.14, 31.0, 24.0, 21.0, 25.75, 40.0, 34.25, 22.5, 24.0, 22.01, 30.0, 26.0, 27.0, 34.0, 38.99, 21.0, 24.0, 32.05, 35.0, 19.75, 20.91, 27.77, 22.45, 26.0, 26.0, 45.0, 27.0, 11.0, 24.0, 25.0, 34.0, 21.0, 39.0, 25.0, 20.96, 23.0, 25.56, 60.0, 38.0, 26.0, 22.33, 20.08, 34.0, 31.0, 50.21, 36.56, 48.07, 27.45, 35.0, 33.45, 25.0, 36.0, 36.0, 36.69, 25.0, 36.0, 26.0, 24.0, 13.0, 23.0, 41.0, 17.0, 27.0, 25.05, 24.04, 31.25, 40.0, 34.72, 26.0, 27.0, 36.0, 27.0, 26.70, 60.0, 13.0, 24.0, 27.0, 33.0, 34.72, 19.75, 32.51, 49.0, 32.0, 23.0, 25.99, 45.0, 15.0, 20.71, 101.0, 25.0, 33.0, 122.0, 30.0, 49.65, 32.0, 59.14],
      ratios: [3, 2, 4, 4, 1, 4, 4, 3, 1, 5, 0, 20, 5, 3, 3, 4, 18, 3, 5, 15, 1, 5, 5, 3, 5, 5, 5, 3, 5, 5, 5, 3, 5, 4, 13, 2, 4, 2, 1, 4, 15, 2, 7, 4, 6, 2, 1, 12, 5, 8, 0, 4, 8, 4, 5, 2, 2, 4, 2, 4, 5, 4, 2, 4, 2, 5, 4, 4, 3, 5, 4, 4, 3, 2, 6, 5, 4, 2, 2, 4, 4, 6, 1, 2, 1, 4, 4, 1, 1, 5, 5, 4, 4, 2, 3, 4, 2, 6, 5, 1, 3, 1, 3, 2, 2, 2, 2, 1, 3, 2, 2, 2, 3, 1, 2, 1, 5, 6, 7, 8, 1, 6, 2, 10, 1, 4, 5, 6, 35, 3, 1, 5, 1, 1, 1, 1, 5, 3, 8, 6, 4, 6, 3, 6, 4, 4, 3, 2, 4, 10, 5, 2, 3, 8, 4, 1, 2, 3, 3, 1, 6, 4, 10, 1, 1, 4, 3, 6, 8, 5, 5, 6, 4, 4, 1, 6, 6, 3, 1, 1, 8, 2, 4, 33, 3, 2, 3, 1, 6, 4, 1, 5, 8, 1, 1, 1, 3, 4, 12, 2, 1, 1, 5, 2, 8, 6, 2, 3, 2, 5, 5, 6, 3, 15, 1, 14, 3, 8, 8, 6, 30, 12, 8, 3, 1, 5, 1, 12, 1, 1, 3, 6, 15, 6, 2, 2, 5, 3, 3, 1, 2, 8, 2, 10, 5, 1, 4, 5, 2, 1, 2, 2, 8, 4, 2, 7, 5, 3, 1, 5, 3, 6, 4, 5, 20, 1, 4, 9, 14, 1, 8, 2, 5, 5, 1, 4, 7, 4, 1, 4, 4, 5, 7, 10, 5, 2, 1, 6, 2, 5, 2, 4, 1]
    }
  }

  componentDidMount() {
    this.ratiosHistogram();
    this.salariesHistogram();
  }

  ratioFrequencies() {
    const freqs = new Array(Math.max(...this.state.ratios));
    freqs.fill(0);
    this.state.ratios.forEach( el => {
      freqs[el]++;
    });
    return freqs;
  }

  salaryFrequencies() {
    const freqs = new Array(Math.max(...this.state.salaries));
    freqs.fill(0);
    this.state.salaries.forEach( el => {
      freqs[el]++;
    })
    return freqs;
  }

  ratiosHistogram() {
    const values = this.ratioFrequencies();
    let index = -1;
    const div = d3.select('#ratio-histogram');
    div.selectAll('div')
      .data(values)
      .enter()
      .append('div')
      .attr('class', 'bar')
      .attr('fill', 'blue')
      .style('background-color', '#00aaff')
      .style('width', '20px')
      .attr("x", (d, i) => {
        const pos = i * 21;
        return pos + 'px';
        })
      .style('display', 'inline-block')
      .style('margin-right', '1px')
      .style('top', '10px')
      .style('position', 'relative')
      .style('height', (d) => {
        const barHeight = d * 5;
        return barHeight + 'px';
        })
  }
  salariesHistogram() {
    const values = this.salaryFrequencies();
    let index = -1;
    const div = d3.select('#salary-histogram');
    div.selectAll('div')
      .data(values)
      .enter()
      .append('div')
      .attr('class', 'bar')
      .attr('fill', 'blue')
      .style('background-color', '#00aaff')
      .style('width', '6px')
      .attr("x", (d, i) => {
        const pos = i * 21;
        return pos + 'px';
        })
      .style('display', 'inline-block')
      .style('margin-right', '1px')
      .style('top', '10px')
      .style('position', 'relative')
      .style('height', (d) => {
        const barHeight = d * 15;
        return barHeight + 'px';
        })
  }

  render() {
    return (
      <div>
        <h2>Nurse to Patient Ratios</h2>
        <div id="ratio-histogram" style={{width:"800px", height:"300px"}} ></div>
        <h2>Nurse Salaries</h2>
        <div id="salary-histogram" style={{width:"800px", height:"300px"}} ></div>
      </div>
    );
  }
}


export default Data;
