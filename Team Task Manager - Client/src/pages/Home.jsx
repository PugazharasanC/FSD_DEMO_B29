import React from "react";
import { useGetAllTasksQuery } from "../features/applicationApi";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";
import CreateTask from "./CreateTask";
import { ROLES } from "../constants/roles";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";

const Home = () => {
  const user = useSelector((s) => s.auth.user);
  // const navigate = useNavigate();
  // if (!user) {
  //   navigate("/login");
  // }
  const { data, isLoading: isLoadingTasks, refetch } = useGetAllTasksQuery();
  // const dispatch = useDispatch();
  // const res = getAllTasks();
  if (isLoadingTasks) return <Loading></Loading>;
  return (
    <div className="mx-auto max-w-3xl">
      <h2>Tasks</h2>
      {(user.role == ROLES.MANAGER || user.role == ROLES.ADMIN) && (
        <CreateTask refetch={refetch} />
      )}
      <table className=" border-2">
        <thead>
          <tr>
            <th>title</th>
            <th>description</th>
            <th>dueDate</th>
            <th>Assigned To</th>
            <th>CreatedBy</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {data.tasks.map((task) => (
            <tr className=" border-b-2" key={task._id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.dueDate}</td>
              <td>{task.assignedTo?.name}</td>
              <td>{task.createdBy?.name}</td>
              <td>delete, edit</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
