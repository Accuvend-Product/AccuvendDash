import { createContext, useContext, useState } from "react";

const PartnerDataContext = createContext();

export const usePartnerData = () => {
    return useContext(PartnerDataContext);
};

export const PartnerDataProvider = ({ children }) => {
    const [tableData, setTableData] = useState([]);
    const [totalTransactions, setTotalTransactions] = useState(0);

    const value = {
        tableData,
        setTableData,
        totalTransactions,
        setTotalTransactions,
    };

    return (
        <PartnerDataContext.Provider value={value}>
            {children}
        </PartnerDataContext.Provider>
    );
};
