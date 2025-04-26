"use client";

import PaginationUI from "@/components/common/PaginationUI";
import { Pagination, Query, User } from "@/types";
import React, { useEffect, useState } from "react";
import Table from "./Table";
// import { stringify } from "querystring";
import queryString from "querystring";

const Wrapper = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [query, setQuery] = useState<Query>({
    limit: 10,
    page: 1,
  });

  useEffect(() => {
    const queryStringify = queryString.stringify(query);
    const makeRequest = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/users?${queryStringify}`
        );
        const data = await res.json();
        setUsers(data?.data);
        setPagination(data?.meta);
      } catch (error) {
        console.log(error);
      }
    };
    makeRequest();
  }, [query]);
  return (
    <div className="container mx-auto max-w-7xl mt-10">
      <Table users={users} />
      {pagination && (
        <PaginationUI
          pagination={pagination}
          setQuery={({ limit, page }) => {
            console.log(limit);
            setQuery((pre) => {
              return {
                ...pre,
                limit,
                page,
              };
            });
          }}
        />
      )}
    </div>
  );
};

export default Wrapper;
