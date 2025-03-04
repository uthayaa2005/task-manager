import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2, CheckCircle, Circle, Edit, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';
import { Task } from './types';

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = (id: string, title: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <motion.header 
          className="mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-primary-700 mb-2">Task Manager</h1>
          <p className="text-secondary-600">Organize your tasks efficiently</p>
        </motion.header>
        
        <motion.div 
          className="bg-white rounded-lg shadow-lg p-6 mb-6 border-l-4 border-primary-500"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <TaskForm onAddTask={addTask} />
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-secondary-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-primary-700">Your Tasks</h2>
            {tasks.some(task => task.completed) && (
              <motion.button 
                onClick={clearCompleted}
                className="text-sm text-danger-500 hover:text-danger-700 font-medium px-3 py-1 rounded-full hover:bg-danger-50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Clear completed
              </motion.button>
            )}
          </div>
          
          <TaskFilter filter={filter} onFilterChange={setFilter} />
          
          <TaskList 
            tasks={filteredTasks} 
            onToggle={toggleTask} 
            onDelete={deleteTask}
            onUpdate={updateTask}
          />
          
          {filteredTasks.length === 0 && (
            <motion.div 
              className="text-center py-10 text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {filter === 'all' 
                ? 'No tasks yet. Add a task to get started!' 
                : filter === 'active' 
                  ? 'No active tasks.' 
                  : 'No completed tasks.'}
            </motion.div>
          )}
          
          <motion.div 
            className="mt-4 text-sm text-gray-500 border-t pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {tasks.length > 0 && (
              <div className="flex justify-between">
                <span className="px-2 py-1 bg-primary-50 text-primary-700 rounded-full">
                  {tasks.filter(t => !t.completed).length} tasks left
                </span>
                <span className="px-2 py-1 bg-secondary-50 text-secondary-700 rounded-full">
                  {tasks.filter(t => t.completed).length} completed
                </span>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;