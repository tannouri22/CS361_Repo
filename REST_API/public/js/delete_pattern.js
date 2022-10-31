function deletePattern(primaryKey) {
         let data = {
            primaryKey: primaryKey
         };
    
         var xhttp = new XMLHttpRequest();
         xhttp.open("DELETE", "/delete-pattern", true);
         xhttp.setRequestHeader("Content-type", "application/json");
        
    
         xhttp.onreadystatechange = () => {
             if (xhttp.readyState == 4 && xhttp.status == 204) {
             }
             else if (xhttp.readyState == 4 && xhttp.status != 204) {
                 console.log("There was an error with the input.")
             }
         }
         xhttp.send(JSON.stringify(data));
     }
    
    
    
    