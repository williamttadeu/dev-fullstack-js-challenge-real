//JQUERY run this function when the page is ready
$(document).ready(function(){
    //to fetch parameters from url we will use um classe
    // of javascript "URLSearchParams"
    const urlSearch = new URLSearchParams(window.location.search);
    
    const ra = urlSearch.get("/ra");//different from method, i need add "/"
    if(ra){
        fetchStudent(ra);
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

        fetch("http://localhost:3000/students/save", {
            method: "POST",
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

function fetchStudent(ra){

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

            $(".loader").hide("fast");
            $(".content-page").show("slow");

        });

    

}