"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from "use-debounce";

export function TaskSearch() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [search, setSearch] = useState(
        searchParams.get("search") ?? ""
    );
    const handleSearch = useDebouncedCallback((value: string) => {
        const params = new URLSearchParams(searchParams)

        if (value) {
            params.set("search", value)
        } else {
            params.delete("search")
        }

        router.replace(`${pathname}?${params.toString()}`)
    }, 300)

    return (
        <Input
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => {
                setSearch(e.target.value);
                handleSearch(e.target.value);
            }}
        />
    );
}