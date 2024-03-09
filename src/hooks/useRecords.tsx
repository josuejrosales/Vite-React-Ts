import { AxiosInstance } from "axios";
import { useState, useEffect } from "react";

interface FormatJson {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const useRecords = (axiosInstance: AxiosInstance) => {
  const [records, setRecords] = useState<FormatJson[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleError = (error: any, errorMessage: string) => {
    console.error(`${errorMessage}:`, error);
  };

  const handleRequest = async (
    request: () => Promise<any>,
    onSuccess: (data: any) => void,
    errorMessage: () => any
  ) => {
    try {
      setLoading(true);
      const response = await request();
      onSuccess(response.data);
    } catch (error) {
      handleError(error, errorMessage());
    } finally {
      setLoading(false);
    }
  };

  const fetchAll = () => {
    handleRequest(
      () => axiosInstance.get<FormatJson[]>("/posts"),
      (data) => setRecords(data),
      () => "Error al obtener los registros."
    );
  };

  const addItem = (newItem: FormatJson) => {
    handleRequest(
      () => axiosInstance.post<FormatJson>("/posts", newItem),
      () => setRecords((prevAll) => [newItem, ...prevAll]),
      () => "Error al agregar el registro."
    );
  };

  const updateItem = (id: number, updatedItem: FormatJson) => {
    // En este metodo de updateItem, no se puede actualizar los nuevos registros, ya que no estan en la api de {JSON} Placeholder.
    const resolve = (data: any) => {
      setRecords((prevAll) =>
        prevAll.map((item) => (item.id === id ? data : item))
      );
    };

    handleRequest(
      () => axiosInstance.put<FormatJson>(`/posts/${id}`, updatedItem),
      resolve,

      () => resolve(updatedItem) // si falla , solo actualiza registros almacenados.
    );
  };

  const removeItem = (id: number) => {
    handleRequest(
      () => axiosInstance.delete(`/posts/${id}`),
      () => setRecords((prevAll) => prevAll.filter((item) => item.id !== id)),
      () => "Error al eliminar el registro."
    );
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return { records, loading, addItem, updateItem, removeItem };
};
