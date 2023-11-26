// Chakra imports
import { Box, Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card.js";
// Custom components
import PieChart from "components/charts/PieChart";

import React, { useState, useEffect } from "react";
import {
  fetchAndFormatData,
  funelOptionsAlunosPorPeriodo,
  formatarDadosAlunosPorPeriodo,
} from "variables/charts";

export default function AlunosPorPeriodo(props) {
  const [dados, setDados] = useState([]);

  const { filtro, ...rest } = props;
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");

  useEffect(() => {
    async function getData() {
      const data = await fetchAndFormatData(
        "curso/periodo/total_alunos",
        filtro
      );
      const formattedData = await formatarDadosAlunosPorPeriodo(data);
      setDados(formattedData);
    }

    getData();
  }, [filtro]);
  useEffect(() => {
    // Atualize os dados do PieChart quando 'dados' forem alterados
  }, [dados]);

  console.log(dados.periodo);
  return (
    <Card align="center" direction="column" w="100%">
      <Flex align="center" w="100%" px="35px" py="10px">
        <Text
          me="auto"
          color={textColor}
          fontSize="xl"
          fontWeight="700"
          lineHeight="100%"
        >
          Quantidade de Alunos por Periodo
        </Text>
      </Flex>

      <Box h="340px" mt="auto">
        {dados.periodo && dados.total ? ( // Renderize o gráfico apenas se os dados e categorias estiverem disponíveis
          <PieChart
            key={"algumaChaveUnica"}
            chartData={dados.total}
            chartOptions={funelOptionsAlunosPorPeriodo}
            labels={dados.periodo}
          />
        ) : (
          <p>Carregando dados...</p>
        )}
      </Box>
    </Card>
  );
}
