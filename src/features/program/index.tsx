import {
  CalendarDaysIcon,
  CheckIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import type { MRT_ColumnDef } from "material-react-table";
import MaterialReactTable from "material-react-table";
import moment from "moment";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { IProgram, useGetProgramsQuery } from "../../app/services/programs";
import { IAttendance } from "../../app/services/residents";
import { Button } from "../../components/Button";

export function Programs() {
  const navigate = useNavigate();

  const {
    data: programs,
    isLoading,
    isError,
    isFetching,
  } = useGetProgramsQuery();

  const attendanceColumns = useMemo<MRT_ColumnDef<IAttendance>[]>(
    () => [
      {
        accessorKey: "residentId", //access nested data with dot notation
        header: "Resident",
        size: 50,
      },
      {
        accessorKey: "status", //access nested data with dot notation
        header: "Status",
      },
    ],
    []
  );

  const columns = useMemo<MRT_ColumnDef<IProgram>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "location",
        header: "Location",
      },
      {
        accessorKey: "allDay",
        header: "All Day?",
        accessorFn: (row) =>
          row.allDay === true ? (
            <CheckIcon className="w-6 h-6" />
          ) : (
            <XMarkIcon className="w-6 h-6" />
          ),
      },
      {
        accessorKey: "start",
        header: "Start",
        enableColumnFilter: false,
        accessorFn: (row) =>
          moment.utc(row.start).format("yyyy-MM-DD HH:mm:ss A"),
      },
      {
        accessorKey: "end",
        header: "End",
        enableColumnFilter: false,
        accessorFn: (row) =>
          moment.utc(row.end).format("yyyy-MM-DD HH:mm:ss A"),
      },
      {
        accessorKey: "tags",
        header: "Tags",
        accessorFn: (row) => row.tags.join(", "),
      },
      {
        accessorKey: "dimension",
        header: "Dimension",
      },
      {
        accessorKey: "facilitators",
        header: "Facilitators",
        accessorFn: (row) => row.tags.join(", "),
      },
      {
        accessorKey: "levelOfCare",
        header: "Level Of Care",
        accessorFn: (row) => row.levelOfCare.join(", "),
      },
      {
        accessorKey: "hobbies",
        header: "Hobbies",
        accessorFn: (row) => row.hobbies.join(", "),
      },
      {
        accessorKey: "recurrence",
        header: "Recurrence",
        accessorFn: (row) => row.recurrence?.frequency,
      },
      {
        accessorKey: "isRepeated",
        header: "Is Repeated?",
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        enableColumnFilter: false,
        accessorFn: (row) =>
          moment.utc(row.createdAt).format("yyyy-MM-DD HH:mm:ss A"),
      },
      {
        accessorKey: "updatedAt",
        header: "Updated At",
        enableColumnFilter: false,
        accessorFn: (row) =>
          moment.utc(row.updatedAt).format("yyyy-MM-DD HH:mm:ss A"),
      },
    ],
    []
  );

  return (
    <div className="w-full">
      <h1 className="flex items-center text-3xl font-normal leading-normal mt-0 mb-2">
        <CalendarDaysIcon className="h-8 w-8" /> Programs
      </h1>

      <Button
        type="button"
        variant="primary"
        icon={<PlusIcon className="mr-2 h-5 w-5 text-white-500" />}
        onClick={() => navigate("/program/add")}
      >
        Add Program
      </Button>

      <MaterialReactTable
        columns={columns}
        data={programs || []}
        enableStickyHeader
        initialState={{ density: "compact" }}
        muiToolbarAlertBannerProps={
          isError
            ? {
                color: "error",
                children: "Error loading data",
              }
            : undefined
        }
        state={{
          isLoading,
          showAlertBanner: isError,
          showProgressBars: isFetching,
        }}
        renderDetailPanel={({ row }) => (
          <MaterialReactTable
            enableColumnActions={false}
            enableColumnFilters={false}
            enablePagination={false}
            enableSorting={false}
            enableBottomToolbar={false}
            enableTopToolbar={false}
            initialState={{
              density: "compact",
              pagination: { pageSize: 5, pageIndex: 0 },
            }}
            data={row.original.attendance}
            columns={attendanceColumns}
          />
        )}
      />
    </div>
  );
}
