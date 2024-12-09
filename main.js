var sitename = document.getElementById("sitename");
var url = document.getElementById("url");
var tboody = document.getElementById("tboody")
var regex = /^(http:\/\/|https:\/\/)[a-zA-Z0-9-_.]+\.[a-zA-Z]{2,6}(\/\S*)?$/;
var usernameRegex = /[a-zA-Z0-9][a-zA-Z0-9-_.]{2,}[a-zA-Z0-9]$/;
var siteContainer = [];
if(localStorage.getItem("links") != null){
    siteContainer = JSON.parse(localStorage.getItem("links"));
    display();
}

function add(){    
    if (!sitename.value.trim() || !url.value.trim()) {
        alert(`Site Name and URL cannot be empty, Please follow the rules below:

          1- Site name must contain at least 3 characters
          2- Site URL must be a valid one`);
        return;
    }    
    if (!usernameRegex.test(sitename.value)) {
        alert("Invalid Site Name. It must:\n- Contain at least 3 characters.\n- Only use letters, numbers, dashes, underscores, and periods.\n- Not start or end with special characters.");
        return;
    }  
    if (!regex.test(url.value)) {
        alert("Invalid URL. It must start with http:// or https:// and have a valid domain.");
        return;
    }
    
    siteInfo = {
        WebsiteName:sitename.value,
        Visit:url.value,
    }
    siteContainer.push(siteInfo);     
    localStorage.setItem("links",JSON.stringify(siteContainer));
    display()
    clear()
}
function display(){
    var cartoona ="";
    for(var i=0; i<siteContainer.length; i++){
        cartoona+=`
     <tr>
        <td>${i+1}</td>
        <td>${siteContainer[i].WebsiteName}</td> 
        <td><button onclick="validateAndCreateLink(${i})" class="btn btn-success text-white"><i class="fa-solid fa-eye pe-2"></i>Visit</button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
     </tr>
        `
        }
        tboody.innerHTML= cartoona;
}
function  clear(){
    sitename.value="";
    url.value="";
}
function deleteProduct(productIndex){
    siteContainer.splice(productIndex,1);
    localStorage.setItem("links",JSON.stringify(siteContainer));
    display()
}
function validateAndCreateLink(checkIndex){
    
   if(regex.test(siteContainer[checkIndex].Visit)){
     var linkElement = document.createElement("a");
     linkElement.href = siteContainer[checkIndex].Visit
     linkElement.target = "_blank"; 
     linkElement.click();     
   }else{
    alert("Invalid URL. Please enter a valid link starting with http:// or https://")
   }
}



