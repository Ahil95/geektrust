import React, { useEffect, useState } from "react";
import Table from "../components/table/Table";
const Home = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getusers();
  }, []);
  const getusers = async () => {
    const response = await fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );
    const members = await response.json();
    setUsers(members);
    // console.log(users);
  };
  return (
    <div>
      <Table users={users} setUsers={setUsers} />
    </div>
  );
};

export default Home;
