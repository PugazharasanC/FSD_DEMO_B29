import { useState } from "react";
import Loading from "../components/Loading";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "../features/applicationApi";
import { useSelector } from "react-redux";
import { ROLES } from "../constants/roles";

const User = () => {
  const { data, isLoading, refetch } = useGetAllUsersQuery();
  const thisUser = useSelector((s) => s.auth.user);
  const [editUserId, setEditUserId] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [updateRole, setUpdateRole] = useState("");
  const [deleteUser, { isLoading: isDeleteLoading }] = useDeleteUserMutation();
  const [updateUserRole, { isLoading: isUpdateLoading }] =
    useUpdateUserRoleMutation();
  if (isLoading || isDeleteLoading || isUpdateLoading) return <Loading />;
  const { users } = data;
  return (
    <div className="mx-auto max-w-3xl">
      <h3>User Management</h3>
      {/* <CreateUser /> */}
      <table className="w-full">
        <thead>
          <tr>
            <th>S. No</th>
            <th>Name</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>
                {isEditing && user._id == editUserId ? (
                  <select
                    value={updateRole}
                    onChange={(e) => setUpdateRole(e.target.value)}
                  >
                    <option value="">select</option>
                    <option value={ROLES.ADMIN}>{ROLES.ADMIN}</option>
                    <option value={ROLES.MANAGER}>{ROLES.MANAGER}</option>
                    <option value={ROLES.EMPLOYEE}>{ROLES.EMPLOYEE}</option>
                    <option value={ROLES.VIEWER}>{ROLES.VIEWER}</option>
                  </select>
                ) : (
                  user.role
                )}
              </td>

              <td className="flex gap-3">
                {user._id == thisUser._id ? (
                  <span>This is me</span>
                ) : (
                  <>
                    <button
                      onClick={async () => {
                        if (!isEditing) {
                          setEditUserId(user._id);
                          setIsEditing(true);
                        } else {
                          await updateUserRole({
                            id: editUserId,
                            role: updateRole,
                          });
                          setEditUserId("");
                          setIsEditing(false);
                          refetch();
                        }
                      }}
                      className="border-2"
                    >
                      {isEditing && user._id == editUserId ? "Update" : "Edit"}
                    </button>
                    <button
                      onClick={async () => {
                        const verify = confirm(
                          `Are you sure you wanna delete <b>${user.role}<b> </b>${user.name}</b>?`
                        );
                        if (verify) {
                          await deleteUser(user._id);
                          refetch();
                        }
                      }}
                      className="border-2"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
