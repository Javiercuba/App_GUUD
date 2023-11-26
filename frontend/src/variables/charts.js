export const barChartOptionsDailyTraffic = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    style: {
      fontSize: "12px",
      fontFamily: undefined,
    },
    onDatasetHover: {
      style: {
        fontSize: "12px",
        fontFamily: undefined,
      },
    },
    theme: "dark",
  },
  xaxis: {
    // categories: ["00", "04", "08", "12", "14", "16", "18"],
    show: false,
    labels: {
      show: true,
      style: {
        colors: "#A3AED0",
        fontSize: "14px",
        fontWeight: "500",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
    color: "black",
    labels: {
      show: true,
      style: {
        colors: "#CBD5E0",
        fontSize: "14px",
      },
    },
  },
  grid: {
    show: false,
    strokeDashArray: 5,
    yaxis: {
      lines: {
        show: true,
      },
    },
    xaxis: {
      lines: {
        show: false,
      },
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      type: "vertical",
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      colorStops: [
        [
          {
            offset: 0,
            color: "#4318FF",
            opacity: 1,
          },
          {
            offset: 100,
            color: "rgba(67, 24, 255, 1)",
            opacity: 0.28,
          },
        ],
      ],
    },
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      columnWidth: "40px",
    },
  },
};

// Consumption Users Reports

export const barChartDataConsumption = [
  {
    name: "PRODUCT A",
    data: [400, 370, 330, 390, 320, 350, 360, 320, 380],
  },
  {
    name: "PRODUCT B",
    data: [400, 370, 330, 390, 320, 350, 360, 320, 380],
  },
  {
    name: "PRODUCT C",
    data: [400, 370, 330, 390, 320, 350, 360, 320, 380],
  },
];

export const barChartOptionsConsumption = {
  chart: {
    stacked: true,
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    style: {
      fontSize: "12px",
      fontFamily: undefined,
    },
    onDatasetHover: {
      style: {
        fontSize: "12px",
        fontFamily: undefined,
      },
    },
    theme: "dark",
  },
  xaxis: {
    show: true,
    labels: {
      show: true,
      style: {
        colors: "#A3AED0",
        fontSize: "14px",
        fontWeight: "500",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
    color: "black",
    labels: {
      show: false,
      style: {
        colors: "#A3AED0",
        fontSize: "14px",
        fontWeight: "500",
      },
    },
  },

  grid: {
    borderColor: "rgba(163, 174, 208, 0.3)",
    show: true,
    yaxis: {
      lines: {
        show: false,
        opacity: 0.5,
      },
    },
    row: {
      opacity: 0.5,
    },
    xaxis: {
      lines: {
        show: false,
      },
    },
  },
  fill: {
    type: "solid",
    colors: ["#5E37FF", "#6AD2FF", "#E1E9F8"],
  },
  legend: {
    show: false,
  },
  colors: ["#5E37FF", "#6AD2FF", "#E1E9F8"],
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      columnWidth: "20px",
    },
  },
};

export const tempo_conclusao_options = {
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: true,
    showForSingleSeries: true,
    customLegendItems: ["Actual", "Expected"],
    markers: {
      fillColors: ["#00E396", "#775DD0"],
    },
  },
  xaxis: {
    categories: [
      "South Korea",
      "Canada",
      "United Kingdom",
      "Netherlands",
      "Italy",
      "France",
      "Japan",
      "United States",
      "China",
      "Germany",
    ],
  },
};

export const TempoConclusaoData = [
  {
    name: "Tempo de Conclusão (Aluno)",
    data: [20, 20, 10, 3, 2, 4, 5, 6],
  },
  {
    name: "Tempo de Conclusão (Curso)",
    data: [10, 30, 1, 31, 22, 34, 45, 6],
  },
];

export const pieChartOptions = {
  labels: ["Your files", "System", "Empty"],
  colors: ["#4318FF", "#6AD2FF", "#EFF4FB"],
  chart: {
    width: "50px",
  },
  states: {
    hover: {
      filter: {
        type: "none",
      },
    },
  },
  legend: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  hover: { mode: null },
  plotOptions: {
    donut: {
      expandOnClick: false,
      donut: {
        labels: {
          show: false,
        },
      },
    },
  },
  fill: {
    colors: ["#4318FF", "#6AD2FF", "#EFF4FB"],
  },
  tooltip: {
    enabled: true,
    theme: "dark",
  },
};

