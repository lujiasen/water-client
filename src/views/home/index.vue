<template>
  <div class="cantainer">
    <!-- 搜索区域 -->
    <van-search v-model="value" show-action placeholder="请输入快递单号" @keyup="value=value.replace( /[^\d]/g,'')" >
      <template #action>
        <van-button type="primary" size="small" @click="getExpressInfo">搜索</van-button>
      </template>
    </van-search>
    <van-cell-group class="suggest-box" v-if="value.length > 10 && autocomplete === true">
      <van-cell @click="getExpressInfo(item)" icon="search" v-for="item in suggestList" :key="item.ShipperCode">
        {{item.ShipperName}}
      </van-cell>
    </van-cell-group>
      <!-- 图片区域 -->
      <van-image v-else style="width: 100%; height: 180px" :src="image"></van-image>
      <!-- 物流详情信息 -->
      <!-- <van-image v-if="value === ''" style="width: 100%; height: 100%" :src="images.image2" /> -->
      <div v-if="value.length < 11" class="box">亲，暂无物流信息</div>
      <van-steps v-else direction="vertical" :active="0">
        <van-step v-for="(item, index) in expressInfo" :key="index">
          <h3>{{item.AcceptStation}}</h3>
          <p>{{item.AcceptTime}}</p>
        </van-step>
      </van-steps>
  </div>
</template>

<script>
// import * as _ from 'lodash'
import image from '../../assets/express.jpg'
import { getExpressName, getExpressInfo } from '@/api/express'
export default {
  name: 'home',
  data () {
    return {
      value: '', // 75365956946441
      expressInfo: [], // 快递详细信息
      suggestList: [], // 存放联想建议的数组
      image,
      autocomplete: true
    }
  },
  watch: {
    value () {
      if (this.value.length > 10) {
        if (!this.value) {
          this.suggestList = []
          return false
        }
        this.getExpressName()
        this.autocomplete = true
        this.expressInfo = []
      }
    }
  },
  methods: {
    async getExpressName () {
      const { data: { data } } = await getExpressName({ expressNo: this.value })
      this.suggestList = data
    },
    async getExpressInfo (code) {
      const { data: { data } } = await getExpressInfo({ expressNo: this.value, shipperCode: code.ShipperCode })
      this.expressInfo = data
      this.autocomplete = false
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, 0);
}
h3 {
  margin: 0;
}
</style>
