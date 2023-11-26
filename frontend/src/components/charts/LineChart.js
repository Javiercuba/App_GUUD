import React from "react";
import ReactApexChart from "react-apexcharts";

class LineChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: [],
      chartOptions: {
        xaxis: {
          categories: props.categories,
        },
      },
    };
  }

  componentDidMount() {
    this.updateChartData();
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.chartData !== this.props.chartData ||
      prevProps.chartOptions !== this.props.chartOptions
    ) {
      this.updateChartData();
    }
  }
  updateChartData() {
    this.setState((prevState) => ({
      chartData: this.props.chartData,
      chartOptions: {
        ...prevState.chartOptions,
        xaxis: {
          ...prevState.chartOptions.xaxis,
          categories: this.props.categories,
        },
      },
    }));
  }

  render() {
    return (
      <ReactApexChart
        options={this.state.chartOptions}
        series={this.state.chartData}
        type="line"
        width="100%"
        height="100%"
      />
    );
  }
}

export default LineChart;
