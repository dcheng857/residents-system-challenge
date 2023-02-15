import { ReactNode } from "react";
import { Controller } from "react-hook-form";
import Select, {
  ActionMeta,
  FormatOptionLabelMeta,
  MultiValue,
  SingleValue,
} from "react-select";
import { TagsInput } from "react-tag-input-component";

interface OptionType {
  value: string;
  label: string;
  levelOfCare?: string[];
  start?: string;
  end?: string;
}

export const RenderInput = ({
  name,
  label,
  validation = {},
  helpText = null,
  placeholder = "",
  type = "text",
  control,
}: {
  name: string;
  label: string;
  validation?: {};
  helpText?: string | null;
  placeholder?: string;
  type?: string;
  control: any;
}) => (
  <Controller
    render={({ field, fieldState: { error } }) => (
      <>
        <div className="-space-y-px rounded-md shadow-sm w-full">
          <label htmlFor={name}>{label}</label>
          <input
            id={name}
            type={type}
            className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder={placeholder}
            {...field}
          />
        </div>
        {helpText && (
          <p
            id="helper-text-explanation"
            className="mt-2 text-sm text-gray-500 dark:text-gray-400"
          >
            {helpText}
          </p>
        )}
        {error && <span className="text-sm text-red-600">{error.message}</span>}
      </>
    )}
    name={name}
    control={control}
    rules={{ ...validation }}
  />
);

export const RenderMultiDropDownInput = ({
  name,
  label,
  validation = {},
  items,
  helpText = null,
  control,
  formatOptionLabel,
}: {
  name: string;
  label: string;
  validation?: {};
  items: Array<{ label: string; value: any }>;
  helpText?: string | null;
  control: any;
  formatOptionLabel?: (
    data: OptionType,
    formatOptionLabelMeta: FormatOptionLabelMeta<OptionType>
  ) => ReactNode;
}) => (
  <Controller
    render={({
      field: { value, onChange, ...rest },
      fieldState: { error },
    }) => (
      <>
        <div className="-space-y-px rounded-md shadow-sm w-full">
          <label
            htmlFor={name}
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            {label}
          </label>
          <Select
            id={name}
            value={items.filter((obj) => value.indexOf(obj.value) !== -1)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            options={items}
            onChange={(
              selected: MultiValue<OptionType>,
              actionMeta: ActionMeta<OptionType>
            ) => onChange(selected.map((option: OptionType) => option.value))}
            isMulti
            styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
            menuPortalTarget={document.body}
            formatOptionLabel={formatOptionLabel}
            {...rest}
          />
        </div>
        {helpText && (
          <p
            id="helper-text-explanation"
            className="mt-2 text-sm text-gray-500 dark:text-gray-400"
          >
            {helpText}
          </p>
        )}
        {error && <span className="text-sm text-red-600">{error.message}</span>}
      </>
    )}
    name={name}
    control={control}
    rules={{ ...validation }}
  />
);

export const RenderDropDownInput = ({
  name,
  label,
  validation = {},
  items,
  helpText = null,
  control,
  formatOptionLabel,
}: {
  name: string;
  label: string;
  validation?: {};
  items: Array<{ label: string; value: any }>;
  helpText?: string | null;
  control: any;
  formatOptionLabel?: (
    data: OptionType,
    formatOptionLabelMeta: FormatOptionLabelMeta<OptionType>
  ) => ReactNode;
}) => (
  <Controller
    render={({
      field: { value, onChange, ...rest },
      fieldState: { error },
    }) => (
      <>
        <div className="-space-y-px rounded-md shadow-sm w-full">
          <label
            htmlFor={name}
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            {label}
          </label>
          <Select
            id={name}
            value={items.filter((obj) => obj.value === value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            options={items}
            onChange={(
              selected: SingleValue<OptionType>,
              actionMeta: ActionMeta<OptionType>
            ) => onChange(selected?.value)}
            styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
            menuPortalTarget={document.body}
            formatOptionLabel={formatOptionLabel}
            {...rest}
          />
        </div>
        {helpText && (
          <p
            id="helper-text-explanation"
            className="mt-2 text-sm text-gray-500 dark:text-gray-400"
          >
            {helpText}
          </p>
        )}
        {error && <span className="text-sm text-red-600">{error.message}</span>}
      </>
    )}
    name={name}
    control={control}
    rules={{ ...validation }}
  />
);

export const RenderCheckbox = ({
  name,
  label,
  validation = {},
  helpText = null,
  control,
}: {
  name: string;
  label: string;
  validation?: {};
  helpText?: string | null;
  control: any;
}) => (
  <Controller
    render={({ field, fieldState: { error } }) => (
      <>
        <div className="flex">
          <div className="flex items-center h-5">
            <input
              id={name}
              aria-describedby={label}
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              {...field}
            />
          </div>
          <div className="ml-2 text-sm">
            <label
              htmlFor={name}
              className="font-medium text-gray-900 dark:text-gray-300"
            >
              {label}
            </label>
            {helpText && (
              <p className="text-xs font-normal text-gray-500 dark:text-gray-300">
                {helpText}
              </p>
            )}
            {error && (
              <span className="text-sm text-red-600">{error.message}</span>
            )}
          </div>
        </div>
      </>
    )}
    name={name}
    control={control}
    rules={{ ...validation }}
  />
);

export const RenderTagsInput = ({
  name,
  label,
  validation = {},
  helpText = null,
  placeholder = "",
  control,
}: {
  name: string;
  label: string;
  validation?: {};
  helpText?: string | null;
  placeholder?: string;
  control: any;
}) => (
  <Controller
    render={({ field, fieldState: { error } }) => (
      <>
        <div className="-space-y-px rounded-md shadow-sm w-full">
          <label htmlFor={name}>{label}</label>
          <TagsInput
            // id={name}
            // type={type}
            // classNames="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            // placeholder={placeholder}
            classNames={{
              input:
                "relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm",
            }}
            {...field}
          />
        </div>
        {helpText && (
          <p
            id="helper-text-explanation"
            className="mt-2 text-sm text-gray-500 dark:text-gray-400"
          >
            {helpText}
          </p>
        )}
        {error && <span className="text-sm text-red-600">{error.message}</span>}
      </>
    )}
    name={name}
    control={control}
    rules={{ ...validation }}
  />
);
