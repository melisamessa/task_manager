import axios from "axios";
import axiosClient from "../../../api/AxiosClient";

export const getTasksByUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Usuario no autenticado");

  try {
    const response = await axios.get("/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener las tareas: ", error);
    throw new Error("No se pudieron obtener las tareas");
  }
};

export const createTask = async (taskData: {
  title: string;
  description: string | null;
  status: string;
  priority: string;
  dueDate: string | null;
  category: string | null;
}) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token no encontrado.");
    }

    const response = await axiosClient.post("/tasks/create", taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error("Error al crear la tarea");
    }
  }
};

export const updateTask = async (
  taskData: {
    title: string;
    description: string | null;
    status: string;
    priority: string;
    dueDate: string | null;
    category: string | null;
  },
  taskId: number
) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token no encontrado.");
    }

    const response = await axiosClient.put(`tasks/${taskId}`, taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error("Error al editar la tarea");
    }
  }
};

export const deleteTask = async (taskId: number) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token no encontrado.");
    }

    await axiosClient.delete(`tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, message: "Tarea eliminada correctamente" };
  } catch (error: any) {
    throw new Error("No se pudo eliminar la tarea");
  }
};
