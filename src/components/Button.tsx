import React from "react";
import { Spinner } from "./Spinner";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactElement;
  isLoading?: boolean;
  isDisabled?: boolean;
  variant: string;
  children: React.ReactNode;
  fullWidth?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function Button({
  type,
  variant = "default",
  isLoading,
  isDisabled,
  children,
  icon,
  fullWidth = false,
  onClick,
}: ButtonProps) {
  const colorTheme: {
    [key: string]: string;
  } = {
    primary: "blue",
    error: "red",
    success: "green",
    warning: "yellow",
    default: "gray",
  };

  return (
    <button
      type={type}
      disabled={isLoading || isDisabled}
      className={`group relative flex ${
        fullWidth ? "w-full" : "min-w-min"
      } justify-center rounded-md border border-transparent bg-${
        colorTheme[variant]
      }-600 py-2 px-4 text-sm font-medium text-white hover:bg-${
        colorTheme[variant]
      }-700 focus:outline-none focus:ring-2 focus:ring-${
        colorTheme[variant]
      }-500 focus:ring-offset-2 disabled:opacity-25 my-3`}
      onClick={onClick}
    >
      <div className="justify-between inset-y-0 left-0 flex items-center">
        {isLoading && <Spinner />}
        {!isLoading && icon}
      </div>
      {children}
    </button>
  );
}
