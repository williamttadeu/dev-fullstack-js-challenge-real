

$(document).ready(function() {
    fetchStudentsList();
    $('body').on("click",".removeStudent",function(){
        const ra = ($(this).data("ra"));
        //another way
        //alert($(this).attr("data-ra"));
        //alert($(this).attr("id"));

        //confimation of delete
        const confirmation = confirm("Você deseja realmente excluir esse estudante?");
        if(confirmation){
            deleteStudent(ra);
        }
        
        
    });

});

//Delete Studente function
const deleteStudent = (ra) =>{
    fetch(`http://localhost:3000/students/delete/${ra}`,{
            method:"DELETE"
        }).then((response)=>{
            
            return response.json();
        }).then((data)=>{
            alert(data.message);
            fetchStudentsList();
        });

};


//This fuction will take students list
function fetchStudentsList(){

    $(".loader").show("fast");
    //$(".content-page").hide("slow");
    $(".content-page").show("slow");
    //fetch is API that allow we do HTTP requisitions
    fetch("http://localhost:3000/students/list")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            const table = $("#studentList tbody");
            table.html("");
            data.map(function(student){
                table.append(`

                    <tr>
                        <td>${student.ra}</td>
                        <td>${student.name}</td>
                        <td>${student.cpf}</td>
                        <td>
                            <a href="studentManager.html?/ra=${student.ra}">Editar</a>
                            <a id="" data-ra="${student.ra}" class="removeStudent" href="#">Excluir</a>
                        </td>
                    </tr>

                `);
            });

            //$(".loader").removeClass("loader");
            //or we can use "hide"
            $(".loader").hide("fast");
            $(".content-page").removeClass("display-none");
        });

}