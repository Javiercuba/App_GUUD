import React from "react";
import ReactApexChart from "react-apexcharts";

class PieChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: this.props.chartData,
      chartOptions: {
        labels: this.props.labels || [],
      },
    };
  }

  // async componentDidMount() {
  //   // Função que busca dados de forma assíncrona
  //   this.updateChartData();
  // }

  componentDidUpdate(prevProps) {
    if (
      prevProps.labels !== this.props.labels ||
      prevProps.chartData !== this.props.chartData
    ) {
      this.updateChartData();
    }
  }

  updateChartData() {
    this.setState({
      chartData: this.props.chartData,
      chartOptions: {
        ...this.state.chartOptions,
        labels: this.props.labels,
      },
    });
  }

  render() {
    return (
      <ReactApexChart
        options={this.state.chartOptions}
        series={this.state.chartData}
        type="pie"
        width="100%"
        height="65%"
      />
    );
  }
}

export default PieChart;
