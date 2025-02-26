import { createContext,useContext} from 'react';
import * as React from 'react';
interface NoReadNumbersContextType {
    noReadNumber: number | null;
    setNoReadNumber: React.Dispatch<React.SetStateAction<number | null>>;
  }
export const noReadNumbers = createContext<NoReadNumbersContextType>( { noReadNumber: null,
    setNoReadNumber: () => {}});
export const NoReadNumbers = ({ children }) => {
    const [noReadNumber, setNoReadNumber] = React.useState<number | null>(null);

    return (
      <noReadNumbers.Provider value={{noReadNumber, setNoReadNumber}}>
        {children}
      </noReadNumbers.Provider>
    );
    
};
export const useNoReadNumbers = () => useContext(noReadNumbers);