import React, { Component } from "react";
import Chart from "react-apexcharts";
import {
  FormControl,
  Button,
  Stack,
  FormLabel,
  Select,
} from "@chakra-ui/react";

class TreemapChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [this.props.chartData], // Use a propriedade chartData
      options: this.props.chartOptions, // Use a propriedade chartOptions
      chartType: "bar",
    };
  }

  changeChartType = (newType) => {
    this.setState({ chartType: newType });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.chartData !== this.props.chartData) {
      this.setState({
        series: [this.props.chartData],
        options: this.props.chartOptions,
      });
      console.log("Novos dados:", this.props.chartData);
    }
  }

  renderButtons() {
    const chartTypes = ["treemap", "bar", "area"];

    return chartTypes.map((type) => (
      <Button
        key={type}
        onClick={() => this.changeChartType(type)}
        backgroundColor={this.state.chartType === type ? "teal" : "lightgray"}
        color="white"
        border="none"
        padding={type === "area" ? "10px 20px" : "1px 20px"}
        cursor="pointer"
      >
        {type[0].toUpperCase() + type.slice(1)}{" "}
        {/* Capitalize a primeira letra */}
      </Button>
    ));
  }

  render() {
    return (
      <div id="chart">
        <FormControl as={Stack} direction="row" spacing={3} marginBottom="10px">
          {this.renderButtons()}
        </FormControl>
        <Chart
          options={this.state.options}
          series={this.state.series}
          type={this.state.chartType} // Use o estado para definir o tipo do gráfico
          height={"100%"}
          key={this.state.chartType}
        />
      </div>
    );
  }
}

export default TreemapChart;
