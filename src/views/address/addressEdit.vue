<template>
  <div id="addressedit">
    <Header text="编辑收货地址">
      <i slot="head_left" class="iconfont icon-arrow-lift" @click="$router.back()"></i>
    </Header>
    <van-address-edit
      :tel-validator="phoneValidator"
      :validator="validator"
      :detail-maxlength="50"
      :address-info="initInfo"
      :area-list="areaList"
      show-postal
      :show-delete="$route.params.method === 'add'? false : true"
      show-set-default
      show-search-result
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>

<script>
import Header from 'components/header/header'
import addresslist from 'base/addresslist'
import {addDeliveryAddress} from 'api'
export default {
  props: {},
  data() {
    return {
      areaList:addresslist,
      searchResult: [],
    }
  },
  computed: {
    initInfo () {
      return this.$route.params.initinfo
    }
  },
  created() {
  },
  mounted() {},
  watch: {},
  methods: {
    async onSave(content) {
      const {id,method} = this.$route.params
      const contentObj = {...content,id}
      if (method === 'add') {
        this.$store.dispatch('reqAddDeliveryAddress',content)

      }else if (method === 'update') {
        this.$store.dispatch('reqUpdateDeliveryAddress',contentObj)
      }
      this.$router.back()
    },
    onDelete() {
      const {id} = this.$route.params
        this.$store.dispatch('reqDeleteDeliveryAddress',id)
        this.$router.back()
    },
    phoneValidator (string) {
      return /^1[3456789]\d{9}$/.test(string)
    },
    validator (key,val) {
      if (key === 'name') {
        if (!/^(a-z|A-Z|0-9)*[^$%^&*;:,<>?()\""\']{1,7}$/.test(val)) {
            if (!val) {
              return '姓名不能为空'
            }
            return '最多限制7个字符'
        }
         
      }
    }
  },
  components: {
    Header
  }
}
</script>

<style scoped lang="stylus">
@import '~common/css/variable.styl'
#addressedit
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  background-color $bg-gray
  z-index 999
  overflow hidden
  .icon-arrow-lift
    font-size $header-arrow-font-size
  .van-address-edit
    margin-top 0.46rem
    & >>> .van-switch--on
      background-color $theme-red !important
    & >>> .van-button--danger
      background-color $theme-red !important
</style>
