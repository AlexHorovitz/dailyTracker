

if (Meteor.isClient) {
  // counter starts at 0

  Template.registerHelper('formatDate', function(date) {
    return moment(date).format('dddd MMM DD, YYYY');
  });

  Template.nav.helpers({

  });

  Template.nav.events({

  });

  Template.today.helpers({
    historyItems: function() {
      var start = new Date();
      start.setHours(0,0,0,0);

      return HistoryCollection.find({date: {$gte: start}});
    },
    
  });

  Template.today.events({

  });

  Template.todayItems.helpers({

    
  });

  Template.todayItems.events({
    'change [type=checkbox]': function(evt,ui){
        
      var valueOfCheckBox = event.target.checked;
      var changes = { $set: {} };
      var fieldToUpdate = evt.target.id;
      // This makes sure we update the field that got changed without having to look it up ...
      changes.$set[fieldToUpdate] = valueOfCheckBox;
      var query = { _id: ui.data._id}; 
      HistoryCollection.update(query, changes);
    },
    "click .addButton": function(evt,ui) {
      var fieldToUpdate = evt.target.id;
      var gramsFieldToUpdate = evt.target.name;
      
      var foodItem = {
        name: fieldToUpdate,
        description: "generic item" ,
        proteinGrams: 0,
        carbohydrateGrams: 0,
        fatGrams: 0,
      };

      foodItem[gramsFieldToUpdate] = 1 // we're dealing with one unit of something we are tracking at a time

      // We're going to insert a generic item at this point
      var changes = { $push: {} };

      changes.$push[fieldToUpdate] = foodItem;
      var query = { _id: ui.data._id}; 
      HistoryCollection.update(query, changes);

      console.log("clicked addButton for: "+fieldToUpdate); 


    },
    "click .subtractButton": function(evt,ui) {
      var fieldToUpdate = evt.target.id;
      var changes = { $pop: {} };

      changes.$pop[fieldToUpdate] = 1;
      var query = { _id: ui.data._id}; 
      HistoryCollection.update(query, changes);
      console.log("clicked subtractButton for: "+fieldToUpdate); 
    }
    


  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
