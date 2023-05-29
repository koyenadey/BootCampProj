import React from 'react';
import Classes from './Pagination.module.scss';

const Pagination = (props) =>{
  const taskCount = props.taskCount;
  const itemsInAPage = props.pageSize;
  const pageNumber = Math.ceil(taskCount / itemsInAPage);
  //console.log(pageNumber);
  const pageNumbers = getPagesArray(pageNumber);
  //console.log(pageNumbers);

  function getPagesArray(pageNumber){
    const pageNumbers = []
    for(let i=1;i<=pageNumber;i++)
    {
        pageNumbers.push(i);
    }
    return pageNumbers;
  }

  return(
    <ul className={Classes.pagination}>
      {pageNumbers.map((page)=>{ 
        return(
          <li>
            <button className={Classes.pageNumber} onClick={()=>props.onPageChange(page)}>{page}</button>
          </li>
        )
      })}
    </ul>
  );
}

export default Pagination;