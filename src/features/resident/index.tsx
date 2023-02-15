import {
  InboxArrowDownIcon,
  PlusIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import type { MRT_ColumnDef } from "material-react-table";
import MaterialReactTable from "material-react-table";
import moment from "moment";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  IAttendance,
  IResident,
  useGetResidentsQuery,
} from "../../app/services/residents";
import { Button } from "../../components/Button";
import { AttendToProgram } from "./AttendToProgram";
import { openAttendProgram, setSelectedResident } from "./residentSlice";

export function Residents() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: residents,
    isLoading,
    isError,
    isFetching,
  } = useGetResidentsQuery();

  const attendanceColumns = useMemo<MRT_ColumnDef<IAttendance>[]>(
    () => [
      {
        accessorKey: "programId", //access nested data with dot notation
        header: "Program",
        size: 50,
      },
      {
        accessorKey: "status", //access nested data with dot notation
        header: "Status",
      },
    ],
    []
  );

  const columns = useMemo<MRT_ColumnDef<IResident>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "preferredName",
        header: "Preferred Name",
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "room",
        header: "Room",
      },
      {
        accessorKey: "levelOfCare",
        header: "Level Of Care",
      },
      {
        accessorKey: "ambulation",
        header: "Ambulation",
      },
      {
        accessorKey: "birthDate",
        header: "Birth Date",
        enableColumnFilter: false,
        accessorFn: (row) =>
          moment(row.birthDate).format("yyyy-MM-DD HH:mm:ss A"),
      },
      {
        accessorKey: "moveInDate",
        header: "Move In Date",
        enableColumnFilter: false,
        accessorFn: (row) =>
          moment(row.moveInDate).format("yyyy-MM-DD HH:mm:ss A"),
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        enableColumnFilter: false,
        accessorFn: (row) =>
          moment(row.createdAt).format("yyyy-MM-DD HH:mm:ss A"),
      },
      {
        accessorKey: "updatedAt",
        header: "Updated At",
        enableColumnFilter: false,
        accessorFn: (row) =>
          moment(row.updatedAt).format("yyyy-MM-DD HH:mm:ss A"),
      },
    ],
    []
  );

  return (
    <div className="w-full">
      <h1 className="flex items-center text-3xl font-normal leading-normal mt-0 mb-2">
        <UserIcon className="h-8 w-8" /> Residents
      </h1>

      <Button
        type="button"
        variant="primary"
        icon={<PlusIcon className="mr-2 h-5 w-5 text-white-500" />}
        onClick={() => navigate("/resident/add")}
      >
        Add Resident
      </Button>

      <MaterialReactTable
        columns={columns}
        data={residents || []}
        enableStickyHeader
        initialState={{ density: "compact" }}
        enableRowActions
        renderRowActions={({ row }) => (
          <button
            onClick={() => {
              dispatch(setSelectedResident(row.original));
              dispatch(openAttendProgram());
            }}
          >
            <InboxArrowDownIcon className="w-6 h-6" />
          </button>
        )}
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

      <AttendToProgram />
    </div>
  );
}
