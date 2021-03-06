const HelperFunctions = require("../util/helperFunctions");
const User = require("../models/user");

module.exports = {
    // Adds a conversationId to the user's list of conversations.
    addConversation: (value, id, res) => {
        User.findById(id, (error, document) => {
            if(error) {
                res.writeHead(409, {"Content-Type": "text/plain"});
                res.write(error);
                res.end();
            } else {
                document.conversations.push(value);
                document.save((error) => {
                    if(error) {
                        res.writeHead(409, {"Content-Type": "text/plain"});
                        res.write(error);
                        res.end();
                    } else {
                        res.writeHead(200, {"Content-Type": "application/json"});
                        res.write(JSON.stringify({ message: "Successfully added conversation."}));
                        res.end();
                    }
                })
            }
        });
    },

    // Adds a friend request to the user's friend list.
    addFriend: (value, id, res) => {
        User.findById(id, (error, document) => {
            if(error) {
                res.writeHead(409, {"Content-Type": "text/plain"});
                res.write(error);
                res.end();
            } else {
                document.friendList.push(value);
                document.save((error) => {
                    if(error) {
                        res.writeHead(409, {"Content-Type": "text/plain"});
                        res.write(error);
                        res.end();
                    } else {
                        res.writeHead(200, {"Content-Type": "application/json"});
                        res.write(JSON.stringify({ message: "Successfully added friend."}));
                        res.end();
                    }
                })
            }
        });
    },

    // Adds a friend request to the user's list of friend requests.
    addIncomingFriendRequest: (value, id, res) => {
        User.findById(id, (error, document) => {
            if(error) {
                res.writeHead(409, {"Content-Type": "text/plain"});
                res.write(error);
                res.end();
            } else {
                document.incomingFriendRequests.push(value);
                document.save((error) => {
                    if(error) {
                        res.writeHead(409, {"Content-Type": "text/plain"});
                        res.write(error);
                        res.end();
                    } else {
                        res.writeHead(200, {"Content-Type": "application/json"});
                        res.write(JSON.stringify({ message: "Successfully added incoming friend request."}));
                        res.end();
                    }
                })
            }
        });
    },

    addOutgoingFriendRequest: (value, id, res) => {
        User.findById(id, (error, document) => {
            if(error) {
                res.writeHead(409, {"Content-Type": "text/plain"});
                res.write(error);
                res.end();
            } else {
                document.outgoingFriendRequests.push(value);
                document.save((error) => {
                    if(error) {
                        res.writeHead(409, {"Content-Type": "text/plain"});
                        res.write(error);
                        res.end();
                    } else {
                        res.writeHead(200, {"Content-Type": "application/json"});
                        res.write(JSON.stringify({ message: "Successfully added outgoing friend request."}));
                        res.end();
                    }
                });
            }
        });
    },

    // Creates a user document.
    // Body format = { id: String, friendList: [], friendRequests: [], conversations: [] }
    createUser: (req, res) => {
        HelperFunctions.parseBody(req, (body) => {
            const user = new User(body);
            user.save((error) => {
                if(error) {
                    res.writeHead(409, { "Content-Type": "text/plain" });
                    res.write(error);
                    res.end();
                } else {
                    res.writeHead(201, {"Content-Type": "application/json"});
                    res.write(JSON.stringify({ message: "Successfully created user."}));
                    res.end();
                }
            })
        })
    },

    // Gets a user document with a specific id.
    getUser: (id, res) => {
        console.log("userController.getUser");
        User.findById(id, (error, document) => {
            if(error) {
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.write(error);
                res.end();
            } else {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.write(JSON.stringify(document));
                res.end();
            }
        })
    },

    // Removes a friend request from the user's list of friend requests.
    removeIncomingFriendRequest: (value, id, res) => {
        User.findOneAndUpdate(
            { _id: id },
            { $pull: { incomingFriendRequests: value }},
            { safe: true, multi: false },
            (error, document) => {
                if(error) {
                    res.writeHead(404, { "Content-Type": "text/plain" });
                    res.write(error);
                    res.end();
                } else {
                    res.writeHead(200, {"Content-Type": "application/json"});
                    res.write(JSON.stringify({ message: "Successfully removed incoming friend request."}));
                    res.end();
                }
            }
        );
    },

    removeOutgoingFriendRequest: (value, id, res) => {
        User.findOneAndUpdate(
            { _id: id },
            { $pull: { outgoingFriendRequests: value }},
            { safe: true, multi: false },
            (error, document) => {
                if(error) {
                    res.writeHead(404, { "Content-Type": "text/plain" });
                    res.write(error);
                    res.end();
                } else {
                    res.writeHead(200, {"Content-Type": "application/json"});
                    res.write(JSON.stringify({ message: "Successfully removed outgoing friend request."}));
                    res.end();
                }
            }
        );
    },

    // Checks if a user exists.
    userExists: (id, res) => {
        console.log("userExists");
        User.exists({_id: id}, (error, document) => {
            if(error || document === null) {
                res.writeHead(404);
                res.end();
            } 
            else {
                res.writeHead(200);
                res.end();
            }
        });
    },
};