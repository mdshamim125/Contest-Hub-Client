import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import UpdateUserModal from "../../../../pages/modals/UpdateUserModal";
import UpdateStatusModal from "../../../../pages/modals/UpdateStatusModal";
import { FaTrash, FaUserEdit, FaUserCheck, FaUserTimes } from "react-icons/fa";
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
          Swal.fire({
            title: "Deleted!",
            text: "User has been deleted successfully.",
            icon: "success",
          });
        } catch (err) {
          toast.error("Failed to delete user.");
        }
      }
    });
  };

  return (
    <tr className="hover:bg-blue-900/10 transition-colors duration-200">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-white">{user?.email}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
          ${user?.role === 'admin' ? 'bg-purple-100 text-purple-800' : 
            user?.role === 'creator' ? 'bg-blue-100 text-blue-800' : 
            'bg-green-100 text-green-800'}`}>
          {user?.role}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
          ${user?.status === 'Verified' ? 'bg-green-100 text-green-800' : 
            user?.status === 'Blocked' ? 'bg-red-100 text-red-800' : 
            'bg-yellow-100 text-yellow-800'}`}>
          {user?.status || 'Unavailable'}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
            title="Update Role"
          >
            <FaUserEdit className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsStatusOpen(true)}
            className="p-2 text-green-400 hover:text-green-300 transition-colors"
            title="Update Status"
          >
            <FaUserCheck className="w-5 h-5" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 text-red-400 hover:text-red-300 transition-colors"
            title="Delete User"
          >
            <FaTrash className="w-5 h-5" />
          </button>
        </div>
      </td>

      {/* Update User Modal */}
      <UpdateUserModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalHandler={modalHandler}
        user={user}
      />

      {/* Update Status Modal */}
      <UpdateStatusModal
        isOpen={isStatusOpen}
        setIsOpen={setIsStatusOpen}
        modalHandler={modalStatusHandler}
        user={user}
      />
    </tr>
  );
};

export default UserDataRow;
