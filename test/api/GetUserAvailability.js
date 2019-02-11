var ews = require('../..//build/output/node/src/js/ExchangeWebService');

var chai = require('chai');
var expect = chai.expect;


describe('GetUserAvailability', function(){

  it('should promise a response', function(){
    //create ServiceangeService object
    var service = new ews.ExchangeService(ews.ExchangeVersion.Exchange2013);
    service.Credentials = new ews.ExchangeCredentials("corp\madridme", "Madrid2019@");


    //set ews endpoint url to use
    // you can also use service.AutodiscoverUrl
    service.Url = new ews.Uri("https://autodiscover.italtel.com/EWS/Exchange.asmx");

    var attendee =[ new ews.AttendeeInfo("enrique.madrid@italtel.com")];

    //create timewindow object o request avaiability suggestions for next 48 hours,
    // DateTime and TimeSpan object is created to mimic portion of .net datetime/timespan object using momentjs
    var timeWindow = new ews.TimeWindow(ews.DateTime.Now, ews.DateTime.Now.AddDays(2));
    service.GetUserAvailability(attendee, timeWindow, ews.AvailabilityData.FreeBusyAndSuggestions)
      .then(function (availabilityResponse) {
        //do what you want with user availability
        expect(availabilityResponse).to.be.undefined;
        // console.dir(availabilityResponse);
      }, function (errors) {
        //log errors or do something with errors
      });
  });

});
