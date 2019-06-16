/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

document.addEventListener('DOMContentLoaded', () => {
    // here we create 3 global variables, 'list' holding every line in the list of 
    // students' data, 'students' holding the length of the 'list' variable and  
    // finally 'studentsPerPage' holding the number of students' data per page. 
    const list = document.querySelectorAll("li.student-item");
    const students = list.length;
    const studentsPerPage = 10;

    // the `showPage` function that hides all of the items in the 
    // list except for the ten we want to show
    const showPage = (list, page) => {
        const start = (page * studentsPerPage - studentsPerPage);
        const end = (page * studentsPerPage - 1);
        for (let i = 0; i < students; i++) {
            if (i >= start && i <= end) {
                list[i].style.display = "block";
            } else {
                list[i].style.display = "none";
            }
        }
    }

    // The `appendPageLinks function that generates, appends, and adds 
    // functionality to the pagination buttons.
    const appendPageLinks = (list) => {
        // select page element so that we will be able to append the div we create to it.
        const page = document.querySelector('.page');

        // compute the number of pages required based on the number of records and store it 
        // in the variable 'numPages'.
        const numPages = Math.ceil(students / studentsPerPage);

        // create a div with class name 'pagination' and append it to the div with class 
        // name 'page'
        const paginationDiv = document.createElement('div');
        paginationDiv.className = 'pagination';
        page.appendChild(paginationDiv);

        // add a ul element to the 'pagination' div to store the pagination links
        const paginationLinksUL = document.createElement('ul');


        // for every page, add 'li' and 'a' tags with the page number as text content
        for (let i = 0; i < numPages; i++) {
            let li = document.createElement('li');
            let a = document.createElement('a');
            a.textContent = i + 1;
            a.href = "#";
            li.appendChild(a);
            paginationLinksUL.appendChild(li);
        }
        // add the 'ul' created to the 'pagination' div
        paginationDiv.appendChild(paginationLinksUL);

        // add event listener to each a tag so that when clicked, it calls 
        // the showPage function to display the appropriate page. But,
        // first of all, let's select all the buttons:
        const pageButtons = document.querySelectorAll('a');
        // set the first button to class of active
        pageButtons[0].classList.add("active");
        // then we loop through every button to add the event listener:
        for (let i = 0; i < pageButtons.length; i++) {
            pageButtons[i].addEventListener('click', (e) => {
                // select the active button
                const button = e.target;
                // when a button is clicked, remove all active classes
                for (let j = 0; j < pageButtons.length; j++) {
                    pageButtons[j].className = "";
                }
                // assign the button clicked text to 'pageNumber'
                let pageNumber = button.textContent;
                // set the clicked button to class name 'active' 
                button.className = "active";
                // call the showPage function based on which button has been pressed
                showPage(list, pageNumber);
            });
        }
    }
    showPage(list, 1);
    appendPageLinks(list);
});