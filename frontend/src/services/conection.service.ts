import axios from "axios";
import { Car } from "../interfaces/CarInterface";
import { Review } from "../interfaces/ReviewInterface";
import { User } from "../interfaces/UserInterface";
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
  console.log("body", body);
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
    onSuccess: (data) => {
      console.log("Autos filtrados:", data.cars);
      console.log("Total encontrados:", data.total);
    },
    onError: (error) => {
      throw error;
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

export const useGetAddCar = () => {
  return useMutation({
    mutationFn: addCar,
    onSuccess: (data) => {
      console.log("Auto eliminado exitosamente", data);
    },
    onError: (error) => {
      console.error("Error al eliminar el auto", error);
    },
  });
};

export const getAllUser = async () => {
  try {
    const response = await axios.get("http://localhost:5000/user/");
    return response.data;
  } catch (error) {
    throw error;
  }
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
      console.log(data);
    },
    onError: (error) => {
      throw error;
    },
  });
};

const login = async (body: User) => {
  console.log("body", body);
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
      console.log("token prueba", token);
      localStorage.setItem("token", token);
    },

    onError: (error) => {
      throw error;
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
      console.log(data);
    },
    onError: (error) => {
      throw error;
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
      console.log("onSucess", data);
    },
    onError: (error) => {
      console.log("onError", error);
      throw error;
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
      console.log("Turno eliminado exitosamente", data);
    },
    onError: (error) => {
      throw error;
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
      console.log("Auto eliminado exitosamente", data);
    },
    onError: (error) => {
      throw error;
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
      console.log("Auto eliminado exitosamente", data);
    },
    onError: (error) => {
      throw error;
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
      console.log("Image eliminado exitosamente", data);
    },
    onError: (error) => {
      throw error;
    },
  });
};
