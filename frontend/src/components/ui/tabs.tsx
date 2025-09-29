import * as React from "react";
import { cn } from "@/lib/utils";

export function Tabs({ value, onValueChange, children, className }: {
  value: string;
  onValueChange: (val: string) => void;
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("w-full", className)}>{children}</div>;
}

export function TabsList({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("flex gap-2 border-b mb-2", className)}>{children}</div>;
}

export function TabsTrigger({ value, children, className, selected, onClick }: {
  value: string;
  children: React.ReactNode;
  className?: string;
  selected?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      className={cn(
        "px-4 py-2 font-medium border-b-2",
        selected ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-primary",
        className
      )}
      onClick={onClick}
      aria-selected={selected}
      type="button"
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, selected }: {
  value: string;
  children: React.ReactNode;
  selected?: boolean;
}) {
  if (!selected) return null;
  return <div className="pt-2">{children}</div>;
}
