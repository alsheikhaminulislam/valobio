import React, { createContext, useContext, ReactNode } from "react";

import holder from "./utilitys/holder";
import https from "./utilitys/https";


// Define the type for the context value
interface AppContextType {

    holder: holder;
    https: https;
}

// Create the context with the default value of the correct type
const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
    children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    return (
        <AppContext.Provider
            value={{
                holder: new holder(),
                https: new https(new holder().host())
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

const useGlobalContext = (): AppContextType => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useGlobalContext must be used within an AppProvider");
    }
    return context;
};

export { AppContext, AppProvider, useGlobalContext };
