import axios from "axios";
import axiosClient from "../../../api/AxiosClient";

export const getTasksByUser = async () => {
  const token = localStorage.getItem("token"); // Obtener el token del almacenamiento local
  if (!token) throw new Error("Usuario no autenticado");

  try {
    const response = await axios.get("/tasks", {
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token en el header
      },
    });
    return response.data; // Esto debería ser la lista de tareas
  } catch (error) {
    console.error("Error al obtener las tareas:", error);
    throw new Error("No se pudieron obtener las tareas");
  }
};

export const createTask = async (taskData: {
  title: string;
  description: string | null;
  status: string;
  expiration_date: string | null;
  category: string | null;
}) => {
  try {
    // Recuperar el token del localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token no encontrado.");
    }

    const response = await axiosClient.post("/tasks/create", taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data; // Retornamos la respuesta de la API
  } catch (error) {
    throw new Error("Error al crear la tarea.");
  }
};
