var myColor = ['#ffde00',
'#fa6a06',
'#248fe0',
'#0bfb5a',
'#0c9281',
'#FF4500',
];
export default {
    color: myColor,
    title: {
        text: ''
    },
    legend: {
        data: [],
        textStyle:{
            fontSize: 12,//字体大小
            color: '#000'//字体颜色
        },
        right: '10px',
        top: 0
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '40px',
        containLabel: true
    },
    
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [],
        axisLabel: {
            show: true,
            textStyle: {
                color: '#000'
            },
            margin: 20
        },
        axisLine: {
            lineStyle:{
                color:'#0b5683',
            }
        }
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            show: true,
            textStyle: {
                color: '#000'
            },
            margin: 20
        },
        splitLine: {
            show: true,
            lineStyle:{
               color: ['#315070'],
               width: 1,
               type: 'dotted'
          }
    　　},
        axisLine:{
            show: false
        },
    },
    series: [
    ]
};