export const pieChartData = [63, 25, 12];
export const chartOptions = {
  legend: {
    show: false,
  },
};
// Total Spent Default
export async function formatarDadosReprovacoesDisciplina(json) {
  const seriesFormatadas = [];
  const seriesPorNome = {};

  if (json && Array.isArray(json)) {
    json.forEach((item) => {
      const { nome, num_disciplinas } = item;

      // Verifique se a série com o nome já existe no mapeamento
      if (!seriesPorNome[nome]) {
        // Se não existir, crie uma nova série
        seriesPorNome[nome] = {
          name: nome,
          data: [],
        };
      }

      // Adicione os dados ao formato da série
      seriesPorNome[nome].data.push(num_disciplinas);
    });
  }
  // Converta o mapeamento em um array de séries
  for (const nome in seriesPorNome) {
    if (seriesPorNome.hasOwnProperty(nome)) {
      seriesFormatadas.push(seriesPorNome[nome]);
    }
  }

  return seriesFormatadas;
}
export async function formatarDadosPorcentagemConclusao(json) {
  if (!json || !Array.isArray(json)) {
    console.error("Sua variável é undefined ou não é um array.");
    return { data: [] };
  }

  return {
    data: json.map((item) => ({
      x: item.Nome,
      y: item.porcentagem_conclusao + "%",
    })),
  };
}
export async function formatarDadosTempoConclusao(json) {
  if (!json || !Array.isArray(json)) {
    console.error("Sua variável é undefined ou não é um array.");
    return { data: [] };
  } else {
    return {
      data: json.map((item) => ({
        x: item.Nome,
        y: item.tempo_conclusao,
      })),
    };
  }
}
export async function formatarDadosAlunosPorPeriodo(json) {
  if (!json || !Array.isArray(json)) {
    console.error("Sua variável é undefined ou não é um array.");
    return { data: [] };
  } else {
    // Mapeie os dados para extrair x (período_atual) e y (cursante)
    const data = json.map((item) => ({
      x: item.periodo_atual,
      y: item.cursante,
    }));

    // Crie a estrutura de retorno com as séries, o tipo de gráfico, rótulos e tema
    return {
      total: data.map((item) => item.y),
      periodo: data.map((item) => item.x + "º Periodo"),
    };
  }
}

export const funelOptionsAlunosPorPeriodo = {
  chart: {
    height: 350,
  },
  theme: {
    monochrome: {
      enabled: true,
    },
  },
  plotOptions: {
    pie: {
      dataLabels: {
        offset: -5,
      },
    },
  },
};

export async function fetchData(path, filtro) {
  const apiUrl = `http://127.0.0.1:5000/${path}?Curso=${filtro}`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("Erro ao buscar dados da API");
  }
  const data = await response.json();
  return data;
}

export async function fetchAndFormatData(path, filtro) {
  try {
    const data = await fetchData(path, filtro);

    if (data && data.length > 0) {
      return data;
    } else {
      console.log("Os dados da API estão vazios ou não foram retornados.");
      return [];
    }
  } catch (error) {
    console.error("Erro ao buscar e formatar dados:", error);
    return [];
  }
}

export const lineChartOptionsTotalSpent = {
  chart: {
    toolbar: {
      show: false,
    },
    dropShadow: {
      enabled: true,
      top: 13,
      left: 0,
      blur: 10,
      opacity: 0.1,
      color: "#4318FF",
    },
  },
  colors: ["#4318FF", "#39B8FF"],
  markers: {
    size: 0,
    colors: "white",
    strokeColors: "#7551FF",
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    shape: "circle",
    radius: 2,
    offsetX: 0,
    offsetY: 0,
    showNullDataPoints: true,
  },
  tooltip: {
    theme: "dark",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    type: "line",
  },
  xaxis: {
    type: "numeric",
    //categories: ["2022.1", "2022.2", "2023.1", "2023.2"],
    labels: {
      style: {
        colors: "#A3AED0",
        fontSize: "12px",
        fontWeight: "500",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
  },
  legend: {
    show: false,
  },
  grid: {
    show: false,
    column: {
      color: ["#7551FF", "#39B8FF"],
      opacity: 0.5,
    },
  },
  color: ["#7551FF", "#39B8FF"],
};
