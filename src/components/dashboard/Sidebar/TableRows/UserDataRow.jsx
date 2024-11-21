import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import UpdateUserModal from "../../../../pages/modals/UpdateUserModal";
import UpdateStatusModal from "../../../../pages/modals/UpdateStatusModal";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
const UserDataRow = ({ user, refetch }) => {
  const { user: loggedInUser } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { mutateAsync } = useMutation({
    mutationFn: async (role) => {
      const { data } = await axiosSecure.patch(
        `/users/update/${user?.email}`,
        role
      );
      return data;
    },
    onSuccess: (data) => {
      refetch();
      // console.log(data);
      toast.success("User role updated successfully!");
      setIsOpen(false);
    },
  });

  const { mutateAsync: updateUserStatus } = useMutation({
    mutationFn: async (status) => {
      const { data } = await axiosSecure.patch(
        `/users/update/status/${user?.email}`,
        status
      );
      return data;
    },
    onSuccess: (data) => {
      refetch();
      // console.log(data);
      toast.success("User status updated successfully!");
      setIsStatusOpen(false);
    },
  });

  const { mutateAsync: deleteUser } = useMutation({
    mutationFn: async () => {
      const { data } = await axiosSecure.delete(`/users/delete/${user?.email}`);
      return data;
    },
    onSuccess: () => {
      refetch();
      toast.success("User deleted successfully!");
    },
    onError: (error) => {
      // console.error(error);
      toast.error("Failed to delete user.");
    },
  });

  //   modal handler
  const modalHandler = async (selected) => {
    if (loggedInUser.email === user.email) {
      toast.error("Action Not Allowed");
      return setIsOpen(false);
    }

    const userRole = {
      role: selected,
    };

    try {
      await mutateAsync(userRole);
    } catch (err) {
      // console.log(err);
      toast.error(err.message);
    }
  };

  const modalStatusHandler = async (selected) => {
    if (loggedInUser.email === user.email) {
      toast.error("Action Not Allowed");
      return setIsOpen(false);
    }
    const userStatus = {
      status: selected,
    };
    try {
      await mutateAsync(userStatus);
    } catch (err) {
      // console.log(err);
      toast.error(err.message);
    }
  };
  const handleDelete = async () => {
    if (loggedInUser.email === user.email) {
      toast.error("Action Not Allowed");
      return;
    }
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          deleteUser();
          if (deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            // toast.success("deleted successfully");
          }
        } catch (err) {
          // console.log(err);
        }
      }
    });
  };
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 text-sm">
        <p className="text-white text-lg whitespace-no-wrap">{user?.email}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 text-sm">
        <p className="text-white text-lg whitespace-no-wrap">{user?.role}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 text-sm">
        {user?.status ? (
          <p
            className={`${
              user.status === "Verified" ? "text-green-500" : "text-yellow-500"
            } whitespace-no-wrap`}
          >
            {user.status}
          </p>
        ) : (
          <p className="text-red-500 whitespace-no-wrap">Unavailable</p>
        )}
      </td>

      <td className="flex justify-between items-center">
        <div className="px-5 py-5 border-b border-gray-200 text-sm">
          <button
            onClick={() => setIsOpen(true)}
            className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
            ></span>
            <span className="relative">Update Role</span>
          </button>
          {/* Update User Modal */}
          <UpdateUserModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            modalHandler={modalHandler}
            user={user}
          />
        </div>

        <div className="px-5 py-5 border-b border-gray-200 text-sm">
          <button
            onClick={() => setIsStatusOpen(true)}
            className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
            ></span>
            <span className="relative">Update Status</span>
          </button>
          {/* Update status Modal */}
          <UpdateStatusModal
            isOpen={isStatusOpen}
            setIsOpen={setIsStatusOpen}
            modalHandler={modalStatusHandler}
            user={user}
          />
        </div>
        <button
          onClick={handleDelete}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-red-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">
            <FaTrash />
          </span>
        </button>
      </td>
    </tr>
  );
};

export default UserDataRow;
