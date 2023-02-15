import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  IAddResidentRequest,
  useAddResidentMutation,
} from "../../app/services/residents";
import { Button } from "../../components/Button";
import { RenderDropDownInput, RenderInput } from "../../components/renderInput";

export function AddResident() {
  const navigate = useNavigate();
  const [addResident, { isLoading: isCreating }] = useAddResidentMutation();

  const { handleSubmit, control } = useForm<IAddResidentRequest>({
    defaultValues: {
      name: "",
      firstName: "",
      lastName: "",
      preferredName: "",
      status: "",
      room: "",
      levelOfCare: "",
      ambulation: "",
      birthDate: "",
      moveInDate: "",
    },
  });

  const onSubmit = async (resident: IAddResidentRequest) => {
    console.log(resident);

    try {
      const result = await addResident(resident).unwrap();
      if (result) {
        toast.success("Resident Successfully Added!");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Fail to add! Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <h1 className="text-3xl font-normal leading-normal mt-0 mb-2">
        Add Resident
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

        <RenderInput
          name="firstName"
          label="First Name"
          validation={{
            required: "This field is required.",
          }}
          control={control}
        />

        <RenderInput
          name="lastName"
          label="Last Name"
          validation={{
            required: "This field is required.",
          }}
          control={control}
        />

        <RenderInput
          name="preferredName"
          label="Preferred Name"
          validation={{
            required: "This field is required.",
          }}
          control={control}
        />

        <RenderDropDownInput
          name="status"
          label="Status"
          items={[
            { label: "HERE", value: "HERE" },
            { label: "LOA", value: "LOA" },
            { label: "HOSPITAL", value: "HOSPITAL" },
            { label: "ISOLATION", value: "ISOLATION" },
          ]}
          validation={{
            required: "This field is required.",
          }}
          control={control}
        />

        <RenderInput
          name="room"
          label="Room"
          validation={{
            required: "This field is required.",
          }}
          control={control}
        />

        <RenderDropDownInput
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

        <RenderDropDownInput
          name="ambulation"
          label="Ambulation"
          items={[
            { label: "CANE", value: "CANE" },
            { label: "NOLIMITATIONS", value: "NOLIMITATIONS" },
            { label: "WALKER", value: "WALKER" },
            { label: "WHEELCHAIR", value: "WHEELCHAIR" },
          ]}
          validation={{
            required: "This field is required.",
          }}
          control={control}
        />

        <RenderInput
          name="birthDate"
          label="Birth Date"
          validation={{
            required: "This field is required.",
          }}
          type="date"
          control={control}
        />

        <RenderInput
          name="moveInDate"
          label="Move In Date"
          validation={{
            required: "This field is required.",
          }}
          type="date"
          control={control}
        />

        <div className="flex space-x-3" role="group">
          <Button type="submit" variant="default" onClick={() => navigate("/")}>
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
