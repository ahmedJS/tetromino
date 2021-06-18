class UI{
    showUser(name){

        // new instance of github operation class
        var github   = new GitHub;

        // get user info
        var userinfo = github.getUser(name);

       console.log( document.getElementById("result-container").innerHTML = "HELLO WORLD");

        

    }    
}


let ui = new UI;

var s = document.getElementById("search");
s.addEventListener("keyup",e=>{
    ui.showUser(e.target.value);
});


