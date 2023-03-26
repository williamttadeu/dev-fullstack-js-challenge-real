

$(document).ready(function() {
    fetchStudentsList();

});

//This fuction will take students list
function fetchStudentsList(){
    //fetch is API that allow we do HTTP requisitions
    fetch("http://localhost:3000/students/list")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            
            
            const table = $("#studentList tbody");
            data.map(function(student){
                table.append(`

                    <tr>
                        <td>${student.ra}</td>
                        <td>${student.name}</td>
                        <td>${student.cpf}</td>
                        <td>
                            <a href="studentManager.html?/ra=${student.ra}">Editar</a>
                            <a href="#">Excluir</a>
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