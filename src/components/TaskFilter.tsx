import React from 'react';
import { motion } from 'framer-motion';

interface TaskFilterProps {
  filter: string;
  onFilterChange: (filter: string) => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ filter, onFilterChange }) => {
  return (
    <div className="flex space-x-2 mb-4">
      <motion.button
        className={`px-4 py-2 rounded-full ${
          filter === 'all' 
            ? 'bg-primary-500 text-white shadow-md' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
        onClick={() => onFilterChange('all')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        All
      </motion.button>
      <motion.button
        className={`px-4 py-2 rounded-full ${
          filter === 'active' 
            ? 'bg-secondary-500 text-white shadow-md' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
        onClick={() => onFilterChange('active')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        Active
      </motion.button>
      <motion.button
        className={`px-4 py-2 rounded-full ${
          filter === 'completed' 
            ? 'bg-success-500 text-white shadow-md' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
        onClick={() => onFilterChange('completed')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        Completed
      </motion.button>
    </div>
  );
};

export default TaskFilter;