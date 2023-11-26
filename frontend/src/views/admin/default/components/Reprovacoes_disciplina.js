// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import BarChart from "components/charts/BarChart";
import LineChart from "components/charts/LineChart";
import React, { useState, useEffect } from "react";
import { MdBarChart, MdOutlineCalendarToday } from "react-icons/md";
// Assets
import {
  lineChartOptionsTotalSpent,
  fetchAndFormatData,
  formatarDadosReprovacoesDisciplina,
} from "variables/charts";

export default function ReprovacaoDisciplina(props) {
  const [dados, setDados] = useState([]);
  const [categories, setcategories] = useState([]);
  const { filtro, ...rest } = props;

  useEffect(() => {
    async function getData() {
      const data = await fetchAndFormatData(
        "aluno/reprovacao/disciplina",
        filtro
      );
      const formattedData = await formatarDadosReprovacoesDisciplina(data);
      setDados(formattedData);

      const sortedData = [...data].sort((a, b) => a.periodo - b.periodo);
      setcategories(data.map((objeto) => objeto.periodo.toString()));
    }

    getData();
  }, [filtro]);

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
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
  return (
    <Card
      justifyContent="center"
      align="center"
      direction="column"
      w="100%"
      mb="0px"
      {...rest}
    >
      <Flex justify="space-between" ps="0px" pe="20px" pt="5px">
        <Flex align="center" w="100%">
          <Text
            me="auto"
            color={textColor}
            fontSize="xl"
            fontWeight="700"
            lineHeight="100%"
          >
            Total de Reprovações por Disciplinas
          </Text>
          <Button
            ms="auto"
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
      </Flex>
      <Flex w="100%" flexDirection={{ base: "column", lg: "row" }}>
        <Box minH="260px" minW="75%" mt="auto">
          {dados.length > 0 && categories.length > 0 ? ( // Renderize o gráfico apenas se os dados e categorias estiverem disponíveis
            <LineChart
              chartData={dados}
              chartOptions={lineChartOptionsTotalSpent}
              categories={categories}
            />
          ) : (
            // Pode mostrar uma mensagem de carregamento ou erro enquanto os dados estão sendo buscados
            <p>Carregando dados...</p>
          )}
        </Box>
      </Flex>
    </Card>
  );
}
