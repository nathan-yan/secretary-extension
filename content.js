
var observeDOM = (function(){
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
  
    return function( obj, callback ){
      if( !obj || obj.nodeType !== 1 ) return; 
  
      if( MutationObserver ){
        // define a new observer
        var mutationObserver = new MutationObserver(callback)
  
        // have the observer observe foo for changes in children
        mutationObserver.observe( obj, { childList:true, subtree:true })
        return mutationObserver
      }
      
      // browser support fallback
      else if( window.addEventListener ){
        obj.addEventListener('DOMNodeInserted', callback, false)
        obj.addEventListener('DOMNodeRemoved', callback, false)
      }
    }
  })()

let current = {};
let first = true;

window.onload=function(){ 
    console.log("test!!");
    console.log(document.getElementsByClassName("_2xhi")[0].textContent);

    setInterval(function(m){
        
        // check all classes with name "_1qt4 _7vuo _5l-m"
        let convos = document.getElementsByClassName("_1qt4 _7vuo _5l-m");

        // just to be safe, check the first 10 conversations
        for (let i = 1; i < 10; i++) {
            let msg = convos[i].getElementsByClassName("_1htf _6zke")[0].textContent;
            let title = convos[i].getElementsByClassName("_1qt5 _5l-3")[0].textContent;

            if (msg.includes("You: ") && (current[title] !== msg)) {
                current[title] = msg;
                console.log("UPDATE: " + title + " : " + current[title]);

                if (!first) {
                    if (msg.includes("You: reminder") || msg.includes("You: Reminder") || msg.includes("You: I have") || msg.includes("You: i have")) {
                        var data = new FormData();
                        data.append('event', msg);
                        
                        var xhr = new XMLHttpRequest();
                        xhr.open('POST', 'https://notify.newportmathclub.org/record', true);
                        xhr.onload = function () {
                            // do something to response
                            console.log("200!");
                        };
                        xhr.send(data);
                    }
                }

                first = false;
            }
        }
    }, 2000);
}

    console.log("testingggg");


