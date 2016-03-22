$(document).ready(function() {

    $('#submit-button').on('click', getFormData);
    getData();
    // appendDom();
});
var yearlySalaryExpense = 0;
var salaryExpense = 0;
var salaryArray = {};

// function doItAll(){
//   getFormData();
//   // postData();
//   // getData();
//   // appendDom();
//   // monthlySalaryExpense();
// }

var globalData;

var values = {};

function getFormData() {
      event.preventDefault();

      $.each($('#employeeForm').serializeArray(), function(i, field) {
          values[field.name] = field.value;
      });

      //clear out form
    $('#employeeForm').find('input[type=text]').val('');

      console.log("these are the", values);

      postData(values);
      getData();


}


function postData() {
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

//get the data from the db
function getData() {
    $.ajax({
        type: 'GET',
        url: '/employees',
        success: function(data) {
            // console.log(data);
            // globalData = data;
            appendDom(data);
        }
    });
}


//try Ryan's way
function appendDom(empData){
  yearlySalaryExpense = 0;
  $('.output-container').empty();
  empData.forEach(function(employee){
    $('.output-container').append('<p>' + employee.lastname + ', ' + employee.firstname + ': ' + employee.emp_id
      + ', ' + employee.title + ', ' + employee.salary + '<p>');

      // salaryArray.push(employee.salary)

    yearlySalaryExpense += parseInt(employee.salary);

  });

  salaryExpense = yearlySalaryExpense/12;
  console.log(salaryExpense);


  appendSalaryExpense();

}

function appendSalaryExpense(){
  $('.monthly-total-comp').empty();
  $('.monthly-total-comp').text('$' + salaryExpense + '/month');
}
