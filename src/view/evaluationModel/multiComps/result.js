export default [
    {
      chartClass: "h20 w32 chartMain1",
      chartMainClass: ".chartMain1",
      chartType: "line",
      chartTit: "折线图1",
      chartDetailType: "singleLine",
      text: 1,
      chartColor: ["#EB3841", "#FEB4B4"],
      xData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      seriesData: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
        },
      ],
    },
    {
      chartClass: "h20 w49 chartMain2",
      text: 2,
      chartDetailType: "doubleLine",
      chartTit: "折线图2",
      chartType: "line",
      chartColor: ["#EB3841", "#6086FF"],
      chartMainClass: ".chartMain2",
      xData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      seriesData: [
        {
          data: [120, 132, 101, 134, 90, 230, 210],
          color: "#EB3841",
        },
        {
          data: [220, 182, 191, 234, 290, 330, 310],
          color: "#6086FF",
        },
      ],
    },
    {
      chartClass: "h15 w24 chartMain3",
      text: 3,
      chartDetailType: "singleLine",
      chartTit: "折线图3",
      chartType: "line",
      chartColor: ["#6086FF", "#6086FF"],
      chartMainClass: ".chartMain3",
      xData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      seriesData: [
        {
          data: [1, 2, 3, 4, 5, 6, 7],
        },
      ],
    },
    {
      chartClass: "h15 w24 chartMain4",
      text: 4,
      chartDetailType: "circlePie",
      chartTit: "环图",
      chartType: "pie",
      chartColor: ["#67A8FF", "#D0F6FF", "#FFE059", "#FB764A"],
      chartMainClass: ".chartMain4",
      xData: ["part1", "part2", "part3", "part4"],
      seriesData: [
        {
          value: 335,
          name: "part1",
        },
        {
          value: 310,
          name: "part2",
        },
        {
          value: 234,
          name: "part3",
        },
        {
          value: 135,
          name: "part4",
        },
      ],
    },
    {
      chartClass: "h15 w24 chartMain5",
      text: 5,
      chartDetailType: "areaPie",
      chartTit: "玫瑰图",
      chartType: "pie",
      chartColor: ["#67A8FF", "#D0F6FF", "#FFE059", "#FB764A"],
      chartMainClass: ".chartMain5",
      xData: ["rose1", "rose2", "rose3", "rose4"],
      seriesData: [
        {
          value: 10,
          name: "rose1",
        },
        {
          value: 5,
          name: "rose2",
        },
        {
          value: 15,
          name: "rose3",
        },
        {
          value: 25,
          name: "rose4",
        },
      ],
    },
    {
      chartClass: "h15 w24 chartMain6",
      text: 6,
      chartDetailType: "rowBar",
      chartTit: "横向柱状图",
      chartColor: ["#6086FF", "#98D1FF", "#FEA145", "#FB764A"],
      chartType: "bar",
      chartMainClass: ".chartMain6",
      xData: ["-20%以下", "-20～0%", "0～20%", "20%以上"],
      seriesData: [
        {
          data: [66, 23, 90, 101],
        },
      ],
    },
    {
      chartClass: "h15 w24 chartMain7",
      text: 7,
      chartDetailType: "columnBar",
      chartTit: "柱状图",
      chartType: "bar",
      chartColor: [
        "rgba(152,209,255,0.2)",
        "#83bff6",
        "#188df0",
        "#188df0",
      ],
      chartMainClass: ".chartMain7",
      xData: ["1年", "1-2年", "2年以上"],
      seriesData: [
        {
          data: [249, 301, 162],
        },
      ],
    },
  ]