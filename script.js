'use strict';

$(() => {
  // getContactsFromStorage();
  upDateTable();
  $('#addContacts').submit(addContact);
  $('tr').on('click','td',editContact);

  // $('.edit').click(() => {
  //   console.log($(this));
  // });
});

function editContact(){
  let index = $(this).parent().index();
  let fname= $(this).siblings('td').eq(0).text();
  let lname= $(this).siblings('td').eq(1).text();
  let mail= $(this).siblings('td').eq(2).text();
  let ph= $(this).siblings('td').eq(3).text();
  $('#editModal').modal('show');
  $('#eFirstname').val(fname);
  $('#eLastname').val(lname);
  $('#eEmail').val(mail);
  $('#ePhoneNum').val(ph);

  // let cFname = $('#eFirstname').val();
  // let cLast = $('#eLastname').val();
  // let cEmail = $('#eEmail').val();
  // let cPhone = $('#ePhoneNum').val();
 let i2 = --index;
  // $('body').data('index',i2);
  // $('#changeContact').submit(changeContact);
  $('#applyChanges').click(()=> changeContact(i2));
  $('#deleteContact').click(() => removeContact(i2));
  // let i3 = $('body').data('index');
  // console.log("index",i3);
}

function changeContact(e){
  // e.preventDefault();
  let firstName = $('#eFirstname').val();
  let lastName = $('#eLastname').val();
  let email = $('#eEmail').val();
  let phone = $('#ePhoneNum').val();
  let arr=[firstName,lastName,email,phone];
  // let i = $('body').data('index');
  // console.log(e);
  let cData = getDataFromStorage();
  cData[e] = toObject(arr);
  // console.log(this);
  // cData.push(i);
  setDataToStorage(cData);
  upDateTable();
}

function removeContact(i){
  let rData = getDataFromStorage();
  // console.log(rData.splice(i,1));
  rData.splice(i,1);
  setDataToStorage(rData);
  upDateTable();
}

function upDateTable(){
  let uData = getDataFromStorage();
  // console.log(uData);
  let $trr = uData.map(obj => {
    // console.log("udDate Fun", obj);
    // let $tr = $('#template').clone();
    // $tr.removeAttr('id');
    return createContactRow(toArray(obj));
    // $tr.find('.firstName').text(obj[first-name]);
    // $tr.find('.lastName').text(obj[last-name]);
    // $tr.find('.emailAd').text(obj[email]);
    // $tr.find('.phoneNum').text(obj[phone]);
    // return $tr;
  });
  // let jo;
  // $trr.forEach(e => {
  //   // jo = e;
  //   $('tbody').append(e);
  //   // console.log("e",e);
  // });
  // console.log("$tr", jo);
  // let ed = $('<span>').text('Edit').addClass('btn btn-danger btn-xs edit-btn');
  // $('.edit').append(ed);
  $('tbody').empty().append($trr);
  // $('tr').on('click','span',editContact);
  $('form')[0].reset();

}

function toObject(d){
	return {
		"first_name" : d[0],
		"last_name" : d[1],
		"email" : d[2],
		"phone" : d[3]
	}
}

function toArray(d){
  return [d["first_name"],d["last_name"],d["email"],d["phone"]];
}

// Array.prototype.toContactObj = function(d){
// 	return {
// 		"first-name" : d[0],
// 		"last-name" : d[1],
// 		"email" : d[2],
// 		"phone" : d[3]
// 	}
// }

function getDataFromStorage(){
  try{
    var sData=JSON.parse(localStorage.storedContacts);
  }catch(e){
    sData = [];
  }
  return sData;
}

function setDataToStorage(data){
  localStorage.storedContacts=JSON.stringify(data);
  // location.reload();
}

function toContactTable(obj){
  let Data = getDataFromStorage();
  Data.push(obj);
  setDataToStorage(Data);
  upDateTable();
}


function createContactRow(info) {
  let $tr = $('<tr>');

  $tr.append(`<td>${info[0]}</td>`);
  $tr.append(`<td>${info[1]}</td>`);
  $tr.append(`<td>${info[2]}</td>`);
  $tr.append(`<td>${info[3]}</td>`);

  let ed = $('<span>').text('Edit').addClass('btn btn-danger btn-xs edit-btn');
  let td = $('<td>').append(ed);
  $tr.append(td);
  // console.log(info);
  // $tr.removeAttr('id');
  // let $trr = $('tr')[1];
  // ('td');
  // let newRow = $td.map((i,e) => {
  //   // var c = info[i];
  //   $(e).text(info[i]);
  //   return e;
  //   // console.log("addtd",e,"data", info[i]);
  // });
  // // return newRow;
  // // $('tbody').append($('<tr>').append(newRow));
  // // debugger;
  // // return $td;
  // // return $li;
  // let $tRow = $('<tr>').addClass("edit").append(newRow);
  // console.log("tRow:",$tRow);
  // debugger;
  return $tr;
  // console.log($tr);
}

function addContact(e){
  e.preventDefault();
  let firstName = $('#firstname').val();
  let lastName = $('#lastname').val();
  let email = $('#email').val();
  let phone = $('#phoneNum').val();
  let arr=[firstName,lastName,email,phone];
  toContactTable(toObject(arr));
  // document.getElementById("addContact").reset();
  upDateTable();
  // createContact(arr);
}

// function createNewRow(){
//
// }
