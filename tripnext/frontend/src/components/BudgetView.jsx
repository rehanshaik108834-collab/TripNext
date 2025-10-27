import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Plus, DollarSign, Edit, Trash2 } from 'lucide-react';

const BudgetView = ({ trip }) => {
  const [expenses, setExpenses] = useState([
    { id: '1', category: 'Flights', amount: 546, description: 'Round trip flights' },
    { id: '2', category: 'Accommodation', amount: 1200, description: 'Hotel for 7 nights' },
    { id: '3', category: 'Activities', amount: 450, description: 'Tours and attractions' },
    { id: '4', category: 'Food', amount: 534, description: 'Restaurants and groceries' }
  ]);

  const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const budgetPercentage = trip.budget > 0 ? (totalSpent / trip.budget) * 100 : 0;
  const remaining = trip.budget - totalSpent;

  return (
    <div className="space-y-6">
      {/* Budget Overview */}
      <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-600">Total Budget</p>
            <p className="text-3xl font-bold text-gray-900">${trip.budget.toLocaleString()}</p>
          </div>
          <Button variant="ghost" size="sm">
            <Edit className="w-4 h-4" />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="relative w-full h-3 bg-white rounded-full overflow-hidden mb-2">
          <div
            className={`absolute top-0 left-0 h-full transition-all duration-300 ${
              budgetPercentage > 100 ? 'bg-red-500' : 'bg-[#FF6B4A]'
            }`}
            style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <div>
            <p className="text-gray-600">Spent</p>
            <p className="font-bold text-gray-900">${totalSpent.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-600">Remaining</p>
            <p className={`font-bold ${remaining < 0 ? 'text-red-600' : 'text-green-600'}`}>
              ${Math.abs(remaining).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Add Expense Button */}
      <Button
        className="w-full bg-[#FF6B4A] hover:bg-[#FF5536] text-white"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Expense
      </Button>

      {/* Expenses List */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-3">Expenses</h3>
        {expenses.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <DollarSign className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-600">No expenses recorded yet</p>
          </div>
        ) : (
          <div className="space-y-2">
            {expenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 group transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-900">{expense.category}</h4>
                    <p className="font-bold text-gray-900">${expense.amount.toLocaleString()}</p>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{expense.description}</p>
                </div>
                <div className="flex items-center space-x-1 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Category Breakdown */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-3">Category Breakdown</h3>
        <div className="space-y-2">
          {expenses.map((expense) => {
            const percentage = trip.budget > 0 ? (expense.amount / trip.budget) * 100 : 0;
            return (
              <div key={expense.id}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{expense.category}</span>
                  <span className="font-semibold">${expense.amount.toLocaleString()}</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#FF6B4A]"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BudgetView;