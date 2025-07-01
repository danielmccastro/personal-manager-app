import { createContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";

export const AppContext = createContext();

function AppProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [task, setTask] = useState([]);
    const [priorityTask, setPriorityTask] = useState(null);
    const [revenue, setRevenue] = useState([]);
    const [expense, setExpense] = useState([]);


    useEffect(() => {
        async function loadFonts() {
            setLoading(true);
            await Font.loadAsync({
                InterLight: require('../assets/fonts/Inter_300Light.ttf'),
                InterRegular: require('../assets/fonts/Inter_400Regular.ttf'),
                InterSemiBold: require('../assets/fonts/Inter_600SemiBold.ttf'),
                InterBold: require('../assets/fonts/Inter_700Bold.ttf'),
            });
            setLoading(false);
            setFontsLoaded(true);
        }
        loadFonts();
    }, []);

    useEffect(() => {
        async function loadStorage() {
            setLoading(true);
            try {
                const storageTask = await AsyncStorage.getItem('@storageTask');
                setTask(storageTask ? JSON.parse(storageTask) : []);

                const storageRevenue = await AsyncStorage.getItem('@storageRevenue');
                setRevenue(storageRevenue ? JSON.parse(storageRevenue) : []);

                const storageExpense = await AsyncStorage.getItem('@storageExpense');
                setExpense(storageExpense ? JSON.parse(storageExpense) : []);

            } catch (err) {
                console.error("Error loading data:", err);
            } finally {
                setLoading(false);
            }
        }
        loadStorage()
    }, []);

    async function addTask(taskDescription, priority = false) {
        try {
            if (!taskDescription) {
                Alert.alert('The task cannot be empty.');
                return;
            }

            const existingTaskIndex = task.findIndex(t => t.description === taskDescription);

            if (existingTaskIndex !== -1) {
                const updatedTasks = [...task];
                updatedTasks[existingTaskIndex].priority = priority;
                await AsyncStorage.setItem('@storageTask', JSON.stringify(updatedTasks));
                setTask(updatedTasks);
                Alert.alert('Priority updated!');
            } else {
                const newTask = {
                    description: taskDescription,
                    priority: priority,
                };

                const updatedTasks = [...task, newTask];
                await AsyncStorage.setItem('@storageTask', JSON.stringify(updatedTasks));
                setTask(updatedTasks);
                Alert.alert('New task created!');
            }
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    async function deleteTask(index) {
        try {
            const updatedTasks = task.filter((_, i) => i !== index);
            await AsyncStorage.setItem('@storageTask', JSON.stringify(updatedTasks));
            setTask(updatedTasks);
            Alert.alert('Task deleted successfully!');
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    async function markAsPriority(index) {
        try {

            const updatedTasks = [...task];

            updatedTasks.forEach((task, i) => {
                if (i !== index) {
                    task.priority = false;
                }
            });

            updatedTasks[index].priority = true;

            setTask(updatedTasks);
            await AsyncStorage.setItem('@storageTask', JSON.stringify(updatedTasks));
            Alert.alert(`Task "${updatedTasks[index].description}" marked as priority!`);
        } catch (error) {
            console.error('Error marking task as priority:', error);
        }
    };

    async function getPriorityTask() {
        try {
            const storageTasks = await AsyncStorage.getItem('@storageTask');
            const parsedTasks = storageTasks ? JSON.parse(storageTasks) : [];
            const priorityTask = parsedTasks.find(t => t.priority);
            setPriorityTask(priorityTask);
            return priorityTask || null;
        } catch (error) {
            console.error('Error fetching the priority task:', error);
            return null;
        }
    };

    async function addRevenue(amount, description) {
        try {
            if (!amount || !description) {
                Alert.alert('Revenue and description must not be empty.');
                return;
            }

            const cleanedAmount = amount.trim().replace(',', '.');

            const parsedAmount = parseFloat(cleanedAmount);

            if (isNaN(parsedAmount)) {
                Alert.alert('Amount must be a valid number.');
                return;
            }

            const amountRounded = parsedAmount.toFixed(2);

            const newRevenue = {
                amount: amountRounded,
                description
            };

            const updatedRevenues = [...revenue, newRevenue];
            await AsyncStorage.setItem('@storageRevenue', JSON.stringify(updatedRevenues));
            setRevenue(updatedRevenues);
            console.log('Revenue added successfully!');
        } catch (error) {
            console.error('Error adding revenue:', error);
        }
    }


    async function deleteRevenue(index) {
        try {
            const updatedRevenues = revenue.filter((_, i) => i !== index);
            await AsyncStorage.setItem('@storageRevenue', JSON.stringify(updatedRevenues));
            setRevenue(updatedRevenues);
            console.log('Revenue deleted successfully!');
        } catch (error) {
            console.error('Error deleting revenue:', error);
        }
    };

    async function addExpense(amount, description) {
        try {
            if (!amount || !description) {
                Alert.alert('Expense and description must not be empty.');
                return;
            }

            const cleanedAmount = amount.trim().replace(',', '.');
            const parsedAmount = parseFloat(cleanedAmount);

            if (isNaN(parsedAmount)) {
                Alert.alert('Amount must be a number.');
                return;
            }

            const amountFloat = parsedAmount.toFixed(2);

            const newExpense = { amount: amountFloat, description };
            const updatedExpenses = [...expense, newExpense];
            await AsyncStorage.setItem('@storageExpense', JSON.stringify(updatedExpenses));
            setExpense(updatedExpenses);
            console.log('Expense added successfully!');
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    }


    async function deleteExpense(index) {
        try {
            const updatedExpenses = expense.filter((_, i) => i !== index);
            await AsyncStorage.setItem('@storageExpense', JSON.stringify(updatedExpenses));
            setExpense(updatedExpenses);
            console.log('Expense deleted successfully!');
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    };

    function sumAmount(register) {
        let sum = 0;
        sum = register.reduce((acc, curr) => acc + Number(curr.amount), 0);
        return sum;
    }

    return (
        <AppContext.Provider value={{
            loading,
            fontsLoaded,
            task,
            setTask,
            addTask,
            deleteTask,
            markAsPriority,
            priorityTask,
            getPriorityTask,
            revenue,
            setRevenue,
            expense,
            setExpense,
            addRevenue,
            deleteRevenue,
            addExpense,
            deleteExpense,
            sumAmount
        }}>
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider;