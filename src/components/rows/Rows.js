import React, { useState } from "react";
import "./Row.css";

const Rows = ({
  user,
  selected,
  selectedItems,
  index,
  handleCheckboxChange,
  onSave,
  deleteRow,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  //Handling Edit functionality
  const handleEditClick = () => {
    setIsEditing(true);
  };

  //handling Save functionality
  const handleSaveClick = () => {
    onSave(editedUser);
    setIsEditing(false);
  };

  return (
    <tr className={selected ? "activeRow" : ""}>
      <td>
        <input
          type="checkbox"
          checked={selectedItems.includes(index)}
          onChange={(e) => handleCheckboxChange(index)}
        />
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            value={editedUser.name}
            onChange={(e) =>
              setEditedUser((prevUser) => ({
                ...prevUser,
                name: e.target.value,
              }))
            }
          />
        ) : (
          user.name
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            value={editedUser.email}
            onChange={(e) =>
              setEditedUser({ ...editedUser, email: e.target.value })
            }
          />
        ) : (
          user.email
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            value={editedUser.role}
            onChange={(e) =>
              setEditedUser({ ...editedUser, role: e.target.value })
            }
          />
        ) : (
          user.role
        )}
      </td>
      <td>
        {isEditing ? (
          <span
            class="material-symbols-outlined save"
            onClick={handleSaveClick}
          >
            save
          </span>
        ) : (
          <>
            <span
              className="material-symbols-outlined delete"
              onClick={() => deleteRow(index)}
            >
              delete
            </span>

            <span
              className="material-symbols-outlined edit"
              onClick={handleEditClick}
            >
              edit_square
            </span>
          </>
        )}
      </td>
    </tr>
  );
};

export default Rows;
