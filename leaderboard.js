
// Create a MongoDB Collection
PlayersList = new Mongo.Collection('players');
// Code that only runs on the client (within the web browser)
if(Meteor.isClient){

  Session.setDefault("counter", 5);

  // Helper functions execute code within templates
  Template.leaderboard.helpers({
    'player': function(){

        // Retrieve all of the data from the "PlayersList" collection
        return PlayersList.find({}, {sort: {score: -1, name: 1} })

    },
    'selectedClass': function(){

        // Get the ID of the player being iterated through
        var playerId = this._id;

        // Get the ID of the player that's been clicked
        var selectedPlayer = Session.get('selectedPlayer');

         // Do these IDs match?
        if(playerId == selectedPlayer){

            // Return a CSS class
            return "selected"
            
        }

    },
    'showSelectedPlayer': function(){

      // Get the ID of the player that's been clicked
      var selectedPlayer = Session.get('selectedPlayer');

      // Retrieve a single document from the collection
      return PlayersList.findOne(selectedPlayer)

    },
    'disableVote': function(){
      var counter = Session.get('counter');

      if(counter == 0){
        return "disabled"
      }
    },
    'enableVote': function(){
      var counter = Session.get('counter');

      if(counter >= 5){
        return "disabled"
      }
    }
  });

  // Events trigger code when certain actions are taken
  Template.leaderboard.events({
      'click .player': function(){

          // Retrieve the unique ID of the player that's been clicked
          var playerId = this._id;

          // Create a session to store the unique ID of the clicked player
          Session.set('selectedPlayer', playerId);

      },
      'click .increment': function(){
        
        Session.set("counter", Session.get("counter") - 1);        

        // Get the ID of the player that's been clicked
        var selectedPlayer = Session.get('selectedPlayer');

        // Update a document and increment the score field by 1
        PlayersList.update(selectedPlayer, {$inc: {score: 1} });

      },
      'click .decrement': function(){
        
        Session.set("counter", Session.get("counter") + 1);

        // Get the ID of the player that's been clicked
        var selectedPlayer = Session.get('selectedPlayer');

        // Update a document and decrement the score field by 1
        PlayersList.update(selectedPlayer, {$inc: {score: -1} });

      }
  });

  Template.userScore.helpers({
    counter: function(){
      return Session.get("counter");
    }
  });

}

// Code that only runs on the server (where the application is hosted)
if(Meteor.isServer){

}