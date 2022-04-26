<template>
    <div class="bar-background" id="barBackground"></div>
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
        this.myChart = this.$echarts.init(document.getElementById("barBackground"));
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
                grid: {
                    left: '5%',
                    right: '4%',
                    bottom: '5%',
                    containLabel: true
                },
                series: [{
                    data: [120, 200, 150, 80, 70, 110, 130],
                    type: 'bar',
                    showBackground: true,
                    backgroundStyle: {
                        color: 'rgba(180, 180, 180, 0.2)'
                    }
                }]
            };
        this.myChart.setOption(option);
    }

}
</script>

<style scoped>
.bar-background{
    background-color: #fff;
    position: absolute;
    left: 5px;
    top: 30px;
    width: 300px;
    height: 280px;
    border-radius: 5px;
}
</style>
