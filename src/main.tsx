import "leaflet/dist/leaflet.css"
import "nprogress/nprogress.css"

import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router"

import "@/assets/css/index.css"
import "@/i18n"
import { router } from "@/routes"

createRoot(document.getElementById("root")!).render(<RouterProvider router={router} />)
