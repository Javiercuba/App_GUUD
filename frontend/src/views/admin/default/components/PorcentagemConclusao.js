import React, { useState, useEffect } from "react";

// Chakra imports
import { Box, Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import BarChart from "components/charts/BarChart";
import Chart1 from "components/charts/Chart1";
// Custom components
import Card from "components/card/Card.js";
import {
  PorcentagemConclusao,
  barChartOptionsDailyTraffic,
} from "variables/charts";
import {
  fetchAndFormatData,
  formatarDadosPorcentagemConclusao,
  chartOptions,
} from "variables/charts";
// Assets

export default function DailyTraffic(props) {
  const [dados, setDados] = useState([]);
  const { filtro, ...rest } = props;

  // const seriesFormatadas = [];
  // const seriesPorNome = {};

  useEffect(() => {
    async function getData() {
      const data = await fetchAndFormatData("aluno/conclusao", filtro);
      const formattedData = await formatarDadosPorcentagemConclusao(data);
      setDados(formattedData);
    }

    getData();
  }, [filtro]);
  
  const textColor = useColorModeValue("secondaryGray.900", "white");
  return (
    <Card align="center" direction="column" w="100%">
      <Flex justify="space-between" align="start" px="10px" pt="5px">
        <Flex flexDirection="column" align="start" me="20px">
          <Flex w="100%">
            <Text
              me="auto"
              color={textColor}
              fontSize="xl"
              fontWeight="700"
              lineHeight="100%"
            >
              Percentual de conclusão por aluno
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Box h="240px" mt="auto">
        {dados && dados.data && dados.data.length > 0 ? ( // Renderize o gráfico apenas se os dados e categorias estiverem disponíveis
          <Chart1
            chartData={dados}
            chartOptions={chartOptions}
            chartType={"area"}
          />
        ) : (
          // Pode mostrar uma mensagem de carregamento ou erro enquanto os dados estão sendo buscados
          <p>Carregando dados...</p>
        )}
      </Box>
    </Card>
  );
}
