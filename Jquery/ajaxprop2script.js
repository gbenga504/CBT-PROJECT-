    /**
    @ author, ANIFOWOSHE GBENGA DAVID 
    The google prototype designed by ANIFOWOSHE GBENGA DAVID , THANKS TO - KAYODE(JAVSCRIPT MENTOR)
    FEDERAL UNIVERSITY OF TECHNOLOGY , AKURE , SEPTEMBER 2015.
    #TEAM BUG-BUSTERS 
    (KAYODE, TAYO, DARE, GBEMIRO, GBENGA)
    WRITTEN USING JAVASCRIPT, JQUERY, AJAX, BOOTSTRAP, HTML5, CSS3 
    
    */


        /* list of declarations and initializations */

            var result = document.getElementById("show"),   //holds the dropdown list of search
                entSearch = document.getElementById("search"),  //holds the input tag attributes 
                xhp,                                            // holds the XMLHttpRequest method of ajax
                canvas,                                            //holds the canvas
                mainShow = $("#maker"),                             //holds the div containing the dropdown list of search
                context,                                            //holds the canvas 2d attributes
                infoDisplay = document.getElementById("properInfo"), //holds the full details of each search
                butclick = $("#but"),                                   //button gotten using jquery
                search = document.getElementById("searchHeader"),       //holds the search header
                envt = document.getElementById("listen");               // holds the div containing the event that is to be listened to
            
            
            var newEvent = new CustomEvent("guess",{details:'little A.I'})  //creates a custom event called guess
            
            
         /* End of initializations */
            
            
            
            
            
            /* This handles the canvas */
            function cnvs(){
                canvas = document.getElementById("canvas");
                context = canvas.getContext("2d");
                
                context.beginPath();
                context.font = "30px Comic sans ms"
                context.textAlign = "center";
                context.fillStyle = "green";
                context.fillText("B", 50, canvas.height/2); //drawing text on the canvas 
                context.fillStyle = "teal";
                context.fillText("U", 90, canvas.height/2);
                context.fillStyle = "red";
                context.fillText("G", 130, canvas.height/2);
                context.fillStyle = "red";
                context.fillText("G", 170, canvas.height/2);
                context.fillStyle = "teal";
                context.fillText("E",210, canvas.height/2);
                context.fillStyle = "green";
                context.fillText("R", 250, canvas.height/2);
            }
            
            /* End of canvas */


            cnvs(); //calling the canvas 



            
            
            /* GLOBAL EVENT LOADAJAX TO HOLD THE AJAX METHOD TO BE USED BY ANY FUNCTION */

            function loadajax(url,func){

                if(window.XMLHttpRequest){
                    xhp = new XMLHttpRequest();
                }
                else{
                    xhp = new ActiveXObject("Microsoft.XMLHttp");  //cross browser checking
                }
                
                xhp.onreadystatechange = func;
                
                xhp.open("GET", url, true); //preparing the request
                xhp.send();                 //sends the request
            }
            
            /*End of global event */





            
            /*Function handles the oninput of the text and the button click event */

            function searcher(e){
                
                return loadajax("jsontxt2.json", function(){
                    

                    
                    if(xhp.readyState == 4 && xhp.status == 200){
                    var collect = JSON.parse(xhp.responseText); //parses it unto a javascript object
                         
                         result.innerHTML = "";
                         infoDisplay.innerHTML = "";
                        
                         mainShow.removeClass("display");
                         search.innerHTML = "";
                                                
                        
                         for (var i=0; i< collect.length ; i++){
                            
                            var eas = collect[i]["name"];
                             
                             if(eas.indexOf(entSearch.value.toUpperCase()) != -1 && entSearch.value != ""){
                                
                                result.style.display = "inherit";
                                search.innerHTML = "Search Results";
                                mainShow.addClass("display");
                                
                                infoDisplay.innerHTML += collect[i]["name"] + "<br>" + "<u>PERSONAL INFORAMTION STATED BELOW</u>" + "<br>" + "CURRENT LOCATION: " + collect[i]["school"] + "<br><br>"
                                    
                                result.innerHTML += "<li>" + collect[i]["name"] + "</li>";
                                 
                                    if(e.target.nodeName == "BUTTON"){
                                        result.style.display = "none"; 
                                        mainShow.removeClass("display");
                                        } 
                                 
                                 continue;
                             }

                         }
                        

    
                    }

                })
                
            }
            /* End of the function */
            
            
            
            
            
            /*This monitors the passing of clicked search list into the input search box */
           function monitor(e){ 
                entSearch.value = e.target.innerHTML
            }
            /*End of monitiorer */




            /*little A.I that helps to suggest search options for users */
            function myAi(e){
                if(infoDisplay.innerHTML == ""){
                  
                   return loadajax("jsontxt2.json", function(){
                        if(xhp.status == 200 && xhp.readyState == 4){
                            
                            
                            var collect = JSON.parse(xhp.responseText);
                            
                            
                            for(var r=0; r < collect.length ; r++){
                                
                                var eas = collect[r]["name"];
                                if(entSearch.value.toUpperCase().indexOf(collect[r]["name"]) != -1){
                                
                                    search.innerHTML = "searched for: " + entSearch.value + "<br>" + "DO you mean: " + collect[r]["name"];
                                    infoDisplay.innerHTML += collect[r]["name"] + "<br>" + "<u>PERSONAL INFORAMTION STATED BELOW</u>" + "<br>" + "CURRENT LOCATION: " + collect[r]["school"] + "<br><br>"
                                     continue; 
                                    
                                    
                                }
                                
                                
                            }
                            
                            
                            
                            
                        }
                }) 
            }
        }
        /*End of search options */

    

            /*List of Event handlers to be handled after the normal functions have been added to the global environm=ental variable */

            result.addEventListener("click",monitor); //for the clicked list tags       1
            envt.addEventListener("input",searcher); // monitors the input under the specific div tag       2
            butclick.bind("guess", myAi);           //binds the A.I using jquery to a custom event to a button      4-binded to event dispatched
            butclick.bind("click", searcher);       //monitors the input and searches when button is clicked        3
            

            butclick.click(function(){
                document.getElementById("but").dispatchEvent(newEvent); //dispatches custom event using the button when it is clicked 
            })
            
            
            
            
            butclick.click(function(){
                if(mainShow.val() == ""){
                    search.innerHTML = "SERACH INFORAMTION NOT FOUND"; //diplays not found if search result is not found.
                }
            })
            
            /*End of the event handlers */
            

            
            /*End of Google prototype by #ream Bugbusters */