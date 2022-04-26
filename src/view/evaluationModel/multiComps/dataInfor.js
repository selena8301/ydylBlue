import singleLine from "./image/singleLine.png";
import doubleLine from "./image/doubleLine.png";
import areaPie from "./image/areaPie.png";
import circlePie from "./image/circlePie.png";
import rowBar from "./image/rowBar.png";
import columnBar from "./image/columnBar.png";

export default {
  choseCharts: [{
      value: "line",
      label: "折线图",
      chartType: [{
          imgSrc: singleLine,
          type: "singleLine"
        },
        {
          imgSrc: doubleLine,
          type: "doubleLine"
        }
      ]
    },
    {
      value: "pie",
      label: "饼图",
      chartType: [{
          imgSrc: areaPie,
          type: "areaPie"
        },
        {
          imgSrc: circlePie,
          type: "circlePie"
        }
      ]
    },
    {
      value: "bar",
      label: "柱状图",
      chartType: [{
          imgSrc: rowBar,
          type: "rowBar"
        },
        {
          imgSrc: columnBar,
          type: "columnBar"
        }
      ]
    }
  ],
  chartChoseW: [{
      value: "w24",
      label: "24vw"
    },
    {
      value: "w32",
      label: "32vw"
    },
    {
      value: "w49",
      label: "49vw"
    }
  ],
  chartChoseH: [{
      value: "h15",
      label: "15vh"
    },
    {
      value: "h20",
      label: "20vh"
    },
    {
      value: "h30",
      label: "30vh"
    }
  ]
};
