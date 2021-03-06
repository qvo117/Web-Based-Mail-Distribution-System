//Merged Emails
var emails = {};

//CSV & template elements from the form
const myForm = document.getElementById("opener");
const templateForm = document.getElementById("txt");
const csvFile = document.getElementById("csvFile");
const csvFileChosen = document.getElementById('csvFileChosen');
const txtFile = document.getElementById("template");
const templateChosen = document.getElementById('templateChosen');

//Side bar elements
// filebar = document.getElementById('filebar');
// sendbar = document.getElementById('sendbar');
upbar = document.getElementById('upbar');
loginbar = document.getElementById('loginbar');
loginPage = document.getElementById('login');
signOutbar = document.getElementById('signOutbar');

/* Shows Home div */
const showHome = () => {
    document.getElementById('home').style.display = 'block'
    document.getElementById('upload').style.display = 'none'
        // document.getElementById('files').style.display = 'none'
        // document.getElementById('send').style.display = 'none'
    document.getElementById('login').style.display = 'none'


    //None of the menu bar elements is selected
    // if (filebar.classList.contains('current')) {
    //     filebar.classList.remove('current');
    //     filebar.classList.add('default');
    // }

    // if (sendbar.classList.contains('current')) {
    //     sendbar.classList.remove('current');
    //     sendbar.classList.add('default');
    // }

    if (upbar.classList.contains('current')) {
        upbar.classList.remove('current');
        upbar.classList.add('default');
    }
    if (loginbar.classList.contains('current')) {
        loginbar.classList.remove('current');
        loginbar.classList.add('default');
    }
}

/* Shows Upload div */
const showUpload = () => {
    document.getElementById('upload').style.display = 'block'
    document.getElementById('home').style.display = 'none'
        // document.getElementById('files').style.display = 'none'
        // document.getElementById('send').style.display = 'none'
    document.getElementById('login').style.display = 'none'

    // if (filebar.classList.contains('current')) {
    //     filebar.classList.remove('current');
    //     filebar.classList.add('default');
    // }

    // if (sendbar.classList.contains('current')) {
    //     sendbar.classList.remove('current');
    //     sendbar.classList.add('default');
    // }

    if (upbar.classList.contains('default')) {
        upbar.classList.remove('default');
        upbar.classList.add('current');
    }
    if (loginbar.classList.contains('current')) {
        loginbar.classList.remove('current');
        loginbar.classList.add('default');
    }
}

/* Shows Files div */
// const showFiles = () => {
//     document.getElementById('upload').style.display = 'none'
//     document.getElementById('home').style.display = 'none'
//     // document.getElementById('files').style.display = 'block'
//     // document.getElementById('send').style.display = 'none'
//     document.getElementById('login').style.display = 'none'


//     // if (filebar.classList.contains('default')) {
//     //     filebar.classList.remove('default');
//     //     filebar.classList.add('current');
//     // }

//     // if (sendbar.classList.contains('current')) {
//     //     sendbar.classList.remove('current');
//     //     sendbar.classList.add('default');
//     // }

//     if (upbar.classList.contains('current')) {
//         upbar.classList.remove('current');
//         upbar.classList.add('default');
//     }
//     if (loginbar.classList.contains('current')) {
//         loginbar.classList.remove('current');
//         loginbar.classList.add('default');
//     }
// }

/* Shows Send div */
const showSend = () => {
    document.getElementById('upload').style.display = 'none'
    document.getElementById('home').style.display = 'none'
        // document.getElementById('files').style.display = 'none'
        // document.getElementById('send').style.display = 'block'
    document.getElementById('login').style.display = 'none'


    // if (filebar.classList.contains('current')) {
    //     filebar.classList.remove('current');
    //     filebar.classList.add('default');
    // }

    // if (sendbar.classList.contains('default')) {
    //     sendbar.classList.remove('default');
    //     sendbar.classList.add('current');
    // }

    if (upbar.classList.contains('current')) {
        upbar.classList.remove('current');
        upbar.classList.add('default');
    }
    if (loginbar.classList.contains('current')) {
        loginbar.classList.remove('current');
        loginbar.classList.add('default');
    }
}

