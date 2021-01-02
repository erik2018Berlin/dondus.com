const axios = require('axios');

var userdoc = require('../demodaten/user.json');
var user = userdoc;
var providerdoc = require('../demodaten/provider.json');
var provider = providerdoc;
var servicedoc = require('../demodaten/service.json');
var service = servicedoc;
var meeting_slotdoc = require('../demodaten/meeting-slot.json');
var meeting_slot = meeting_slotdoc;
module.exports = {

  start: function () {



     for(var i = 0; i< user.length; i++ ){
       this.postRequest_user(i);
       console.log(meeting_slot[0].access_token);
     }

    /*
     for(var a = 0; a< user.length; a++ ){
        this.postRequest_provider(a);
      }
      for(var b = 0; b< user.length; b++ ){
        this.postRequest_service(b);
      }
      for(var c = 0; c< user.length; c++ ){
        this.postRequest_meeting_slot(c);
      }*/
  },
  postRequest_user: function (i){


  //CREATE USER
    axios.post('http://0.0.0.0:9000/users', {
      access_token: 'VBv8VuuehYuaqgt9tHUhQzgFmaPPkTM1',
      email: user[i].email,
      password: user[i].password
    })
      .then((response) => {
       // var user_token = response.data.token;
        provider[i].access_token = response.data.token;
        service[i].access_token = response.data.token;
        meeting_slot[i].access_token = response.data.token

      }, (error) => {
        console.log(error);
      });

  },
  postRequest_provider: function (i){

    //CREATE PROVIDER
    axios.post('http://0.0.0.0:9000/provider', {
      access_token: provider[i].access_token,
      street: provider[i].street,
      number: provider[i].number,
      postcode: provider[i].postcode
    })
      .then((response) => {
        service[i].providerId = response.data.id;

      }, (error) => {
        console.log(error);
      });

  },
  postRequest_service: function (i){

//CREATE SERVICE
    axios.post('http://0.0.0.0:9000/services', {
      access_token: service[i].access_token,
      providerId: service[i].providerId,
      postcodes: service[i].postcodes,
      title: service[i].title,
      category: service[i].category,
      description: service[i].description,
      price: service[i].price,
      pictures: service[i].pictures
    })
      .then((response) => {
        meeting_slot[i].serviceId = response.data.id;

      }, (error) => {
        console.log(error);
      });

  },
  postRequest_meeting_slot: function (i){

    //CREATE MEETING-SLOT
    axios.post('http://0.0.0.0:9000/meeting-slots', {
      access_token: meeting_slot[i].access_token,
      serviceId: meeting_slot[i].serviceId,
      date: meeting_slot[i].date.$date,
      title: meeting_slot[i].status
    })
      .then((response) => {
      }, (error) => {
        console.log(error);
      });

  }

};
