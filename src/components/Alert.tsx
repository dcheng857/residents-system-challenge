interface AlertProps {
  type: string;
  children: React.ReactNode;
}

export function Alert({ type = "default", children }: AlertProps) {
  const colorTheme: {
    [key: string]: string;
  } = {
    info: "blue",
    error: "red",
    success: "green",
    warning: "yellow",
    default: "gray",
  };

  return (
    <div
      className={`p-4 mb-4 text-sm text-${colorTheme[type]}-500 rounded-lg bg-${colorTheme[type]}-50 dark:bg-gray-800 dark:text-${colorTheme[type]}-400`}
      role="alert"
    >
      {children}
    </div>
  );
}
