import { Pagination } from "@/types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const PaginationUI = ({
  pagination,
  setQuery,
}: {
  pagination: Pagination;
  setQuery: ({ limit, page }: { limit: number; page: number }) => void;
}) => {
  const router = useRouter();

  const genaratePagiBtn = () => {
    let btns = [];
    if (pagination.page > 7) {
      for (let i = 1; i <= 7; i++) {
        btns.push(i);
      }
    } else if (pagination.page <= 3) {
      btns.push(
        1,
        2,
        3,
        "...",
        pagination.pages - 2,
        pagination.pages - 1,
        pagination.pages
      );
    }
    return btns;
  };

  return (
    <div className="flex justify-between p-2 bg-gray-200 items-center">
      <div className="flex gap-2 items-center">
        <p>Rows Per Page</p>
        <select
          value={pagination?.limit}
          onChange={(e) => setQuery({ limit: +e.target.value, page: 1 })}
        >
          <option value="10"> 10</option>

          <option value="20"> 20</option>
          <option value="30"> 30</option>
          <option value="50"> 50</option>
        </select>
      </div>
      <div className="flex gap-2 ">
        {genaratePagiBtn().map((item, i) => {
          return (
            <button
              key={i}
              onClick={() => setQuery({ limit: pagination.limit, page: item })}
              className={`p-2 cursor-pointer rounded-md ${
                pagination.page.toString() === item.toString()
                  ? " text-blue-700 "
                  : ""
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      <div className="flex gap-4 items-center">
        <p>Go To Page</p>
        <button
          disabled={pagination.total === pagination.page}
          onClick={() => {
            router.push(`/users?page=${pagination.page + 1}`);
          }}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default PaginationUI;
