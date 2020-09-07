import React from 'react';
import '../App.css';

const Pagination = ({ resultsPerPage, totalResults, paginate }) => {

    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalResults/resultsPerPage); i++) {
        pageNumbers.push(i);
    }

    return(
        <nav id="pagination">
            <ul className="pagination">
                { pageNumbers.map(number => (
                    <li key={ number } className="page-item">
                        <a onClick={() => paginate(number)} className="page-link">
                            { number }
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )

  }

export default Pagination;