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
        right: '30px',
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
        // {
        //     name: '邮件营销',
        //     type: 'line',
        //     stack: '总量',
        //     data: [120, 132, 101, 134, 90, 230, 210]
        // },
        // {
        //     name: '联盟广告',
        //     type: 'line',
        //     stack: '总量',
        //     data: [220, 182, 191, 234, 290, 330, 310]
        // },
        // {
        //     name: '视频广告',
        //     type: 'line',
        //     stack: '总量',
        //     data: [150, 232, 201, 154, 190, 330, 410]
        // },
        // {
        //     name: '直接访问',
        //     type: 'line',
        //     stack: '总量',
        //     data: [320, 332, 301, 334, 390, 330, 320]
        // },
        // {
        //     name: '搜索引擎',
        //     type: 'line',
        //     stack: '总量',
        //     data: [820, 932, 901, 934, 1290, 1330, 1320]
        // }
    ]
};