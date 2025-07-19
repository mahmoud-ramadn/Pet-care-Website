import { cn } from "@/lib/utils";
import { type ReactNode } from "react"

type UiTitleProps = {
  children: ReactNode;
  className?: string;
}

export default function UiTitle({ children ,className}: UiTitleProps) {
  return <h2 className={cn("font-extrabold text-4xl",className)}>{children}</h2>
}
