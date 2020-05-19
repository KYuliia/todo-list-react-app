import React, { Component } from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';
import './app.css';

export default class App extends Component {
    maxId = 100;
    state = {
        todoData: [
            this.createToDoItem('Drink Coffee'),
            this.createToDoItem('Make Awesome App'),
            this.createToDoItem('Have a lunch'),
            this.createToDoItem('Have a lunch')
        ]
    }
    createToDoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    }
    deteleItem = (id) => {
        this.setState(({ todoData }) => {
            let idx = todoData.findIndex((el) => el.id === id);
            const newArray = [...todoData.splice(0, idx), ...todoData.splice(idx + 1)];
            return {
                todoData: newArray
            }
        })
    }
    addItem = (text) => {
        const newItem = this.createToDoItem(text);
        this.setState(({ todoData }) => {
            const newArr = [...todoData, newItem];
            return {
                todoData: newArr
            };
        })

    }
    toggleProperty = (arr, id, propName) => {
        let idx = arr.findIndex((el) => el.id === id);
        const oldItem = arr[idx];
        const newItem = { ...oldItem, [propName]: !oldItem[propName] };
        return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
    }
    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        })
    }
    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }
        })
    }
    render() {
        const { todoData } = this.state;
        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;
        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel />
                    <ItemStatusFilter />
                </div>

                <TodoList todos={this.state.todoData}
                    onDeleted={this.deteleItem}
                    onToggleDone={this.onToggleDone}
                    onToggleImportant={this.onToggleImportant}
                />
                <ItemAddForm onAdd={this.addItem} />
            </div>
        );

    }
};
