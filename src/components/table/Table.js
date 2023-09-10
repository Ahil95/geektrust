import React, { useMemo, useState } from "react";
import Rows from "../rows/Rows";
import "./Table.css";
import ReactPaginate from "react-paginate";
import Pagination from "../pagination/Pagination";
import { toast } from "react-toastify";

const Table = ({ users, setUsers }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  //Function for filtering users
  const filteredUsers = useMemo(() => {
    return users?.filter((user) => {
      return (
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [searchQuery, users]);

  //Updating user array
  const currentData = useMemo(() => {
    const startIndex = currentPage * 10;
    const endIndex = startIndex + 10;
    return filteredUsers?.slice(startIndex, endIndex);
  }, [currentPage, filteredUsers]);

  // Function to handle page change
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  const handleJumpToFirst = () => {
    setCurrentPage(0);
  };

  // Function to jump to the last page
  const handleJumpToLast = () => {
    setCurrentPage(Math.ceil(users?.length / 10) - 1);
  };

  //Function to select a single checkbox
  const handleCheckboxChange = (userID) => {
    if (selectedItems.includes(userID)) {
      setSelectedItems(selectedItems.filter((id) => id !== userID));
    } else {
      setSelectedItems([...selectedItems, userID]);
    }
    console.log(userID);
  };

  //Function to select all checkbox in page
  const handleSelectAllChange = (e) => {
    if (!selectAll) {
      setSelectedItems(currentData.map((user) => user.id));
    } else {
      setSelectedItems([]);
    }
    setSelectAll(!selectAll);
  };

  //Function for deleting single row
  const deleteRow = (userID) => {
    console.log(userID);
    const updatedUsers = users.filter((user) => user.id !== userID);
    setUsers(updatedUsers);
    setSelectedItems(selectedItems.filter((id) => id !== userID));
    setSelectAll(false);
    toast.success("Deleted Row Successfully");
  };

  //Function for deleting selected rows
  const deleteSelected = () => {
    if (selectedItems.length <= 0) {
      toast.error("Please Select the row to be deleted");
      return;
    }
    const updatedUsers = users?.filter(
      (user) => !selectedItems.includes(user.id)
    );
    setUsers(updatedUsers);
    setSelectedItems([]);
    setSelectAll(false);
    toast.success("Deleted Rows Successfully");
  };

  //Function for Saving users after editing
  const onSave = (editedUser) => {
    const userIndex = users.findIndex((user) => user.id === editedUser.id);

    if (userIndex !== -1) {
      const updatedUsers = [...users];
      updatedUsers[userIndex] = editedUser;
      setUsers(updatedUsers);
    }
    toast.success("Updated Users Successfully");
  };

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Search by name,email or role"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="searchInput"
      />

      <table>
        <tr className="tableRow">
          <th>
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAllChange}
            />
          </th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>

        {currentData?.map((user, index) => (
          <Rows
            user={user}
            index={user?.id}
            key={user?.id}
            handleCheckboxChange={handleCheckboxChange}
            selectedItems={selectedItems}
            deleteRow={deleteRow}
            setUsers={setUsers}
            onSave={onSave}
            selected={selectedItems.includes(user?.id)}
          />
        ))}
      </table>
      <div className="paginationFlex">
        <div>
          <Pagination
            users={users}
            handlePageChange={handlePageChange}
            handleJumpToFirst={handleJumpToFirst}
            handleJumpToLast={handleJumpToLast}
            currentPage={currentPage}
          />
        </div>
        <div>
          <button className="deleteButton" onClick={deleteSelected}>
            Delete Selected
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
