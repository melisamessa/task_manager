import axios from "axios";
import axiosClient from "../../../api/AxiosClient";

export const createProject = async (projectData: {
  title: String;
  description: String | null;
}) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token no encontrado.");
    }

    const response = await axiosClient.post(`/projects/create`, projectData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error("Error al crear el proyecto");
    }
  }
};

export const updateProject = async (
  projectData: {
    title: String;
    description: String | null;
  },
  projectId: number
) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token no encontrado.");
    }

    const response = await axiosClient.put(
      `/projects/edit/${projectId}`,
      projectData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error("Error al editar el proyecto");
    }
  }
};

export const deleteProject = async (projectId: number) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token no encontrado.");
    }

    await axiosClient.delete(`projects/${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, message: "Proyecto eliminado correctamente" };
  } catch (error: any) {
    throw new Error("No se pudo eliminar el proyecto");
  }
};
