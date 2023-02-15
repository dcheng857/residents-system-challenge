import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IProgram, useAddProgramMutation } from "../../app/services/programs";
import { Button } from "../../components/Button";
import {
  RenderCheckbox,
  RenderDropDownInput,
  RenderInput,
  RenderMultiDropDownInput,
  RenderTagsInput,
} from "../../components/renderInput";

export function AddProgram() {
  const navigate = useNavigate();
  const [addProgram, { isLoading: isCreating }] = useAddProgramMutation();

  const { handleSubmit, control } = useForm<Partial<IProgram>>({
    defaultValues: {
      parentId: null,
      name: "",
      location: "",
      allDay: false,
      start: "",
      end: "",
      tags: [],
      dimension: "",
      facilitators: [],
      levelOfCare: [],
      hobbies: [],
      recurrence: undefined,
      isRepeated: false,
    },
  });

  const onSubmit = async (program: Partial<IProgram>) => {
    console.log(program);

    try {
      const result = await addProgram(program).unwrap();
      if (result) {
        console.log(result);
        toast.success("Program Successfully Added!");
        navigate("/programs");
      }
    } catch (error) {
      console.log(error);
      toast.error("Fail to add! Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <h1 className="text-3xl font-normal leading-normal mt-0 mb-2">
        Add Program
      </h1>

      <div className="p-6 w-full max-w-lg space-y-8 w-full">
        <RenderInput
          name="name"
          label="Name"
          validation={{
            required: "This field is required.",
          }}
          control={control}
        />

        <RenderDropDownInput
          name="location"
          label="Location"
          items={[
            { label: "Cafeteria", value: "Cafeteria" },
            { label: "Parking Lot", value: "Parking Lot" },
            { label: "The Green Door", value: "The Green Door" },
            { label: "Group Study Room F", value: "Group Study Room F" },
            { label: "Theatre", value: "Theatre" },
            { label: "Workshop", value: "Workshop" },
            { label: "Gymnasium", value: "Gymnasium" },
            { label: "Auditorium", value: "Auditorium" },
          ]}
          validation={{
            required: "This field is required.",
          }}
          control={control}
        />

        <RenderCheckbox name="allDay" label="All Day?" control={control} />

        <RenderInput
          name="start"
          label="Start"
          validation={{
            required: "This field is required.",
          }}
          type="date"
          control={control}
        />

        <RenderInput
          name="end"
          label="End"
          validation={{
            required: "This field is required.",
          }}
          type="date"
          control={control}
        />

        <RenderDropDownInput
          name="dimension"
          label="Dimension"
          items={[
            { label: "Intellectual", value: "Intellectual" },
            { label: "Physical", value: "Physical" },
            { label: "Community", value: "Community" },
            { label: "Social", value: "Social" },
          ]}
          validation={{
            required: "This field is required.",
          }}
          control={control}
        />

        <RenderMultiDropDownInput
          name="facilitators"
          label="Facilitators"
          items={[
            { label: "Rec Aide", value: "Rec Aide" },
            { label: "Resident", value: "Resident" },
            { label: "Director of Rec", value: "Director of Rec" },
            { label: "Craig Pelton", value: "Craig Pelton" },
          ]}
          validation={{
            required: "This field is required.",
          }}
          control={control}
        />

        <RenderMultiDropDownInput
          name="levelOfCare"
          label="Level Of Care"
          items={[
            { label: "INDEPENDENT", value: "INDEPENDENT" },
            { label: "MEMORY", value: "MEMORY" },
            { label: "ASSISTED", value: "ASSISTED" },
            { label: "LONGTERM", value: "LONGTERM" },
          ]}
          validation={{
            required: "This field is required.",
          }}
          control={control}
        />

        <RenderTagsInput name="hobbies" label="Hobbies" control={control} />

        <div className="flex space-x-3" role="group">
          <Button
            type="submit"
            variant="default"
            onClick={() => navigate("/programs")}
          >
            Back
          </Button>

          <Button type="submit" variant="primary" isLoading={isCreating}>
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
}