/* Shows Login div */
const showLogin = () => {
    document.getElementById('upload').style.display = 'none'
    document.getElementById('home').style.display = 'none'
        // document.getElementById('files').style.display = 'none'
        // document.getElementById('send').style.display = 'none'
    document.getElementById('login').style.display = 'block'


    // if (filebar.classList.contains('current')) {
    //     filebar.classList.remove('current');
    //     filebar.classList.add('default');
    // }

    // if (sendbar.classList.contains('current')) {
    //     sendbar.classList.remove('current');
    //     sendbar.classList.add('default');
    // }

    if (upbar.classList.contains('current')) {
        upbar.classList.remove('current');
        upbar.classList.add('default');
    }
    if (loginbar.classList.contains('default')) {
        loginbar.classList.remove('default');
        loginbar.classList.add('current');
    }
}


/* Sends emails via a POST request */
function sendMail() {
    modalEmail.style.display = "block";
    for (var [student, email] of Object.entries(emails)) {
        //Gets the subject text for the email and remove it from email template
        var subjectLine = email.slice(email.indexOf('Subject'), email.indexOf('\n') + 1);
        email = email.replace(subjectLine, '').trim();
        var subjectText = subjectLine.slice(subjectLine.indexOf(':') + 1).trim();
        console.log("email", email);
        //Creates and posts AJAX HttpRequest to SendMail.php
        var httpr = new XMLHttpRequest();
        var fd = new FormData();
        fd.append("student", student);
        fd.append("email", email);
        fd.append("subjectText", subjectText);
        httpr.onload = function() {
            const serverResponse = document.getElementById("serverResponse");
        }
        httpr.open("POST", "sendMail.php");
        httpr.send(fd);
    }
}

/* Sends data to the database via a POST request */
function sendData() {
    const data = getCsvData(function(data, spreadSheet) {
        modal.style.display = "block";
        csvValues = data[1]
        column = data[0]
        lecturer = localStorage.getItem('lecturer')
        for (let i = 0; i < csvValues.length; i++) {
            for (const [column, value] of Object.entries(csvValues[i])) {
                var httpr = new XMLHttpRequest();
                var fd = new FormData();
                fd.append("lecturer", lecturer);
                fd.append("email", csvValues[i]["email"]);
                fd.append("column", column);
                fd.append("spreadSheet", spreadSheet);
                fd.append("csvValues", value);
                httpr.onload = function() {
                    //Testing purposes
                    const serverResponse = document.getElementById("serverResponse");
                    serverResponse.innerHTML = this.responseText;
                }
                httpr.open("POST", "post.php");
                httpr.send(fd);
            }
        }
        showStoredCsvs();
    })
}

/* Retrieves data from the database via a GET request */
async function getData() {
    var dbData = ""
    const storedCsvs = getStoredCsvs(function(storedCsvs) {
        for (i in storedCsvs) {
            //console.log(document.getElementById(storedCsvs[i]))
            if (document.getElementById(storedCsvs[i]).checked) {
                var httpr = new XMLHttpRequest();
                httpr.onload = function() {
                    const serverResponse = document.getElementById("serverResponse");
                    // serverResponse.innerHTML = this.responseText; 
                    dbData += this.responseText;
                    // calls function to convert data from database to obj
                    var data = convertToObject(dbData)
                    mergeData(data)
                }
                httpr.open("GET", `get.php?lecturer=${lecturer}&spreadsheet=${storedCsvs[i]}`);
                httpr.send();
            }
        }
    })

}

/* Converts retrieved data from database to object type.*/
function convertToObject(dbData) {
    var arr = dbData.split("\n");
    var obj = {}
    for (i of arr) {
        i = i.split(":")
        if (i[1] === undefined) { // If value pair is undefined, continue to next iteration
            continue;
        } else {
            temp_val = i[1].split("="); // split the key:value pair
        }
        if (!(i[0] in obj)) { // If student is not in obj yet
            temp_obj = {}
            temp_obj[temp_val[0]] = temp_val[1];
            obj[i[0]] = temp_obj
        } else { // If student is defined, add the values
            temp = obj[i[0]]; // grab dict val of that student
            temp[temp_val[0]] = temp_val[1] //add new key value pair 
            obj[i[0]] = temp // store back into value as key:value pair
        }
    }
    return obj; //Object of Objects
}

async function csvMerge() {
    getData()
}

/* Reads the email template.*/
function getTemplate(callback) {
    input = txtFile.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        var textTemplate = e.target.result;

        textTemplate = textTemplate.replace(/</g, "&lt;").replace(/>/g, "&gt;"); // Stops potential html injection
        callback(textTemplate);
    };
    reader.readAsText(input);
}

/* Shows email template */
function showTemplate() {
    const template = getTemplate(function(textTemplate) {
        let temp = document.getElementById("tempDiv");
        // Clears template div to show the current file
        temp.innerText = textTemplate;
    })
}

