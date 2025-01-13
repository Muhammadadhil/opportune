export const getPaginationNumbers = (totalPages: number, page: number) => {
    const pages = [];
    const maxVisiblePages = 8;

    if (totalPages <= maxVisiblePages) {
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
    } else {
        pages.push(1);

        let start = Math.max(2, page - 2);
        let end = Math.min(totalPages - 1, page + 2);

        if (page <= 3) {
            end = 5;
        }

        if (page >= totalPages - 2) {
            start = totalPages - 4;
        }

        if (start > 2) {
            pages.push("...");
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (end < totalPages - 1) {
            pages.push("...");
        }

        pages.push(totalPages);
    }
    return pages;
};
