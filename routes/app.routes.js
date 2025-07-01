import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

import Home from "../pages/Home";
import Register from "../pages/Register";
import ToDoList from "../pages/ToDoList";

const Tab = createBottomTabNavigator();

export default function AppRoutes() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: "#FFF",
                    height: 60,
                    padding: 5,
                },
                tabBarActiveTintColor: "#73AF01",
                tabBarInactiveTintColor: "#000",
                tabBarLabelStyle: {
                    fontSize: 14,
                    marginBottom: 5,
                    fontFamily: "OpenSans",
                    textAlign: "center",
                },
                headerTitleStyle: {
                    color: "#000",
                    fontFamily: "InterRegular",
                    fontSize: 18,
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Entries"
                component={Register}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="edit" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Tasks"
                component={ToDoList}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="list" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}