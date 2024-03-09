
import React, { createContext, useContext, ReactNode, useMemo } from "react";
import axios, { AxiosInstance } from "axios";

interface AxiosContextProps {
  children: ReactNode;
}

const AxiosContext = createContext<AxiosInstance | undefined>(undefined);

const axiosConfig = {
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-Type": "application/json",
  },
};

export const AxiosProvider: React.FunctionComponent<AxiosContextProps> = ({
  children,
}) => {
  const axiosInstance = useMemo(() => axios.create(axiosConfig), [axiosConfig]);

  return (
    <AxiosContext.Provider value={axiosInstance}>
      {children}
    </AxiosContext.Provider>
  );
};

export const useAxios = (): AxiosInstance => {
  const axiosInstance = useContext(AxiosContext);

  if (!axiosInstance) {
    throw new Error("useAxios debe usarse dentro de un AxiosProvider");
  }

  return axiosInstance;
};
