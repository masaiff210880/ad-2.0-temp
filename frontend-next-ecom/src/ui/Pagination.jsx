// import { PaginationNext, PaginationPrev } from "@/svg";

// const Pagination = ({
//   items = [],
//   countOfPage = 12,
//   paginatedData,
//   currPage,
//   setCurrPage,
// }) => {
//   const pageStart = (currPage - 1) * countOfPage;
//   const totalPage = Math.ceil(items.length / countOfPage);

//   function setPage(idx) {
//     if (idx <= 0 || idx > totalPage) {
//       return;
//     }
//     setCurrPage(idx);
//     window.scrollTo(0, 0);
//     paginatedData(items, pageStart, countOfPage);
//   }

//   return (
//     <nav>
//       {totalPage > 1 && (
//         <ul>
//           <li>
//             <button
//               onClick={() => setPage(currPage - 1)}
//               className={`tp-pagination-prev prev page-numbers ${
//                 currPage === 1 ? "disabled" : ""
//               }`}
//             >
//               <PaginationPrev />
//             </button>
//           </li>

//           {Array.from({ length: totalPage }, (_, i) => i + 1).map((n) => (
//             <li key={n} onClick={() => setPage(n)}>
//               <span className={`${currPage === n ? "current" : ""}`}>{n}</span>
//             </li>
//           ))}

//           <li>
//             <button
//               onClick={() => setPage(currPage + 1)}
//               className={`next page-numbers ${
//                 currPage === totalPage ? "disabled" : ""
//               }`}
//             >
//               <PaginationNext />
//             </button>
//           </li>
//         </ul>
//       )}
//     </nav>
//   );
// };

// export default Pagination;
import React from 'react';
import { PaginationNext, PaginationPrev } from "@/svg";

const Pagination = ({
  items = [],
  countOfPage = 12,
  paginatedData,
  currPage,
  setCurrPage,
}) => {
  const totalPage = Math.ceil(items / countOfPage);

  function setPage(idx) {
    if (idx <= 0 || idx > totalPage) {
      return;
    }
    setCurrPage(idx);
    paginatedData(items, (idx - 1) * countOfPage, countOfPage);
  }

  console.log('currPage', currPage)

  const renderPageButtons = () => {
    const buttons = [];

    if (totalPage <= 7) {
      // Show all buttons if there are 7 or fewer pages
      for (let i = 1; i <= totalPage; i++) {
        buttons.push(
          <li key={i}>
            <button onClick={() => setPage(i)} className={`page-numbers ${currPage === i ? "current" : ""}`}>
              {i}
            </button>
          </li>
        );
      }
    } else {
      // Show a fixed set of 7 buttons
      const mid = Math.min(Math.max(4, currPage), totalPage - 3);

      buttons.push(
        <li key="prev">
          <button onClick={() => setPage(currPage - 1)} className="prev page-numbers">
            <PaginationPrev />
          </button>
        </li>
      );

      buttons.push(
        <li key="first">
          <button onClick={() => setPage(1)} className={`page-numbers ${currPage === 1 ? "current" : ""}`}>
            1
          </button>
        </li>
      );

      if (currPage > 4) {
        buttons.push(
          <li key="ellipsis-start">
            <span className="ellipsis">...</span>
          </li>
        );
      }

      for (let i = mid - 2; i <= mid + 2; i++) {
        buttons.push(
          <li key={i}>
            <button onClick={() => setPage(i)} className={`page-numbers ${currPage === i ? "current" : ""}`}>
              {i}
            </button>
          </li>
        );
      }

      if (currPage < totalPage - 3) {
        buttons.push(
          <li key="ellipsis-end">
            <span className="ellipsis">...</span>
          </li>
        );
      }

      buttons.push(
        <li key="last">
          <button onClick={() => setPage(totalPage)} className={`page-numbers ${currPage === totalPage ? "current" : ""}`}>
            {totalPage}
          </button>
        </li>
      );

      buttons.push(
        <li key="next">
          <button onClick={() => setPage(currPage + 1)} className="next page-numbers">
            <PaginationNext />
          </button>
        </li>
      );
    }

    return buttons;
  };

  return (
    <nav>
      {totalPage > 1 && (
        <ul>
          {renderPageButtons()}
        </ul>
      )}
    </nav>
  );
};

export default Pagination;
