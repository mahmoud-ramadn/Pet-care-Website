import { Loader2Icon } from "lucide-react"

import { Button } from "./button"

export default function ButtonWithLoading() {
  return (
    <Button size="sm" disabled>
      <Loader2Icon className="animate-spin" />
      Please wait
    </Button>
  )
}
