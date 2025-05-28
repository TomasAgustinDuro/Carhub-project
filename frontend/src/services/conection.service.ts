import axios from "axios";
import { Car } from "../interfaces/CarInterface";
import { Review } from "../interfaces/ReviewInterface";
import { User } from "../interfaces/UserInterface";
import { toast } from "sonner";
import { Turn } from "../interfaces/TurnType";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

const queryClient = useQueryClient();

// TODO: TYPE ALL RESPONSE

const getAllCars = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/cars`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener los autos: " + error);
  }
};

export const useGetCars = () => {
  return useQuery({
    queryKey: ["cars"],
    queryFn: getAllCars,
    staleTime: 1000 * 6 * 5,
  });
};

const getFilteredCars = async (body: {}) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/cars/filtered`,
      body
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useGetFilteredCars = () => {
  return useMutation({
    mutationFn: getFilteredCars,
    onSuccess: () => {},
    onError: (error: any) => {
      const message =
        error.response?.data?.message || error.message || "Error inesperado";
      toast.error(message);
    },
  });
};

const getCarById = async (id: string) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/cars/${id}`
    );
    const { carById } = response.data;

    return carById;
  } catch (error) {
    throw new Error("Error al obtener el auto: " + error);
  }
};

export const useGetCarById = (id: string) => {
  return useQuery({
    queryKey: ["cars", id],
    queryFn: () => getCarById(id),
    staleTime: 1000 * 6 * 5,
  });
};

const getAllReviews = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/reviews`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener las reviews: " + error);
  }
};

export const useGetReviews = () => {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: getAllReviews,
    staleTime: 1000 * 6 * 5,
  });
};

const addCar = async (body: Car) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/admin/cars/add`,
      body,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useAddCar = () => {
  return useMutation({
    mutationFn: addCar,
    onSuccess: () => {
      toast.success("Auto agregado exitosamente");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || error.message || "Error inesperado";
      toast.error(message);
    },
  });
};

export const getAllUsers = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/admin`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
    staleTime: 1000 * 6 * 5,
  });
};

const register = async (body: User) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/edmin/register`,
      body
    );

    return response.data;
  } catch (error) {
    console.error("Error al registrar el usuario", error);
    throw error;
  }
};

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      toast.success("Usuario registrado exitosamente");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || error.message || "Error inesperado";
      toast.error(message);
    },
  });
};

const deleteUser = async (id: string) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/admin/remove/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response.data;
  } catch (error) {
    console.error("Error al eliminar el usuario", error);
    throw error;
  }
};

export const userDeleteUser = () => {
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success("Usuario eliminado exitosamente");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || error.message || "Error inesperado";
      toast.error(message);
    },
  });
};

const login = async (body: User) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/login`,
      body
    );

    return response.data;
  } catch (error) {
    console.error("Error al iniciar sesión", error);
    throw error;
  }
};

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      const token = response.token;
      toast.success("Inicio de sesión exitoso");
      localStorage.setItem("token", token);
    },

    onError: (error: any) => {
      const message =
        error.response?.data?.message || error.message || "Error inesperado";
      toast.error(message);
    },
  });
};

const createReview = async (body: Review) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/reviews/create`,
      body
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useCreateReview = () => {
  const queryClient = useQueryClient(); // 💡 esto sí se puede usar dentro de hooks

  return useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      toast.success("Reseña creada exitosamente");
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || error.message || "Error inesperado";
      toast.error(message);
    },
  });
};

// TURNS

const getTurns = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/turns/`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useGetTurns = () => {
  return useQuery({
    queryKey: ["turns"],
    queryFn: getTurns,
    staleTime: 1000 * 6 * 5,
  });
};

const reserveTurn = async (body: Turn) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/turns/create`,
      body
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useReserveTurn = () => {
  return useMutation({
    mutationFn: reserveTurn,
    onSuccess: () => {
      toast.success("Turno reservado exitosamente");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || error.message || "Error inesperado";
      toast.error(message);
    },
  });
};

const deleteTurn = async (id: string) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/turns/delete/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response.data;
  } catch (error) {
    console.error("Error al eliminar el turno", error);
    throw error;
  }
};

export const useDeleteTurn = () => {
  return useMutation({
    mutationFn: deleteTurn,
    onSuccess: () => {
      toast.success("Turno eliminado exitosamente");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || error.message || "Error inesperado";
      toast.error(message);
    },
  });
};

const editCar = async (body: Car) => {
  const id = body.id;
  const token = localStorage.getItem("token");
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/admin/cars/${id}`,
      body,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response.data;
  } catch (error) {
    console.error("Error al editar el auto", error);
    throw error;
  }
};

export const useEditCar = () => {
  return useMutation({
    mutationFn: editCar,
    onSuccess: () => {
      toast.success("Auto editado exitosamente");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || error.message || "Error inesperado";
      toast.error(message);
    },
  });
};

const deleteCars = async (id: string) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/admins/cars/delete/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useDeleteCars = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCars,
    onSuccess: () => {
      toast.success("Auto eliminado exitosamente");
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || error.message || "Error inesperado";
      toast.error(message);
    },
  });
};

// IMAGE
const deleteImage = async (id: string) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/images/delete/${id}`
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useDeleteImages = () => {
  return useMutation({
    mutationFn: deleteImage,
    onSuccess: () => {
      toast.success("Imagen eliminada exitosamente");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || error.message || "Error inesperado";
      toast.error(message);
    },
  });
};
