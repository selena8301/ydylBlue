<template>
    <div class="pie-simple" id="pieSimple"></div>
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
        this.myChart = this.$echarts.init(document.getElementById("pieSimple"));
        let option = {},
            that = this;
            option = {
                title: {
                    text: 'Customized Pie',
                    left: 'center',
                    top: 20,
                    textStyle: {
                        color: 'red'
                    }
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '50%',
                        center: ['60%', '60%'],
                        data: [
                            {value: 1048, name: '搜索引擎'},
                            {value: 735, name: '直接访问'},
                            {value: 580, name: '邮件营销'},
                            {value: 484, name: '联盟广告'},
                            {value: 300, name: '视频广告'}
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
        this.myChart.setOption(option);
    }

}
</script>

<style scoped>
.pie-simple{
    background-color: #fff;
    position: absolute;
    left: 5px;
    top: 30px;
    width: 300px;
    height: 280px;
    border-radius: 5px;
}
</style>
