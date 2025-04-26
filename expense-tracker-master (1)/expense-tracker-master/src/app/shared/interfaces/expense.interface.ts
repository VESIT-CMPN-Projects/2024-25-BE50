// Define the Expense interface
interface Expense {
  expense_id: number;
  user_id: number;
  category_name: number;
  income_expense: string;
  expense_name: string;
  expense_amount: number;
  expense_description: string;
  expense_date: Date;
  tags: string;
}

export default Expense;
