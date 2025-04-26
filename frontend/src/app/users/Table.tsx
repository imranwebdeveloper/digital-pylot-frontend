import { User } from "@/types";
import React, { useState } from "react";

const Table = ({ users }: { users: User[] }) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [details, setDetails] = useState<User | null>(null);
  console.log(details);
  return (
    <div>
      <table className="table-auto w-full p-4">
        <thead>
          <tr className="bg-gray-200 text-start ">
            <th className="text-start p-2">
              <input
                type="checkbox"
                className="w-4 h-4"
                checked={selectedRows.length === users.length}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedRows(users.map((item) => item.id.toString()));
                  } else {
                    setSelectedRows([]);
                  }
                }}
              />
            </th>
            <th className="text-start p-2">ID</th>
            <th className="text-start p-2">First Name</th>
            <th className="text-start p-2">Last Name</th>
            <th className="text-start p-2">Email</th>
            <th className="text-start p-2">Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <>
              <tr key={user.id} className="p-2">
                <td className="p-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                    checked={selectedRows.includes(user.id.toString())}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedRows([...selectedRows, user.id.toString()]);
                      } else {
                        const newCheckedRows = selectedRows.filter(
                          (id) => id !== user.id.toString()
                        );
                        setSelectedRows(newCheckedRows);
                      }
                    }}
                  />
                </td>
                <td className="p-2">{user.id}</td>
                <td
                  className="p-2 text-blue-500 cursor-pointer"
                  onClick={async () => {
                    try {
                      const res = await fetch(
                        `http://localhost:3000/api/users/${user.id}`
                      );
                      const userData = await res.json();
                      setDetails(userData);
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  {user.first_name}
                </td>
                <td className="p-2">{user.last_name}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user?.phone ? user.phone : "-"}</td>
              </tr>

              {details?.id === user.id ? (
                <>
                  <tr>
                    <td colSpan={8}>
                      <div className="w-full shadow-md ">
                        <table className="table-fixed w-full">
                          <thead>
                            <tr className="bg-gray-200">
                              <th className="p-2">Adreess 1</th>
                              <th className="p-2">Adreess 2</th>
                              <th className="p-2">Phone</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="text-center p-2">
                                {details.address1}
                              </td>
                              <td className="text-center p-2">
                                {" "}
                                {details.address2}
                              </td>
                              <td className="text-center p-2">
                                {" "}
                                {details.phone}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                </>
              ) : (
                ""
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