/* Merges retrieved data from database with email template.*/
async function mergeData(data) {
    const template = getTemplate(function(textTemplate) {
        emails = {};
        //loop through each dict obj containing CSV values of each student
        for (const [StudentEmail, StudentData] of Object.entries(data)) {
            var email = textTemplate;

            while (email.indexOf('[') != -1) {
                var placeholderStr = email.slice(email.indexOf('['), email.indexOf(']') + 1);
                var header = email.slice(email.indexOf('[') + 1, email.indexOf(']'));
                //If the header string exists in the dict obj, then replace it with the actual data
                if (StudentData[header]) {
                    email = email.replace(placeholderStr, StudentData[header]);
                } else {
                    //If the header string contains the if condition
                    if (header.includes('ifNonNull')) {
                        //get the column to check the condition
                        header = header.slice(header.indexOf(':') + 1).trim();
                        //check whether the value is 0
                        value = StudentData[header];
                        if (value == '0') {
                            //remove all text that this condition applies to
                            var textToRemove = email.slice(email.indexOf('[ifNonNull'), email.indexOf('[endif]') + 7);
                            email = email.replace(textToRemove, '');
                        } else {
                            email = email.replace(placeholderStr, '');
                            email = email.replace('[endif]', '');
                        }
                    }
                }
            }
            //adds newline chars at the end of each student's email content
            email += '\n\n------------\n\n'
            emails[StudentEmail] = email
        }
        console.log("emails", emails);
        showData()
    })
}

/* Shows the merged data in the div */
function showData() {
    tempStr = "";
    for (const [key, val] of Object.entries(emails)) {
        tempStr += val;
    }
    tempStr += "\n"; // adds newline char at the end of each block
    document.getElementById("tempDiv").innerText = tempStr;
}

/* Reads the name of CSV file */
csvFile.addEventListener('change', function() {
    csvFileChosen.textContent = this.files[0].name
})

/* Reads the name of email template */
txtFile.addEventListener('change', function() {
    templateChosen.textContent = this.files[0].name
})

/* Prevents the submit buttons from refreshing the page */
myForm.addEventListener("submit", function(e) {
    e.preventDefault();
});

templateForm.addEventListener("submit", function(e) {
    e.preventDefault();
});

/* Stores the CSV data in an array */
function csvToArray(str, delimiter = ",") {
    //Array of headers
    const headers = str.slice(0, str.indexOf("\r\n")).split(delimiter);
    var data = new Array();
    var alldata = new Array();
    for (let i = 0; i < headers.length; i++) {
        headers[i] = headers[i].trim();
    };
    // CSV rows
    const rows = str.trimRight().slice(str.indexOf("\n") + 1).split("\r\n");
    // Splits row strings into an array, then adds them to data array
    for (let i = 0; i < rows.length; i++) {
        data.push(rows[i].split(delimiter));
        for (let j = 0; j < headers.length; j++) {
            data[i][j] = data[i][j].trim();
        };
    };
    // Assigns data from data array to a dictionary with corresponding headers
    for (let j = 0; j < data.length; j++) {
        var dict = new Object();
        for (let i = 0; i < headers.length; i++) {
            dict[headers[i]] = data[j][i];
        }
        alldata.push(dict);
    }
    // Returns the array with headers and data array
    const farray = [headers, alldata];
    return farray;
}

