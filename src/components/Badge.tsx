interface BadgeProps {
  type: string;
  children: React.ReactNode;
}

export function Badge({ type = "default", children }: BadgeProps) {
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
    <span
      className={`bg-${colorTheme[type]}-100 text-${colorTheme[type]}-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-${colorTheme[type]}-900 dark:text-${colorTheme[type]}-300`}
    >
      {children}
    </span>
  );
}
