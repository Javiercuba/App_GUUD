// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
// Custom components
import Chart1 from "components/charts/Chart1";
import BarChart from "components/charts/BarChart";
import LineChart from "components/charts/LineChart";
import React, { useState, useEffect } from "react";
import {
  fetchAndFormatData,
  chartOptions,
  formatarDadosTempoConclusao,
} from "variables/charts";
import { MdBarChart } from "react-icons/md";

export default function TempoConclusao(props) {
  const [dados, setDados] = useState([]);
  const [categories, setcategories] = useState([]);
  const { filtro, ...rest } = props;
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const iconColor = useColorModeValue("brand.500", "white");
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );

  useEffect(() => {
    async function getData() {
      const data = await fetchAndFormatData("aluno/tempo_medio", filtro);
      const formattedData = await formatarDadosTempoConclusao(data);
      setDados(formattedData);
    }

    getData();
  }, [filtro]);

  return (
    <Card align="center" direction="column" w="100%" {...rest}>
      <Flex align="center" w="100%" px="15px" py="10px">
        <Text
          me="auto"
          color={textColor}
          fontSize="xl"
          fontWeight="700"
          lineHeight="100%"
        >
          Tempo de Formação
        </Text>
        <Button
          align="center"
          justifyContent="center"
          bg={bgButton}
          _hover={bgHover}
          _focus={bgFocus}
          _active={bgFocus}
          w="37px"
          h="37px"
          lineHeight="100%"
          borderRadius="10px"
          {...rest}
        >
          <Icon as={MdBarChart} color={iconColor} w="24px" h="24px" />
        </Button>
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
