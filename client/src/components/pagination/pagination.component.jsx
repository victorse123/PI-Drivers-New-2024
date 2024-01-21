/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import s from "./pagination.module.css";

import { nextPage, prevPage, specificPage } from "../../redux/actions.js";

function Pagination({driversPerPage, drivers}) {

  const dispatch = useDispatch()

  const currentPage = useSelector((state) => state.currentPage)
  const pageNumbers = []
  const totalDrivers = drivers.length;

  for (let i = 1; i <= Math.ceil(totalDrivers / driversPerPage); i++) {
    pageNumbers.push(i)
  }

  const onPreviousPage = () => {
    dispatch(prevPage())
  }

  const onNextPage = () => {
    dispatch(nextPage())
  }

  const onSpecificPage = (page) => {
    dispatch(specificPage(page))
  }

  const showPageNumbers = () => {
    const displayPages = []
    const totalPages = pageNumbers.length
    const maxPagesToShow = 3

    if (totalPages <= maxPagesToShow) {
      displayPages.push(...pageNumbers)
    } else {
      const startPage = Math.max(1, currentPage);
      const endPage = Math.min(startPage + maxPagesToShow  - 1, totalPages)

      if (startPage > 1) {
        displayPages.push(1);
        displayPages.push(null);
      }

      for (let i = startPage; i <= endPage; i++) {
        displayPages.push(i)
      }

      if (endPage < totalPages) {
        displayPages.push(null)
        displayPages.push(totalPages)
      }
    }
    
    return displayPages.map((page, index) => (
      <li key={index}>
        {page === null
          ? (<span>   </span>)
          : (<a className={page === currentPage ? s.activePage : s.regularPage} onClick={() => onSpecificPage(page)}>{ page }</a>)}
      </li>
    ))
  }

  return (
    <div className={s.pagination}>
      <button disabled={currentPage === 1 ? true : false} onClick={onPreviousPage}><img className={ s.leftArrow } src={ currentPage === 1 ? "/arrowOff.png" : "/arrowOn.png"}  alt="arrow"/></button>
      <div>{ showPageNumbers()}</div>
      <button disabled={ currentPage >= pageNumbers.length ? true : false} onClick={onNextPage}><img className={ s.rightArrow } src={currentPage >= pageNumbers.length ? "/arrowOff.png" : "/arrowOn.png" } alt="arrow"/></button>
    </div>
  );
}


export default Pagination;
