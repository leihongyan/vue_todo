<template>
  <section class='real-app'>
    <input type="text"
      class='add-input'
      autofocus="autofocus"
      placeholder="接下去要做什么？"
      @keyup.enter="addTodo"
    >
    <item 
      :todo="todo"
      v-for="todo in filteredTodos"
      :key="todo.id"
      @del="deleteTodo"
      ></item>
    <tabs 
      :filter='filter' 
      :todos="todos"
      @toggle='toggleFilter'
      @clearAll='clearAllCompleted'
    ></tabs>
  </section>
</template>

<script>
import Item from './item.vue'
import Tabs from './tabs.vue'

let id=0
export default {
  data() {
    return {
      todos:[],
      filter:'all'
    }
  },
  components:{
    Item,
    Tabs
  },
  computed:{
    filteredTodos() {
      if(this.filter==='all'){
        return this.todos
      }
      const completed=this.filter==='completed'
      return this.todos.filter(todo=>completed ===todo.completed)
      
    }
  },
  methods:{
    addTodo(e) {
      if(e.target.value.trim()!=''){
        this.todos.unshift({
          id:id++,
          content:e.target.value.trim(),
          completed:false
        })
      }
      
      e.target.value=''
    },
    deleteTodo(id) {
      this.todos.splice(this.todos.findIndex(todo => todo.id===id ),1)
    },
    toggleFilter(state){
      this.filter=state
    },
    clearAllCompleted() {
      this.todos=this.todos.filter(todo=>!todo.completed)
    }
  }
}
</script>

<style lang="stylus" scoped>
.real-app
  width 600px
  margin 0 auto
  box-shadow 0 0 5px #666
.add-input
  position relative
  margin 0
  width 100%
  font-size 24px
  line-height 1.4em
  outline none 
  padding 6px
  box-sizing border-box
  padding 16px 
  padding-left 60px
  border 0

</style>

