import React from 'react';
import '../App.css';

const Pagination = ({ resultsPerPage, totalResults, paginate, currentPage }) => {
    const fwdBckwdPages = 2;

    var startPage = currentPage - fwdBckwdPages;
    var endPage = currentPage + fwdBckwdPages;

    const lastPage = Math.ceil(totalResults/resultsPerPage);

    if (startPage < fwdBckwdPages) {
        startPage = 1;
        endPage = startPage + 2*fwdBckwdPages;
    }
    if (lastPage <= endPage) {
        endPage = lastPage;
        startPage = endPage - 2*fwdBckwdPages;
    }

    const pageNumbers = [];

    for(let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return(
        <nav id="pagination">
            <ul className="pagination">
                <li className="page-item">
                    <a onClick={() => paginate(1)} className="page-link">
                        First
                    </a>
                </li>
                <li className="page-item">
                    <a onClick={() => paginate(currentPage >= 2 ? currentPage - 1 : 1)} className="page-link">
                        Previous
                    </a>
                </li>
                { pageNumbers.map(number => (
                    <li key={ number } className="page-item">
                        <a onClick={() => paginate(number)} className="page-link">
                            { number }
                        </a>
                    </li>
                ))}
                <li className="page-item">
                    <a onClick={() => paginate(currentPage + 1 > lastPage ? lastPage : currentPage + 1)} className="page-link">
                        Next
                    </a>
                </li>
            </ul>
        </nav>
    )

  }

export default Pagination;