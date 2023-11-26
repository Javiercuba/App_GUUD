
// Chakra imports
import {
  Box,
  SimpleGrid,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button
} from "@chakra-ui/react";
import { ChevronDownIcon , AddIcon, WarningIcon } from '@chakra-ui/icons'
// Custom components

import React, { useEffect, useState } from "react";

import PorcentagemConclusao from "views/admin/default/components/PorcentagemConclusao";
import ReprovacaoDisciplina from "views/admin/default/components/Reprovacoes_disciplina";
import AlunosPorPeriodo from "views/admin/default/components/AlunosPorPeriodo";
import TempoConclusao from "views/admin/default/components/TempoConclusao";

import {
  columnsDataCheck,
  columnsDataComplex,
} from "views/admin/default/variables/columnsData";
import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";

//Tela inicial
export default function UserReports() {
  // Chakra Color Mode
    const [filtro, setFiltro] = useState(); // Defina um estado para o filtro
  const opcoesFiltro = ['Ciencia da computação', 'Engenharia', 'Medicina', 'Artes'];
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [cursoSelecionado, setCursoSelecionado] = useState("Curso");
  const atualizarFiltro = (novoFiltro) => {
    setFiltro(novoFiltro);
    setDropdownOpen(false);
    setCursoSelecionado(novoFiltro);
  };

  useEffect(() => {
   
  }, [filtro]);


  
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>

      <SimpleGrid columns={2} spacing={10}>
        
          <Box height='80px'>
            <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  {cursoSelecionado}
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => atualizarFiltro("Ciencia da computação")}>Ciência da computação</MenuItem>
                  <MenuItem onClick={() => atualizarFiltro("Produção")}>Produção</MenuItem>
                </MenuList>
            </Menu>
          </Box>
      </SimpleGrid>   
      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
        <ReprovacaoDisciplina filtro={encodeURIComponent(filtro)} />
        <AlunosPorPeriodo filtro={encodeURIComponent(filtro)} />
      </SimpleGrid>
      
      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap='40px' mb='20px'>
          
         <PorcentagemConclusao filtro={encodeURIComponent(filtro)} />       
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap='40px' mb='20px'>
          
         <TempoConclusao filtro={encodeURIComponent(filtro)} />       
      </SimpleGrid>
     
    </Box>
  );
}
