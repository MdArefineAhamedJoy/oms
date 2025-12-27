import React from "react";

type Props = {
  className?: string;
};

export default function Skeleton({ className = "" }: Props) {
  return (
    <div
      className={
        "animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800 " + className
      }
    />
  );
}

