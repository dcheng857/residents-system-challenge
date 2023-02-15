interface CardProps {
  children: React.ReactNode;
  classes?: string;
}

export function Card({ children, classes }: CardProps) {
  return (
    <div
      className={`bg-white p-6 w-full space-y-8 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ${classes}`}
    >
      {children}
    </div>
  );
}
