<template>
    <div class="line-style" id="lineStyle"></div>
</template>

<script>

export default {
	data() {
		return {
            myChart: null,   
        }	
	},
	methods: {
      
    },
    watch: {

    }, 
    created() {
      
    },
    mounted() {
        // 基于准备好的dom，初始化echarts实例
        this.myChart = this.$echarts.init(document.getElementById("lineStyle"));
        let option = {},
            that = this;
            option = {
                xAxis: {
                    type: 'category',
                    
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                legend: {
                    data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
                },
                series: [
                    {
                    name: '邮件营销',
                    data: [120, 132, 101, 134, 90, 230, 210],
                    type: 'line',
                    symbol: 'triangle',
                    symbolSize: 20,
                    lineStyle: {
                        color: '#5470C6',
                        width: 4,
                        type: 'dashed'
                    },
                    itemStyle: {
                        borderWidth: 3,
                        borderColor: '#EE6666',
                        color: 'yellow'
                    }
                },
                {
                    name: '联盟广告',
                    data: [220, 182, 191, 234, 290, 330, 310],
                    type: 'line',
                    symbol: 'triangle',
                    symbolSize: 20,
                    lineStyle: {
                        color: '#5470C6',
                        width: 4,
                        type: 'dashed'
                    },
                    itemStyle: {
                        borderWidth: 3,
                        borderColor: '#EE6666',
                        color: 'yellow'
                    }
                },
                {
                    name: '视频广告',
                    data: [150, 232, 201, 154, 190, 330, 410],
                    type: 'line',
                    symbol: 'triangle',
                    symbolSize: 20,
                    lineStyle: {
                        color: '#5470C6',
                        width: 4,
                        type: 'dashed'
                    },
                    itemStyle: {
                        borderWidth: 3,
                        borderColor: '#EE6666',
                        color: 'yellow'
                    }
                },
                {
                    name: '直接访问',
                    data: [320, 332, 301, 334, 390, 330, 320],
                    type: 'line',
                    symbol: 'triangle',
                    symbolSize: 20,
                    lineStyle: {
                        color: '#5470C6',
                        width: 4,
                        type: 'dashed'
                    },
                    itemStyle: {
                        borderWidth: 3,
                        borderColor: '#EE6666',
                        color: 'yellow'
                    }
                },
                {
                    name: '搜索引擎',
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line',
                    symbol: 'triangle',
                    symbolSize: 20,
                    lineStyle: {
                        color: '#5470C6',
                        width: 4,
                        type: 'dashed'
                    },
                    itemStyle: {
                        borderWidth: 3,
                        borderColor: '#EE6666',
                        color: 'yellow'
                    }
                }
                ]
            };
        this.myChart.setOption(option);
    }

}
</script>

<style scoped>
.line-style{
    background-color: #fff;
    position: absolute;
    left: 5px;
    top: 30px;
    width: 300px;
    height: 300px;
    border-radius: 5px;
}
</style>
