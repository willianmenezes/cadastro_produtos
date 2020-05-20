export interface PaginationResponse<T> {
    totalPages: number,
    pageIndex: number,
    totalItems: number,
    items: T[]
}