import { createContext, useContext, useState } from "react";

const TransactionDataContext = createContext();

export const useTransactionData = () => {
    return useContext(TransactionDataContext);
};

export const TransactionDataProvider = ({ children }) => {
    const [tableData, setTableData] = useState([]);
    const [totalTransactions, setTotalTransactions] = useState(0);

    const value = {
        tableData,
        setTableData,
        totalTransactions,
        setTotalTransactions,
    };

    return (
        <TransactionDataContext.Provider value={value}>
            {children}
        </TransactionDataContext.Provider>
    );
};
