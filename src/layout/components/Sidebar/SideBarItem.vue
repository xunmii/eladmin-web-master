<template>
  <div class="sider_bar_item" @click="handleClick(resolvePath(sideitem.path))">
    <p>
      {{ sideitem.name }}
    </p>
<!--    这是一个子组件sideBarItem{{sideritem}}-->
<!--    <router-link :to="{path: sideitem.path}">-->
<!--      {{ sideitem.name }}-->
<!--    </router-link>-->
  </div>
</template>
<script>

import { isExternal } from '@/utils/validate'
import path from 'path'

export default {
  name: 'SideBarItem',
  props: {
    'sideitem': {
      type: Object,
      default: () => {
        return {}
      }
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // basePath: ''
    }
  },
  methods: {
    handleClick(subPath) {
      // this.$router.push({ path: subPath })
      this.$router.push({ path: '/dataRules' })
    },
    resolvePath(routePath) {
      // console.log(this.sideitem.name)
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      // console.log(path.resolve(this.basePath, routePath))
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
<style lang="scss" scoped>
.sider_bar_item{
  height: 56px;
  font-size: 13px;
  line-height: 56px;
  padding: 0 20px 0 30px;
  p{
    margin: 0;
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Arial,sans-serif;
    color: rgb(191, 203, 217);
  }
  &:hover{
    cursor: pointer;
    background: rgb(38,52,69);
  }
}

</style>
