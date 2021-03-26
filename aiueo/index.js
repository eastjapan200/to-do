Vue.config.devtools = true;

const container = Vue.component('todo-container',{
  data: () => {
    return{
      todos: [
        {id: 0, text: 'a', status: 0},
        {id: 1, text: 'b', status: 0},
        {id: 2, text: 'c', status: 0},
      ]
    }
  },
  methods: {
    onClicked(event){
      console.log(event);
      this.todos.push(
        {
          id: this.todos.length,
          text: event,
          status: 0
        }
      )
    },
    onDelete(event){
      alert(event + "が削除されます");
      const index = this.todos.findIndex(todo => todo.id ===event);
      this.todos.splice(index,1);
    }
  },
  template: `
<div class="container">
 <todo-list :todos="todos" @delete="onDelete($event)"></todo-list>
 <todo-input @add="onClicked($event)"></todo-input>
</div>
  `
});
Vue.component('todo-list',{
  props:['todos'],
  methods:{
    onClickDelete(id){
      this.$emit('delete',id);
    }
  },
  template:`
  <table cellpadding="0" cellspacing="0" border="0">
    <thead class="t-head">
      <th class="task-id">ID</th>
      <th class="task-name">タスク名</th>
      <th class="task-status">状態</th>
      <th class="task-checkbox"></th>
    </thead>
    <tbody class="t-body">
      <todo-item v-for="todo in todos" :todo="todo" @delete="onClickDelete($event)" :key="todo.id" />
    </tbody>
   </table>
   `
})
Vue.component('todo-item',{
  props:['todo'],
  methods:{
    onClick(id){
      this.$emit('delete',id);
    }
  },
  template:`
  <tr>
    <td>{{todo.id}}</td>
    <td>{{todo.text}}</td>
    <td>{{todo.status}}</td>
    <td>
    <img src="gomibako.svg" class="gomibako" @click="onClick(todo.id)">
    </td>
  </tr>
  `
})
Vue.component('todo-input',{
  data: () => {
    return {
      text: '',
    }
  },
  methods:{
    onClick() {
      console.log(this.text);
      this.$emit('add' , this.text);
      this.text='';
    }
  },
  template:`
<div>
  <input type="text" v-model="text"/>
  <input type="button" value="追加" @click="onClick()">
</div>
  `,
})


const app = new Vue({
  el:"#app",
});
