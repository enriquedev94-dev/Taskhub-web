"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function TaskStatusFilter() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    function handleChange(status: string) {
        const params = new URLSearchParams(searchParams)

        if (status === "ALL") {
            params.delete("status")
        } else {
            params.set("status", status)
        }
        router.replace(`${pathname}?${params.toString()}`)
    }

    return (
        <select
            defaultValue={searchParams.get("status") ?? "ALL"}
            onChange={(e) => handleChange(e.target.value)}
            className="border rounded-md px-3 py-2"
        >
            <option value="ALL">All</option>
            <option value="TODO">Todo</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Done</option>
        </select>
    );
}