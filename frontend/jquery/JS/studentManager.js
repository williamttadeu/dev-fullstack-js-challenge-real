//const { url } = require("inspector");

//JQUERY run this function when the page is ready
$(document).ready(function(){

    if(isEditingMode()){
        fetchStudent();
    } else{
        //it means that we are joing a new student
        $(".loader").hide();
        $(".content-page").show();
    }

    $("#studentForm").submit((event)=>{
        event.preventDefault();
        //take the values of forms
        const body ={
            name: $(this).find("#name").val(),
            cpf: $(this).find("#cpf").val(),
            ra: $(this).find("#ra").val(),
            email: event.target.email.value,//Pure javascript
        };

        //To avoid code repetition
        let methodEndpoint;
        let urlEndpoint;

        if(isEditingMode()){
            methodEndpoint = "PUT";
            urlEndpoint = `http://localhost:3000/students/edit/${getRaFromUrl()}`;
        }else{
            methodEndpoint = "POST";
            urlEndpoint = `http://localhost:3000/students/save`;
        }
        console.log(methodEndpoint,urlEndpoint);

         fetch(urlEndpoint, {
            method: methodEndpoint,
            body: JSON.stringify(body),
            headers:{
                Accept: "application/json",
                "Content-Type": "application/json",
                    },
            })
            .then((response)=>{
                return response.json();
            })
            .then((data)=>{
                alert(data.message);
                document.location.href = "studentsList.html";
            });

    });     
    
});

function fetchStudent(){

    fetch(`http://localhost:3000/students/find/${getRaFromUrl()}`)
        //I take the aswer and transform the then for a Json
        //due to i want to work with this as data
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            const studentForm = $("#studentForm");

            //allways when i work with input i use "val"
            studentForm.find("#name").val(data.name);
            studentForm.find("#email").val(data.email);
            studentForm.find("#ra").val(data.ra);
            studentForm.find("#cpf").val(data.cpf);

            $(".loader").hide("fast");
            $(".content-page").show("slow");

        });

}

function isEditingMode(){
    //to fetch parameters from url we will use um classe
    // of javascript "URLSearchParams"
    const urlSearch = new URLSearchParams(window.location.search);
    return urlSearch.has("/ra");
    //another way
    //return ra ? true: false;
    //const ra = urlSearch.get("/ra");//different from method, i need add "/"
}

function getRaFromUrl(){
    const urlSearch = new URLSearchParams(window.location.search);
    return urlSearch.get("/ra");
}