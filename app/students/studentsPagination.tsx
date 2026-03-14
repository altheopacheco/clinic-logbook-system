'use client'

import { Field, FieldLabel } from "@/components/ui/field"
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select"
import { useRouter, useSearchParams } from "next/navigation"

export default function StudentsPagination({totalPages}: {totalPages: number}) {

    const router = useRouter();
    const searchParams = useSearchParams();

    function buildUrl(key: string, value: string) {
        const params = new URLSearchParams(searchParams.toString());
        params.set(key, value);
        return `?${params.toString()}`;
    }

    const currentPage = parseInt(searchParams.get('page') ?? '1');
    return (
        <div className="flex items-center justify-between gap-4">
            <Field orientation="horizontal" className="w-fit">
                <FieldLabel htmlFor="select-rows-per-page">Rows per page</FieldLabel>
                <Select defaultValue="25" onValueChange={e => {
                    router.replace(buildUrl('rows', e).toString())
                }}>
                <SelectTrigger className="w-20" id="select-rows-per-page">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent align="start">
                    <SelectGroup>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                    </SelectGroup>
                </SelectContent>
                </Select>
            </Field>
            <Pagination className="mx-0 w-auto">
                <PaginationContent>
                    <PaginationItem>
                    <PaginationPrevious
                        href={buildUrl('page', (currentPage - 1).toString())}
                        aria-disabled={currentPage <= 1}
                        className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                    />
                    </PaginationItem>
                    <PaginationItem>
                    <PaginationNext
                        href={buildUrl('page', (currentPage + 1).toString())}
                        aria-disabled={currentPage >= totalPages}
                        className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                    </PaginationItem>
                </PaginationContent>
                </Pagination>
        </div>
    )
}