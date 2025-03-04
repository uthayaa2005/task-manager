import React, { useState } from 'react';
import { CheckCircle, Circle, Trash2, Edit, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onDelete, onUpdate }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const startEditing = (task: Task) => {
    setEditingId(task.id);
    setEditText(task.title);
  };

  const saveEdit = (id: string) => {
    if (editText.trim()) {
      onUpdate(id, editText.trim());
    }
    setEditingId(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <AnimatePresence>
      {tasks.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {tasks.map((task, index) => (
            <motion.li 
              key={task.id} 
              className="py-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              layout
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-grow">
                  <motion.button
                    onClick={() => onToggle(task.id)}
                    className="mr-3 focus:outline-none"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {task.completed ? (
                      <CheckCircle className="text-success-500" size={24} />
                    ) : (
                      <Circle className="text-primary-400 hover:text-primary-600" size={24} />
                    )}
                  </motion.button>
                  
                  {editingId === task.id ? (
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="flex-grow px-3 py-2 border border-primary-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                      autoFocus
                      onKeyDown={(e) => e.key === 'Enter' && saveEdit(task.id)}
                    />
                  ) : (
                    <motion.div 
                      className="flex-grow"
                      initial={false}
                      animate={{ 
                        color: task.completed ? '#9ca3af' : '#1f2937',
                        textDecoration: task.completed ? 'line-through' : 'none'
                      }}
                    >
                      <span className={`text-lg ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                        {task.title}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        Created: {formatDate(task.createdAt)}
                      </p>
                    </motion.div>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  {editingId === task.id ? (
                    <motion.button
                      onClick={() => saveEdit(task.id)}
                      className="text-primary-500 hover:text-primary-700 focus:outline-none"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Save size={20} />
                    </motion.button>
                  ) : (
                    <motion.button
                      onClick={() => startEditing(task)}
                      className="text-secondary-500 hover:text-secondary-700 focus:outline-none"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Edit size={20} />
                    </motion.button>
                  )}
                  
                  <motion.button
                    onClick={() => onDelete(task.id)}
                    className="text-danger-500 hover:text-danger-700 focus:outline-none"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Trash2 size={20} />
                  </motion.button>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      ) : null}
    </AnimatePresence>
  );
};

export default TaskList;