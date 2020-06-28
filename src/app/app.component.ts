import { Component } from '@angular/core';
import { title } from 'process';
import { Hash } from 'crypto';

let todoList = [{
  id: 0o1,
  title: '吃饭',
  done: false
},
{
  id: 0o2,
  title: '睡觉',
  done: true
},
{
  id: 0o3,
  title: '打豆豆',
  done: false
}]
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public todoList :{
    id: number,
    title: string,
    done: boolean
  }[] = JSON.parse(window.localStorage.getItem('todoList') || '[]')
  public editIndex:{
    id: number,
    title: string,
    done: boolean
  } = null
  public visibility: string = 'all'

  
  ngOnInit(){
    this.hashChange()
    window.onhashchange = this.hashChange.bind(this)
  }
  ngDoCheck(){
    window.localStorage.setItem('todoList', JSON.stringify(this.todoList))
  }
  hashChange(){
    let hash = window.location.hash
    switch (hash) {
      case '#/':
        this.visibility = 'all'
        break;
      case '#/active':
        this.visibility = 'active'
        break;
      case '#/completed':
        this.visibility = 'completed'
        break;
      default:
        break;
    }
  }
  addTodo (e:any):void {
    let newTodo : {
      id: number,
      title: string,
      done: boolean
    } = {
      id: this.todoList.length + 1,
      title: e.target.value,
      done: false
    }
    this.todoList.push(newTodo)
    e.target.value = ''
  }
  get allDone () {
    return this.todoList.every(t => t.done)
  }
  set allDone (val) {
    this.todoList.map(t => t.done = val)
  }
  removeTodo (index: number):void {
    this.todoList.splice(index, 1)
  }
  saveEdit (e: any, index: number):void {
    this.todoList[index].title =e.target.value
    this.editIndex = null
  }
  blurSave (e: any):void {
    const { target, keyCode} = e
    if(keyCode === 27){
      target.value = this.editIndex.title
      this.editIndex = null
    }
  }
  get toBeCompleted():number {
    return this.todoList.filter(t => !t.done).length
  }
  clearCompleted ():void {
    this.todoList = this.todoList.filter(t => !t.done)
  }
  get filterTodoList () {
    if(this.visibility === 'all'){
      return this.todoList
    }else if(this.visibility === 'active'){
      return this.todoList.filter(t => !t.done)
    }else if(this.visibility === 'completed'){
      return this.todoList.filter(t => t.done)
    }
  }
}
