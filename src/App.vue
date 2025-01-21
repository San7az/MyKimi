<script setup>
import axios from "axios"
import { ref } from 'vue'


// 获取后台数据 -- 输入日期和城市
const getValue = async (input_date, input_city, input_province) => {
  if (input_date === '') {
    contentP.value = 'Please Type Date~'
    return
  }

  // 如果输入了城市，则只显示一条
  if (input_city !== '') {
    const res = await axios.post('http://10.206.55.227:8080/api/predict/predictByYear', {
    date: input_date,
    city: input_city,
    province: input_province
  })
    price.value[0] = res.data[0].Price
    charts_city.value[0] = res.data[0].City
    return
  }
  // 如果未输入城市，则显示十条
  if(input_city === ''){
    const res_ten = await axios.post('http://192.168.0.20:8080/api/predict/predictByDate',{
      date: input_date,
      fromIndex: 0,
      toIndex:9
    })
    for (let i = 0; i < 10; i++) {
      price.value[i] = res_ten.data[i].Price
      charts_city.value[i] = res_ten.data[i].City
    }
    buttonflag.value = true
  }
  // if (buttonflag.value === false) {
  //   alert('请输入城市')
  // } else {

  // }
  funcflag.value = true
  console.log(res);

  // price.value = res.data[0].price
  // console.log(price.value);
  // charts_city.value = input_city
  // const price = res.data[0].price
}

// 下一页
const nextPage = async() => {
    const res_ten = await axios.post('http://192.168.0.20:8080/api/predict/predictByDate',{
      date: input_date,
      fromIndex: 0,
      toIndex:9
    })
    for (let i = 0; i < 10; i++) {
      price.value[i] = res_ten.data[i].Price
      charts_city.value[i] = res_ten.data[i].City
    }
    buttonflag.value = true
}
// input绑定数据
const input_date = ref('')
const input_city = ref('')
const input_province = ref('')
const price = ref([])
const charts_city = ref([])
const funcflag = ref(false)
const buttonflag = ref(false)
const contentP = ref('Hello , you can ask me something about house price !~')


// 初始化echarts
import ECharts from '@/components/Echarts.vue';


const chartOptions = {
  title: {
    text: 'HousePrice',
  },
  tooltip: {},
  xAxis: {
    // data: ['苹果', '香蕉', '橘子', '梨', '葡萄', '西瓜'],
    data: charts_city.value,
    axisLabel: {
      interval: 0, // 强制显示所有标签
      show: true
    },
  },

  yAxis: {},
  series: [
    {
      name: 'HousePrice',
      type: 'bar',
      // data: [5, 20, 36, 10, 10, 20],
      // data: [price.value],
      data: price.value
    },
  ],
};
</script>
<template>
  <div>
    <div class="show_img">
      <img src="@/assets/peanut1.jpg"  class="custom_img">
    </div>
      <div class="container_charts" v-if="funcflag">

<!-- <div class="show_charts">我是echarts</div> -->
      <ECharts :options="chartOptions"></ECharts>
  </div>
  <div  v-else>
    <div class="container_text">
      <p> {{ contentP }}</p>
    </div>
  </div>
      
 

    <div class="search_input">

      <!-- <el-input v-model="input" style="width: 240px" placeholder="Please type year" :style="{ borderRadius: '90px' }" /> -->
      <div>
        <input type="text" class="rounded-input" placeholder="Please type date" v-model="input_date">
      </div>
      <div>
        <input type="text" class="rounded-input" placeholder="Please type city" v-model="input_city">
      </div>
      <div>
        <input type="text" class="rounded-input" placeholder="Please type province" v-model="input_province">
        <el-button type="warning" round @click="getValue(input_date, input_city, input_province)" class="el_button"
          size="large">Submit</el-button>
        <el-button v-if="buttonflag" type="warning" round @click="nextPage(input_date)"
          class="el_button" size="large" >Next</el-button>
      </div>
    </div>
  </div>

</template>

<style>
.el_button {
  margin-left: 10px
}

.rounded-input {
  border-radius: 45px;
  height: 30px;
  width: 130px;
  margin: 5px;
  border: none;
  outline: 2px solid #d29437;
  text-align: center;
}

.search_input {
  display: flex;
  justify-content: center;
}

.container_charts {
  width: 500px;
  height: 300px;
  background-color: black;
  display: flex;
  justify-content: center;
  align-content: center;
  height: 70vh;
  position: relative;
  margin: 50px auto;
  margin-top: 2px;
}

.show_charts {
  width: 200px;
  height: 20px;
  background-color: #fff;
  text-align: center;
  position: absolute;
  top: 25px;
  margin: auto;

}

.show_img {
  place-items: center;
  justify-content: center;
  text-align: center;
  align-items: center;
  width: 100%;
  height: 100px;
  display: grid;
  margin: 8px;
}

.custom_img {
  width: 100px;
  height: 100px;
  border-radius:50%;
  object-fit: cover;
  
}
.container_text{
  text-align: center;
  font-size: large;
}
</style>