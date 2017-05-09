import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class DataProvider {
  // Data Provider
  // This is the provider class for most of the Firebase observables in the app.

  constructor(public angularfire: AngularFire) {
    console.log("Initializing Data Provider");
  }

  // Get all users
  getUsers() {
    return this.angularfire.database.list('/accounts', {
      query: {
        orderByChild: 'name'
      }
    });
  }

  // Get user with username
  getUserWithUsername(username) {
    return this.angularfire.database.list('/accounts', {
      query: {
        orderByChild: 'username',
        equalTo: username
      }
    });
  }

  // Get logged in user data
  getCurrentUser() {
    return this.angularfire.database.object('/accounts/' + firebase.auth().currentUser.uid);
  }

  // Get user by their userId
  getUser(userId) {
    return this.angularfire.database.object('/accounts/' + userId);
  }

  // Get requests given the userId.
  getRequests(userId) {
    return this.angularfire.database.object('/requests/' + userId);
  }

  // Get friend requests given the userId.
  getFriendRequests(userId) {
    return this.angularfire.database.list('/requests', {
      query: {
        orderByChild: 'receiver',
        equalTo: userId
      }
    });
  }

  // Get conversation given the conversationId.
  getConversation(conversationId) {
    return this.angularfire.database.object('/conversations/' + conversationId);
  }

  // Get conversations of the current logged in user.
  getConversations() {
    return this.angularfire.database.list('/accounts/' + firebase.auth().currentUser.uid + '/conversations');
  }

  // Get messages of the conversation given the Id.
  getConversationMessages(conversationId) {
    return this.angularfire.database.object('/conversations/' + conversationId + '/messages');
  }

  // Get messages of the group given the Id.
  getGroupMessages(groupId) {
    return this.angularfire.database.object('/groups/' + groupId + '/messages');
  }

  // Get groups of the logged in user.
  getGroups() {
    return this.angularfire.database.list('/accounts/' + firebase.auth().currentUser.uid + '/groups');
  }

  // Get group info given the groupId.
  getGroup(groupId) {
    return this.angularfire.database.object('/groups/' + groupId);
  }
}
