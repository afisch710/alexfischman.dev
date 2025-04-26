"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface VisibilityContextProps {
    isVisible: boolean;
}

const VisibilityContext = createContext<VisibilityContextProps | undefined>(undefined);

export const VisibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleVisibilityChange = () => {
            setIsVisible(document.visibilityState === "visible");
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        // Set initial state
        setIsVisible(document.visibilityState === "visible");

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    return (
        <VisibilityContext.Provider value={{ isVisible }}>
            {children}
        </VisibilityContext.Provider>
    );
};

export const useVisibility = () => {
    const context = useContext(VisibilityContext);
    if (context === undefined) {
        throw new Error("useVisibility must be used within a VisibilityProvider");
    }
    return context;
};