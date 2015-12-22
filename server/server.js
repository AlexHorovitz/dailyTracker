Meteor.startup(function() {
  var today = new Date();
  today.setHours(0,0,0,0);

  if (HistoryCollection.find({date: {$gte: today}}).count() === 0) {
    var historyItems = [{
      date: start,
      proteinCount:  [],
      carbohydrateCount: [],
      beverageCount12oz: [],
      medicationTaken: false,
      vitaminsTaken: false,
      exerciseTimeInMinutes: 0,

    }];
    while ( historyItems.length > 0){
      HistoryCollection.insert(historyItems.pop());
    }
    console.log("Added today to the HistoryCollection"); 
  }
});