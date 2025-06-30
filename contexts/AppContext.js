import { createContext, useState, useEffect } from "react";
import * as Font from "expo-font";

export const AppContext = createContext();

function AppProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const [fontsLoaded, setFontsLoaded] = useState(false);

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

    return (
        <AppContext.Provider value={{ loading, fontsLoaded }}>
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider;