import { PaginationProps } from "../types";

interface Page {
  page: number;
  isSelected: boolean;
}

export default function Pagination({ total, limit, page }: PaginationProps) {
  const pagesCount = total / limit;
  const pages: Page[] = [];

  for (let i = 0; i < pagesCount; i++) {
    const pageNumber = i + 1;
    pages.push({ page: pageNumber, isSelected: pageNumber === page });
  }

  return (
    <>
      <div className="flex gap-1 justify-center items-center mt-3">
        {
          pages.map(({ page, isSelected }) => {
            const classNames = isSelected
              ? "flex justify-center items-center w-[40px] h-[40px] border-1 border-sky-400 rounded-md bg-sky-400 text-white"
              : "flex justify-center items-center w-[40px] h-[40px] border-1 border-sky-400 rounded-md"
            return (
              <div className={classNames}>
                <span>{page}</span>
              </div>
            )
          })
        }
      </div>
    </>
  )
}