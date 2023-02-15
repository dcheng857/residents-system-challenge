import { Card } from "./Card";

interface SkeletonProps {
  line?: number;
}

export function Skeleton({ line = 1 }: SkeletonProps) {
  return (
    <Card>
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-6 py-1">
          {Array.from(Array(line).keys()).map((key) => (
            <div className="h-2 bg-slate-200 rounded"></div>
          ))}
        </div>
      </div>
    </Card>
  );
}
