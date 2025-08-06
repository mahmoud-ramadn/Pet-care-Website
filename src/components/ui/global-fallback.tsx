import Loading from "./animations/loading";

export default function GlobalFallback() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-blue-300 z-50">
             <Loading/>
        </div>
    )
}
