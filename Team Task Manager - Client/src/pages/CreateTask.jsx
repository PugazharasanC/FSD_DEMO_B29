import React, { useState } from "react";
import {
  useCreateTaskMutation,
  useGetAllUsersQuery,
} from "../features/applicationApi";
import Loading from "../components/Loading";
import { ROLES } from "../constants/roles";

const CreateTask = ({ refetch }) => {
  const defaultState = {
    title: "",
    description: "",
    dueDate: "",
    assignedTo: "",
  };
  const [data, setData] = useState({ ...defaultState });
  const { data: res, isLoading } = useGetAllUsersQuery({
    role: ROLES.EMPLOYEE,
  });
  const [createTask, { isLoading: isTaskCreationLoading }] =
    useCreateTaskMutation();
  //   console.log(res);
  const handleChange = (event) => {
    console.log(event.target.name, event.target.value);
    setData((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
    console.log(data);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    await createTask(data).unwrap();
    setData({ ...defaultState });
    refetch();
  };
  if (isLoading) <Loading />;
  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          id="title"
          onChange={handleChange}
          value={data.title}
        />
        <input
          type="text"
          name="description"
          id="description"
          onChange={handleChange}
          value={data.description}
        />
        <input
          type="date"
          name="dueDate"
          id="dueDate"
          onChange={handleChange}
          value={data.dueDate}
        />
        {/*  assignedTo */}
        <select
          name="assignedTo"
          onChange={handleChange}
          value={data.assignedTo}
        >
          <option value="" selected>
            Unassigned
          </option>
          {res?.users
            .filter((user) => user.role === ROLES.EMPLOYEE)
            .map((user) => (
              <option
                value={user._id}
                key={user._id}
                selected={user._id === data.assignedTo}
              >
                {user.name} - ({user.role})
              </option>
            ))}
        </select>
        <button type="submit" disabled={isTaskCreationLoading}>
          {isTaskCreationLoading ? "Adding Task..." : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
