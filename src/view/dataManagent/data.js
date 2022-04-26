let echartsDataOne = [
    {
        name: "中国",
        type: "line",
        stack: "总量",
        data: [120, 132, 101, 134, 90, 230, 210, 84, 454, 41, 45, 454, 111],
        smooth: true,
        // itemStyle: {
        //     normal: {
        //         areaStyle: {
        //             type: 'default',
        //             opacity: 0.1
        //         }
        //     }
        // },
        // 区域填充样式
        areaStyle: {
            color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                    {
                        offset: 0,
                        color: "rgba(255,222,0, 0.5)", // 0% 处的颜色
                    },
                    {
                        offset: 1,
                        color: "rgba(255,222,0, 0)", // 100% 处的颜色
                    },
                ],
                global: false, // 缺省为 false
            },
        },
    },
    {
        name: "美国",
        type: "line",
        stack: "总量",
        data: [123, 111, 223, 414, 121, 453, 45, 84, 35, 41, 444, 454, 88],
        smooth: true,
        // 区域填充样式
        areaStyle: {
            color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                    {
                        offset: 0,
                        color: "rgba(250,106,6, 0.5)", // 0% 处的颜色
                    },
                    {
                        offset: 1,
                        color: "rgba(250,106,6, 0)", // 100% 处的颜色
                    },
                ],
                global: false, // 缺省为 false
            },
        },
    },
    {
        name: "日本",
        type: "line",
        stack: "总量",
        data: [68, 338, 78, 383, 90, 230, 210, 838, 454, 41, 387, 454, 78],
        smooth: true,
        // 区域填充样式
        areaStyle: {
            color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                    {
                        offset: 0,
                        color: "rgba(51,136,206, 0.5)", // 0% 处的颜色
                    },
                    {
                        offset: 1,
                        color: "rgba(51,136,206, 0)", // 100% 处的颜色
                    },
                ],
                global: false, // 缺省为 false
            },
        },
    },
]
let echartsDataTwo = [
    {
        name: "中国",
        type: "line",
        stack: "总量",
        data: [20, 120, 80, 180, 600, 299, 150, 50, 320, 60, 120, 600, 1],
        smooth: true,
        // itemStyle: {
        //     normal: {
        //         areaStyle: {
        //             type: 'default',
        //             opacity: 0.1
        //         }
        //     }
        // },
        // 区域填充样式
        areaStyle: {
            color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                    {
                        offset: 0,
                        color: "rgba(255,222,0, 0.5)", // 0% 处的颜色
                    },
                    {
                        offset: 1,
                        color: "rgba(255,222,0, 0)", // 100% 处的颜色
                    },
                ],
                global: false, // 缺省为 false
            },
        },
    },
    {
        name: "美国",
        type: "line",
        stack: "总量",
        data: [123, 111, 223, 414, 121, 453, 45, 84, 35, 41, 444, 454, 88],
        smooth: true,
        // 区域填充样式
        areaStyle: {
            color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                    {
                        offset: 0,
                        color: "rgba(250,106,6, 0.5)", // 0% 处的颜色
                    },
                    {
                        offset: 1,
                        color: "rgba(250,106,6, 0)", // 100% 处的颜色
                    },
                ],
                global: false, // 缺省为 false
            },
        },
    },
    {
        name: "日本",
        type: "line",
        stack: "总量",
        data: [68, 338, 78, 383, 90, 230, 210, 838, 454, 41, 387, 454, 78],
        smooth: true,
        // 区域填充样式
        areaStyle: {
            color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                    {
                        offset: 0,
                        color: "rgba(51,136,206, 0.5)", // 0% 处的颜色
                    },
                    {
                        offset: 1,
                        color: "rgba(51,136,206, 0)", // 100% 处的颜色
                    },
                ],
                global: false, // 缺省为 false
            },
        },
    },
]
let echartsDataThree = [
    {
        name: "中国",
        type: "line",
        stack: "总量",
        data: [22, 2, 2, 2, 2, 2, 210, 2, 2, 41,2, 2, 2],
        smooth: true,
        // itemStyle: {
        //     normal: {
        //         areaStyle: {
        //             type: 'default',
        //             opacity: 0.1
        //         }
        //     }
        // },
        // 区域填充样式
        areaStyle: {
            color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                    {
                        offset: 0,
                        color: "rgba(255,222,0, 0.5)", // 0% 处的颜色
                    },
                    {
                        offset: 1,
                        color: "rgba(255,222,0, 0)", // 100% 处的颜色
                    },
                ],
                global: false, // 缺省为 false
            },
        },
    },
    {
        name: "美国",
        type: "line",
        stack: "总量",
        data: [123, 111, 223, 414, 121, 453, 45, 84, 35, 41, 444, 454, 88],
        smooth: true,
        // 区域填充样式
        areaStyle: {
            color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                    {
                        offset: 0,
                        color: "rgba(250,106,6, 0.5)", // 0% 处的颜色
                    },
                    {
                        offset: 1,
                        color: "rgba(250,106,6, 0)", // 100% 处的颜色
                    },
                ],
                global: false, // 缺省为 false
            },
        },
    },
    {
        name: "日本",
        type: "line",
        stack: "总量",
        data: [68, 338, 78, 383, 90, 230, 210, 838, 454, 41, 387, 454, 78],
        smooth: true,
        // 区域填充样式
        areaStyle: {
            color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                    {
                        offset: 0,
                        color: "rgba(51,136,206, 0.5)", // 0% 处的颜色
                    },
                    {
                        offset: 1,
                        color: "rgba(51,136,206, 0)", // 100% 处的颜色
                    },
                ],
                global: false, // 缺省为 false
            },
        },
    },
]
export {
    echartsDataOne,
    echartsDataTwo,
    echartsDataThree
}
