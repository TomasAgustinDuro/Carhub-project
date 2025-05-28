import axios from "axios";
import { Car } from "../interfaces/CarInterface";
import { Review } from "../interfaces/ReviewInterface";
import { User } from "../interfaces/UserInterface";
import { toast } from "sonner";
import { Turn } from "../interfaces/TurnType";
import { useMutation, useQuery } from "@tanstack/react-query";

// TODO: TYPE ALL RESPONSE

const getAllCars = async () => {
  try {
    const response = await axios.get("http://localhost:5000/cars/");
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
      "http://localhost:5000/cars/filtered",
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
    onSuccess: (data) => {},
    onError: (error) => {
      const message =
        error.response?.data?.message || error.message || "Error inesperado";
      toast.error(message);
    },
  });
};

const getCarById = async (id: string) => {
  try {
    const response = await axios.get(`http://localhost:5000/cars/${id}`);
    const { carById } = response.data;
    console.log("carById", carById);
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
    const response = await axios.get("http://localhost:5000/reviews/");
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
      "http://localhost:5000/admin/cars/add",
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
    onSuccess: (data) => {
      toast.success("Auto agregado exitosamente");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || error.message || "Error inesperado"
      );
    },
  });
};

export const getAllUsers = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get("http://localhost:5000/admin/", {
      headers: { Authorization: `Bearer ${token}` },
    });
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
      "http://localhost:5000/edmin/register",
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
    onSuccess: (data) => {
      toast.success("Usuario registrado exitosamente");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || error.message || "Error inesperado"
      );
    },
  });
};

const deleteUser = async (id: string) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.delete(
      `http://localhost:5000/admin/remove/${id}`,
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
    onSuccess: (data) => {
      toast.success("Usuario eliminado exitosamente");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || error.message || "Error inesperado"
      );
    },
  });
};

const login = async (body: User) => {
  try {
    const response = await axios.post("http://localhost:5000/login", body);

    console.log("response", response.data);
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

    onError: (error) => {
      toast.error(
        error.response?.data?.message || error.message || "Error inesperado"
      );
    },
  });
};

const createReview = async (body: Review) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/reviews/create",
      body
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useCreateReview = () => {
  return useMutation({
    mutationFn: createReview,
    onSuccess: (data) => {
      toast.success("Reseña creada exitosamente");
    },
    onError: (error) => {
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
    const response = await axios.get("http://localhost:5000/turns/", {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log(response);

    return response.data;
  } catch (error) {
    console.log("Error al obtener los turnos", error);
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
  console.log("body", body);
  try {
    const response = await axios.post(
      "http://localhost:5000/turns/create",
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
    onSuccess: (data) => {
      toast.success("Turno reservado exitosamente");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || error.message || "Error inesperado"
      );
    },
  });
};

const deleteTurn = async (id: string) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.delete(
      `http://localhost:5000/turns/delete/${id}`,
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
    onSuccess: (data) => {
      toast.success("Turno eliminado exitosamente");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || error.message || "Error inesperado"
      );
    },
  });
};

const editCar = async (body: Car) => {
  const id = body.id;
  const token = localStorage.getItem("token");
  try {
    const response = await axios.put(
      `http://localhost:5000/admin/cars/${id}`,
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
    onSuccess: (data) => {
      toast.success("Auto editado exitosamente");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || error.message || "Error inesperado"
      );
    },
  });
};

const deleteCars = async (id: string) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.delete(
      `http://localhost:5000/admin/cars/delete/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useDeleteCars = () => {
  return useMutation({
    mutationFn: deleteCars,
    onSuccess: (data) => {
      toast.success("Auto eliminado exitosamente");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || error.message || "Error inesperado"
      );
    },
  });
};

// IMAGE
const deleteImage = async (id: string) => {
  console.log("image", id);
  try {
    const response = await axios.delete(
      `http://localhost:5000/images/delete/${id}`
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useDeleteImages = () => {
  return useMutation({
    mutationFn: deleteImage,
    onSuccess: (data) => {
      toast.success("Imagen eliminada exitosamente");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || error.message || "Error inesperado"
      );
    },
  });
};
