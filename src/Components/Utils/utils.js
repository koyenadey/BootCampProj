export function paginate(tasks,currPageNum,pageSize)
{
    const startIndex = (currPageNum - 1) * pageSize;
    const offset = (currPageNum * pageSize);
    const newTaskData = tasks.slice(startIndex,offset);
    return newTaskData;
} 

export function filterData(tasks,status)
{
    let filteredData;
    if(status){
       
        filteredData = tasks.filter(task=>task.taskStatus === status);
        return filteredData;
    }
    else return tasks;
}

export function filterDataByDate(tasks)
{
    let filteredData;
    if(tasks){
        const sortedData = sortData(tasks,"taskTargetDate");
        filteredData = sortedData.filter(data=>getDate(new Date(data.taskTargetDate)) === getDate(new Date()).toString());
        return filteredData;
    }
    else return filteredData;
}

export function sortData(tasks,sortColumn)
{
    const newTasks = [...tasks];
    let newSortedTasks;
    if(sortColumn==="taskTargetDate")
    {
        newSortedTasks = newTasks.sort((a,b)=>new Date(b[sortColumn]) - new Date(a[sortColumn]));
    }
    else{
        newSortedTasks = newTasks.sort((a,b)=>a[sortColumn].toLowerCase().localeCompare(b[sortColumn].toLowerCase()));
    }
    return newSortedTasks;
}

export function getFormattedTime(dateStr) {
    const dateTime = new Date(dateStr);
    const formattedDate = dateTime.toLocaleDateString([], {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    const formattedDay = dateTime.toLocaleDateString([], { weekday: "long" });
    const formattedTime = dateTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  
    const finalDate = {
      finalDateTime: `${formattedDate} ${formattedTime}`,
      finalDayName: formattedDay,
      formattedDate: formattedDate
    };
  
    return finalDate;
  }

  export function getDate(dateObj)
  {
        const formattedDate = dateObj.toLocaleDateString([],{
            day: "2-digit",
            month: "long",
            year: "numeric",
        });

    return formattedDate;
  }

export function getUpcomingTask(tasks)
{
    let upComingTask="";
    const sortedTasks = sortData(tasks,'taskTargetDate');

    sortedTasks.forEach(element => {
        const elemDate = getFormattedTime(element.taskTargetDate).formattedDate;
        const currentDate = getDate(new Date());

        const currentTime = new Date().getTime() + 30*60*1000;
        const currentFormattedTime = new Date(currentTime).toLocaleTimeString();
        
        if(elemDate === currentDate)
        {
            const elemTime = new Date(element.taskTargetDate).getTime()+30*60*1000;
            const elemFormattedTime = new Date(elemTime).toLocaleTimeString();
            
            if(elemFormattedTime > currentFormattedTime)
                upComingTask = element;

        }

    });

    if(upComingTask!=="")
            return upComingTask
    else return {taskName: "No Upcoming task in 30 minutes"};
}