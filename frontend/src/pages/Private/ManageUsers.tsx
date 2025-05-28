import { useState } from "react";
import {
  useGetAllUsers,
  userDeleteUser,
} from "../../services/conection.service";
import { IoTrashOutline } from "react-icons/io5";

const ManagerUsers = () => {
  const { data } = useGetAllUsers();
  const { mutate } = userDeleteUser();

  if (!data) {
    return;
  }

  const handleDeleteUser = (id: string) => {
    mutate(id);
  };

  return (
    <div>
      {data ? (
        data.users.map((user, index) => (
          <div key={index} className="flex justify-between">
            <div className="flex gap-1">
              <h3 className="font-semibold ">Username: </h3>
              <p>{user.username}</p>
            </div>
            <div>
              <button
                className="p-3 h-1/2 cursor-pointer
                   rounded flex items-center border border-gray-200 shadow-md"
                onClick={() => handleDeleteUser(user.id)}
              >
                <IoTrashOutline className="text-red-600 text-xl" />
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="p-5 w-full h-1/2 bg-gray-100 text-center">
          <h3>No hay usuarios disponibles</h3>
        </div>
      )}
    </div>
  );
};

export default ManagerUsers;
