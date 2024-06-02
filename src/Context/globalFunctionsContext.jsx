import { createContext, useState } from "react";

export const GlobalFunctionContext = createContext(null);

export function GlobalFunctionContextProvider({ children }) {
    const isCreatedThisMonth = (createdAt) => {
        const createdDate = new Date(createdAt);
        const currentDate = new Date();
        return (
            createdDate.getMonth() === currentDate.getMonth() &&
            createdDate.getFullYear() === currentDate.getFullYear()
        );
    };

    function selectRandomColor() {
        // Define the array inside the function
        const texts = ["#FF899B", "#8E65FA", "#0CC0DF", "#F6B978", "#FF66C4", "hsl(148, 66%, 81%)"];
        // Generate a random index between 0 and 5
        const randomIndex = Math.floor(Math.random() * texts.length);
        // Return the text at the random index
        return texts[randomIndex];
    }

    // Use array destructuring to get the state variable and the function to update it
    const [product, setProduct] = useState(0);

    return (
        <GlobalFunctionContext.Provider value={{ isCreatedThisMonth, selectRandomColor, product, setProduct }}>
            {children}
        </GlobalFunctionContext.Provider>
    );
}
