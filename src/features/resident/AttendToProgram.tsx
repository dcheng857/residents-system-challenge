import moment from "moment";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useAttendProgramMutation,
  useGetProgramsQuery,
} from "../../app/services/programs";
import { IAttendance, IResident } from "../../app/services/residents";
import { Alert } from "../../components/Alert";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { Modal } from "../../components/Modal";
import { RenderDropDownInput } from "../../components/renderInput";
import { Skeleton } from "../../components/Skeleton";
import {
  closeAttendProgram,
  selectAttendToOpen,
  selectResident,
} from "./residentSlice";

export function AttendToProgram() {
  const dispatch = useDispatch();
  const open: boolean = useSelector(selectAttendToOpen);
  const resident: IResident | null = useSelector(selectResident);

  const [attendProgram, { isLoading: isAttendLoading }] =
    useAttendProgramMutation();

  const { handleSubmit, control } = useForm<Partial<IAttendance>>({
    defaultValues: {
      programId: null,
      residentId: null,
      status: "Active",
    },
  });

  const {
    data: programs,
    isLoading: isProgramsLoading,
    isSuccess: isProgramsSuccess,
    isError: isProgramsError,
  } = useGetProgramsQuery();

  const onSubmit = async (attendance: Partial<IAttendance>) => {
    try {
      attendance.residentId = resident?.id;
      const result = await attendProgram(attendance).unwrap();
      if (result) {
        dispatch(closeAttendProgram());
        toast.success(`${resident?.name} Successfully Attended!`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Fail to attend! Please try again later.");
    }
  };

  return (
    <Modal open={open}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <h3
                className="text-lg font-medium leading-6 text-gray-900"
                id="modal-title"
              >
                Attend To Program
              </h3>
              <Card classes="my-6">
                <div className="grid grid-cols-2 gap-8 w-full">
                  <div className="flex justify-between">
                    <span className="font-bold">Name:</span>
                    <span>{resident?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">Preferred Name:</span>
                    <span>{resident?.preferredName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">Status:</span>
                    <span>{resident?.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">Room:</span>
                    <span>{resident?.room}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">Level Of Care:</span>
                    <span>{resident?.levelOfCare}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">Ambulation:</span>
                    <span>{resident?.ambulation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">Birth Date:</span>
                    <span>
                      {moment(resident?.birthDate).format(
                        "yyyy-MM-DD HH:mm:ss A"
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">Move In Date:</span>
                    <span>
                      {moment(resident?.moveInDate).format(
                        "yyyy-MM-DD HH:mm:ss A"
                      )}
                    </span>
                  </div>
                </div>
              </Card>

              {isProgramsLoading && <Skeleton />}

              {isProgramsError && (
                <Alert type="error">
                  Error to fetch the program list, please close the pop-up and
                  try again.
                </Alert>
              )}

              {isProgramsSuccess && (
                <div className="mt-2">
                  <RenderDropDownInput
                    name="programId"
                    label="Attend Program"
                    items={
                      programs
                        ? programs
                            .filter((program) => {
                              let result = true;
                              program.attendance.forEach((attend) => {
                                if (attend.residentId === resident?.id) {
                                  result = false;
                                }
                              });
                              return result;
                            })
                            .map((program) => {
                              return {
                                label: program.name,
                                value: program.id,
                                levelOfCare: program.levelOfCare,
                                start: program.start,
                                end: program.end,
                              };
                            })
                        : []
                    }
                    validation={{
                      required: "This field is required.",
                    }}
                    control={control}
                    formatOptionLabel={({
                      value,
                      label,
                      levelOfCare,
                      start,
                      end,
                    }) => {
                      return (
                        <div>
                          <div>{label}</div>
                          <div className="text-xs text-slate-500 mt-1">
                            Level Of Care: {levelOfCare?.join(", ")}
                          </div>
                          <div className="text-xs text-slate-500 mt-1">
                            {moment.utc(start).format("yyyy-MM-DD HH:mm:ss A")}{" "}
                            - {moment.utc(end).format("yyyy-MM-DD HH:mm:ss A")}
                          </div>
                        </div>
                      );
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <div className="flex space-x-3" role="group">
            <Button
              type="submit"
              variant="default"
              onClick={() => dispatch(closeAttendProgram())}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="primary"
              isDisabled={
                isProgramsLoading || isProgramsError || isAttendLoading
              }
              isLoading={isAttendLoading}
            >
              Assign
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
