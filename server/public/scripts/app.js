$(document).ready(function() {

    $('#submit-button').on('click', postData);

});


function postData() {
    event.preventDefault();

    var values = {};
    $.each($('#employeeForm').serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });

    console.log("these are the", values);

    $.ajax({
        type: 'POST',
        url: '/employees',
        data: values,
        success: function(data) {
            if(data) {
                // everything went ok
                console.log('from server:', data);
                getData();
            } else {
                console.log('error');
            }
        }
    });

}

// //clear out form
// $('#employeeForm').find('input[type=text]').val('');


// monthlySalaryExpense();







var empArray = [];

//calculate monthly salary expense
function monthlySalaryExpense(){
  var salaryExpense = 0;
  for(i = 0; i < empArray.length; i++){
    var emp = empArray[i];
    salaryExpense += parseInt(emp.salary/12);

  }



  //show each entry in a list
  function addEntry(){
    $('.output-container').append('<li></li>');

    var $el = $('.output-container').children().last();

    $el.append('.output-container').text(emp.firstname + ' ' + emp.lastname +
    ', #' + emp.empID + ', ' + emp.title +
      ', $' + emp.salary + '/year ').append('<button class="delete">Delete</button>');

  }

  addEntry()

  //set the delete button
    function deleteClick(){
      $(this).parent().remove();

    }


  //console.log(salaryExpense);

  //show updated total
  $('.monthly-total-comp').text('$' + salaryExpense + '/month');

  //delete entry from output-container
  $('.output-container').on('click', '.delete', deleteClick);


}
