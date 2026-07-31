"use client"
import { useRouter, usePathname, useSearchParams } from "next/navigation"

type PaginationProps = {
    currentPage: number
}

export function Pagination({
    currentPage
}: PaginationProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    function goToPage(page: number) {
        const params = new URLSearchParams(searchParams)

        params.set("page", page.toString())
        router.replace(`${pathname}?${params.toString()}`)
    }

    return (
        <div className="flex gap-2">
            <button
                disabled={currentPage === 1}
                onClick={() => goToPage(currentPage - 1)}
            >
                Previous
            </button>

            <span>{currentPage}</span>

            <button
                onClick={() => goToPage(currentPage + 1)}
            >
                Next
            </button>
        </div>
    );
}