/* Sorts CSV table by the column selected
Modified from https: //www.w3schools.com/howto/howto_js_sort_table.asp */
function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("dataTable");
    switching = true;
    // Set the sorting direction to ascending
    dir = "asc";
    // While switching has been done
    while (switching) {
        // Start by saying: no switching is done
        switching = false;
        rows = table.rows;
        // Loops through all rows except the table headers row
        for (i = 1; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching
            shouldSwitch = false;
            //Compares current row and the next row
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            // Checks if the two rows should switch place, based on the direction, asc or desc 
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    // If so, mark as a switch and break the loop
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    // If so, mark as a switch and break the loop
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            // If a switch has been marked, make the switch and mark that a switch has been done
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            // Each time a switch is done, increase this count by 1:
            switchcount++;
        } else {
            //If no switching has been done AND the direction is "asc", set the direction to "desc" and run the while loop again.
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

/* Creates the CSV table */
function previewData() {
    const data = getCsvData(function(data, spreadSheet) {
        const headers = data[0]
        const values = data[1]
            // Create table
        let main = document.getElementById("tableDiv");
        let table = document.createElement('table');
        table.setAttribute("id", "dataTable");
        // Inserts row for headers
        table.insertRow();
        // Adds header values to header row
        for (h of headers) {
            let hcell = table.rows[table.rows.length - 1].insertCell();
            hcell.textContent = h;
        }
        // Adds array values corresponding to the correct header to table
        for (arr of values) {
            table.insertRow();
            for (let i = 0; i < headers.length; i++) {
                let vcell = table.rows[table.rows.length - 1].insertCell();
                vcell.textContent = arr[headers[i]];
            }
        }
        // Gets the email header cell
        let email = table.rows[0].cells[0];
        // Gets the PrefName header cell
        let name = table.rows[0].cells[1];
        // Adds ability to sort by header cell email with a mouse click
        email.setAttribute('onclick', 'sortTable(0);');
        // Adds pointer cursor on hover
        email.setAttribute('style', 'cursor: pointer;');
        // Sets class to invert colors on highlight
        email.setAttribute('class', 'cellh');
        // Adds ability to sort by header cell name with a mouse click
        name.setAttribute('onclick', 'sortTable(1);');
        // Adds pointer cursor on hover
        name.setAttribute('style', 'cursor: pointer;');
        // Sets class to invert colors on highlight
        name.setAttribute('class', 'cellh');
        // Clears table div to show the current file
        main.innerHTML = "";
        // Adds table to page
        main.appendChild(table);
    })
}

/* Reads the CSV file */
function getCsvData(callback) {
    const input = csvFile.files[0];
    const reader = new FileReader();
    const spreadSheet = csvFile.value.substring(csvFile.value.lastIndexOf("\\") + 1);
    reader.onload = function(e) {
        const text = e.target.result;
        const data = csvToArray(text);
        callback(data, spreadSheet)
    };
    reader.readAsText(input);
}

/* Gets all the stored CSV files of the lecturer */
function getStoredCsvs(callback) {
    var httpr = new XMLHttpRequest();
    httpr.onload = function() {
        //const serverResponse = document.getElementById("serverResponse");
        var storedCsvs = this.responseText.split(',');
        console.log("storedCsvs", storedCsvs);
        callback(storedCsvs)
    }
    httpr.open("GET", `getcsv.php?lecturer=${lecturer}`);
    httpr.send();
}

/* Shows all the stored CSV files of the lecturer */
function showStoredCsvs() {
    var storedCsvs = getStoredCsvs(function(storedCsvs) {
        for (i in storedCsvs) {
            if (document.getElementById(storedCsvs[i]) == null) {
                var myDiv = document.getElementById("showfiles");
                //creates checkbox
                var checkbox = document.createElement('input');
                checkbox.type = "checkbox";
                checkbox.name = "name";
                checkbox.value = "value";
                checkbox.id = storedCsvs[i];
                //creates label
                var label = document.createElement('label');
                label.htmlFor = storedCsvs[i];
                label.appendChild(document.createTextNode(storedCsvs[i]));
                myDiv.appendChild(checkbox);
                myDiv.appendChild(label);
            }

        }
    })
}

/* Login */
function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    lecturer = profile.getGivenName();
    localStorage.setItem('lecturer', lecturer);
    //shows all stored CSV files of the lecturer
    showStoredCsvs();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    //console.log('Family Name: ' + profile.getFamilyName());
    //console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
    //Once logged in - show the other side nav items & upload page
    if (id_token !== undefined && id_token !== '' && id_token !== null) {
        showUpload();
        loginbar.style.display = "none";
        // filebar.style.display = "block";
        // sendbar.style.display = "block";
        upbar.style.display = "block";
        signOutbar.style.display = "block";
        //greet user on the website
        document.querySelector('#content').innerText = "Hello " + lecturer + "!";
    }
}

/* Sign out */
function signOut() {
    var auth = gapi.auth2.getAuthInstance();
    auth.signOut().then(function() {
        //Button should say "Sign in" instead of "Signed in"
        auth.disconnect();
        document.location.href = "http://gunit.online/#";
        console.log('user signed out');
        document.querySelector('#content').innerText = " ";
    })
};

// Gets the modal
var modal = document.getElementById("ModalCSV");
var modalEmail = document.getElementById("ModalEMAIL");

// Gets the button that opens the modal
var btn = document.getElementById("myBtn");
var emailbtn = document.getElementById("emailBtn");

// Gets the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var span1 = document.getElementsByClassName("close")[1];


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}
span1.onclick = function() {
    modalEmail.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal || event.target == modalEmail) {
        modal.style.display = "none";
        modalEmail.style.display = "none";
    }
}