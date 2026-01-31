import { useState, useMemo } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaTrash,
  FaEdit,
  FaEye,
} from "react-icons/fa";

import Button from "./Button";
import Input from "./Input";

export default function Table({
  columns = [],
  data = [],
  onDelete,
  onEdit,
  onView,
  searchableKey = "",
}) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const rowsPerPage = 5;

  // 🔍 Search filter
  const filteredData = useMemo(() => {
    let rows = data || [];

    if (search && searchableKey) {
      rows = rows.filter((row) =>
        String(row[searchableKey])
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    return rows;
  }, [data, search, searchableKey]);

  // 📄 Pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
      {/* Search */}
      {searchableKey && (
        <div className="mb-4 w-full sm:w-64">
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm">
              {columns.map((col) => (
                <th key={col.key} className="p-3 text-left">
                  {col.label}
                </th>
              ))}
              {(onDelete || onEdit || onView) && (
                <th className="p-3 text-center">Action</th>
              )}
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((row, i) => (
              <tr
                key={i}
                className="border-t hover:bg-gray-50 transition text-sm"
              >
                {columns.map((col) => (
                  <td key={col.key} className="p-3">
                    {row[col.key]}
                  </td>
                ))}

                {(onDelete || onEdit || onView) && (
                  <td className="p-3 text-center">
                    <div className="flex justify-center gap-2">
                      {onView && (
                        <Button
                          onClick={() => onView(row)}
                          className="p-2 bg-gray-100 text-gray-600 hover:bg-gray-200"
                        >
                          <FaEye />
                        </Button>
                      )}

                      {onEdit && (
                        <Button
                          onClick={() => onEdit(row)}
                          className="p-2 bg-blue-100 text-blue-600 hover:bg-blue-200"
                        >
                          <FaEdit />
                        </Button>
                      )}

                      {onDelete && (
                        <Button
                          onClick={() => onDelete(row)}
                          className="p-2 bg-red-600 text-red-600 hover:bg-red-700"
                        >
                          <FaTrash />
                        </Button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <span className="text-sm text-gray-500">
          Page {page} of {totalPages || 1}
        </span>

        <div className="flex gap-2">
          <Button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="p-2 bg-gray-200 text-gray-700"
          >
            <FaChevronLeft />
          </Button>

          <Button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="p-2 bg-gray-200 text-gray-700"
          >
            <FaChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
