<template>
    <div ref="searchDetail" class="searchDetail">
      <!-- <Header text="搜索中心">
        <div slot="head_left">
          <i class="iconfont icon-arrow-lift"></i>  
        </div>
      </Header> -->
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @input="onSearch"
        @cancel="$router.back()"
      />
      <div class="list_con">
        <ul v-show="list.length">
          <li class="list_item" v-for="(item,index) in list" :key="index">
            <i class="iconfont icon-fangdajing"></i>
            <span>{{item.goods_name}}</span>
          </li>
        </ul>
        <!-- <van-empty v-show="value.length>0 & !list.length" image="search" description="无相关信息" /> -->
        <van-empty v-show="!value & !list.length" image="search" description="请搜索关键字(如:电视)" />
      </div>
    </div>
</template>
<script>
import Header from 'components/header/header'
import {search} from 'api'
import BScroll from '@better-scroll/core'
export default {
    props: {

    },
    data() {
        return {
         value:'',
         list:[]
        }
    },
    computed: {
    },
    created() {
       
      
    },
    mounted() {
     this.$refs.searchDetail.addEventListener('touchmove',function(e){
        e.preventDefault()
      })
    },
    watch: {

    },
    methods: {
     async _getListData (val) {
        const {message} = await search(val)
        this.list = message
        this.$nextTick(()=>{
          if (!this.bscroll) {
            this.bscroll = new BScroll('.list_con',{
            click:true,
            bounce: {
            top: false,
            bottom: false
           }
        })
       }else{
         this.bscroll.refresh()
       }
      })
      },
      onSearch (val) {
        if (this.setTimeoutId) {
          clearTimeout(this.setTimeoutId)
           this.setTimeoutId = setTimeout(()=>{
           if (val.trim()) {
          this._getListData(val.trim())
        }else{
          this.list=[]
        }
        },250)
        }else{
          this.setTimeoutId = setTimeout(()=>{
           if (val.trim()) {
          this._getListData(val.trim())
        }else{
          this.list=[]
        }
        },250)
        }
        
      },
      clear () {
        
      }
    },
    components: {
      Header
    },
}
</script>

<style scoped lang="stylus">
@import "~common/css/variable.styl"
@import "~common/css/mixin.styl"
.searchDetail
  position fixed
  z-index 200
  background-color #fff
  left 0
  top 0
  right 0
  bottom 0
  overflow hidden
  .list_con
    position absolute
    top .54rem
    bottom 0
    width 100%
    overflow hidden
    .list_item
      width 100%
      box-sizing border-box
      line-height .16rem
      padding .08rem .12rem
      border-top .01rem solid $border-gray
      display flex
      align-items center
      font-size .12rem
      text-align justify
      color $font-color
      &:first-child
        border none
      .icon-fangdajing
        font-size .12rem
        color $bg-gray
        margin-right .05rem
      span
        ellipsis()
</style>
