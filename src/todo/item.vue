<template>
  <div :class="todo.completed?'completed':''" class="todo-item">
    <input 
      type="checkbox"
      class="toggle"
      v-model="todo.completed"
    >
    <label for="">{{todo.content}}</label>
    <button class="destory" @click="deleteTodo"></button>
  </div>
</template>
<script>
export default {
  props:{
    todo:{
      type:Object,
      required:true
    }
  },
  methods:{
    deleteTodo() {
      this.$emit('del',this.todo.id)
    }
  }
}
</script>
<style lang="stylus" scoped>
.todo-item
  position relative
  background #fff
  font-size 24px
  border-top 1px solid rgba(0,0,0,0.06)
  padding-left 20px
  box-sizing border-box
  &:hover
    .destory:after
      background url('../assets/images/del.svg')  center center no-repeat /cover
      display inline-block 
      content ''
      width 30px
      height 30px
  label
    white-space pre-line
    word-break break-all
    padding 15px 60px 15px 15px
    margin-left 45px
    display block
    line-height 1.2
    transition color 0.3s
  &.completed 
    label 
      color #d9d9d9
      text-decoration line-through
.toggle
  text-align center 
  width 40px 
  height 40px
  position absolute
  top 0 
  bottom 0
  margin auto 0
  border none 
  appearance none 
  outline none 
  &:after
    background url('../assets/images/round.svg')  center center no-repeat /cover
    display inline-block 
    content ''
    width 40px
    height 40px
  &:checked:after
    background url('../assets/images/done.svg')  center center no-repeat /cover
    display inline-block 
    content ''
    width 40px
    height 40px
.destory
  position absolute
  top 0
  right 10px
  bottom 0
  width 40px
  outline none
  border 0
  font-size 30px
  background-color #fff
</style>

