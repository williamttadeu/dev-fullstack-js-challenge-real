//JQUERY run this function when the page is ready
$(document).ready(function(){
    fetchStudent();
    
});

function fetchStudent(){
    //to fetch parameters from url we will use um classe
    // of javascript "URLSearchParams"
    const urlSearch = new URLSearchParams(window.location.search);
    
    const ra = urlSearch.get("/ra");
    console.log(urlSearch.get("/ra"));//different from Jonathan, i need add "/"

    if(ra){
        fetch(`http://localhost:3000/students/find/${ra}`)
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
            console.log(data);


            $(".loader").hide("fast");
            $(".content-page").show("slow");

        });

        //alert("You Have to search in API")
    }else{
        alert("Nenhum usuário encontrado")
    }

    

}