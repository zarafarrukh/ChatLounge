package com.example.webchatserver;

import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;
import jakarta.websocket.*;

import org.json.JSONObject;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import static com.example.util.chatAPIHandler.loadChatRoomHistory;
import static com.example.util.chatAPIHandler.saveChatRoomHistory;

/**
 * The ChatServer function facilitates real-time communication among the users
 * within the dedicated chat rooms by managing connections,
 * handling user events such as joining and leaving,
 * and ensuring messages are delivered to the appropriate recipients
 **/
@ServerEndpoint(value="/ws/{roomID}")
public class ChatServer
{

    // Map to store user IDs and corresponding usernames
    private Map<String, String> usernames = new HashMap<String, String>();

    // Map to store room IDs and corresponding room names
    private static Map<String, String> roomList = new HashMap<String, String>();

    // Map to store room IDs and corresponding room history
    private static Map<String, String> roomHistoryList = new HashMap<String, String>();

    // Boolean variable to see if user has joined a chat room
    private static Map<String, Boolean> userInChatRoom = new HashMap<>(String, Boolean);

    /******************************************************************** JOINING CHAT ROOM *****************************************************************************

    /**
     * This function initializes the connection, loads the chat history if available,
     * and handles the welcome process for new users joining the chat room
    **/
    @OnOpen
    public void open(@PathParam("roomID") String roomID, Session session) throws IOException
    {
        roomList.put(session.getId(), roomID); // adding userID to a room
        // loading the chat history
        String history = loadChatRoomHistory(roomID);
        System.out.println("Room joined ");

        if (history != null && !(history.isBlank()))
        {
            System.out.println(history);
            history = history.replaceAll(System.lineSeparator(), "\\\n");
            System.out.println(history);
            session.getBasicRemote().sendText("{\"type\": \"chat\", \"message\":\""+history+" \\n Chat room history loaded\"}");
        }

        // find the username from the session
        String username = getUsernameFromSession(session);

        // send a welcome message to the new user joining the chat room
        session.getBasicRemote().sendText("{\"type\": \"chat\", \"message\":\"(Server " + roomID + "): Welcome to the chat room. Please state your username to begin.\"}");

        // broadcast to every user in the chat room a new user has joined
        for (Session peer : session.getOpenSessions())
        {
            if (roomList.get(peer.getId()).equals(roomID) && !peer.getId().equals(session.getId()))
            {
                peer.getBasicRemote().sendText("{\"type\": \"chat\", \"message\":\"(Server " + roomID + "): " + username + " joined the chat room.\"}");
            }
        }

        // update te chat room history
        String logHistory = roomHistoryList.getOrDefault(roomID, "");
        roomHistoryList.put(roomID, logHistory + "\\n " + username + " joined the chat room.");

        // will set the user as in chat room
        userInChatRoom.put(session.getId(), true);

        // just checking problem with this DELETE LATER
        System.out.println("User " + session.getId() + " joined the chat room. userInchatRoom set to true: " + userInChatRoom.get(session.getId()));
    }

    /**
     * Function to get the user from the session otherwise set as anonymous
    **/
    private String getUsernameFromSession(Session session)
    {
        String username = (String) session.getUserProperties().get("username");
        return username != null ? username : "Anonymous";
    }

    /*********************************************************************** LEAVING CHAT ROOM **************************************************************************

    /**
     * This function handles the cleanup process when a user leaves the chat room,
     * including updating the chat history and notifying other users about the user leaving,
     * if all the users leave the chat room, it saves the chat history before closing the connection
     **/
    @OnClose
    public void close(Session session) throws IOException
    {
        String userId = session.getId();

        if (usernames.containsKey(userId))
        {
            String username = usernames.get(userId);
            usernames.remove(userId);
            String roomID = roomList.get(userId);
            roomList.remove(roomID);

            // adding event to the history of the room
            String logHistory = roomHistoryList.get(roomID);
            roomHistoryList.put(roomID, logHistory + "\\n " + username + " left the chat room.");

            //broadcast this person left the server
            int countPeers = 0;
            for (Session peer : session.getOpenSessions())
            {
                // only broadcast messages to those in the same room
                if (roomList.get(peer.getId()).equals(roomID))
                {
                    peer.getBasicRemote().sendText("{\"type\": \"chat\", \"message\":\"(Server " + roomID + " ): " + username + " left the chat room.\"}");
                    countPeers++;
                }
            }
            // if everyone in the room left, save history
            if (!(countPeers > 0))
            {
                saveChatRoomHistory(roomID, roomHistoryList.get(roomID));
            }
        }

        // will set the user as not in chat room
        userInChatRoom.put(session.getId(). false);
    }

    /************************************************************ HANDLING DIFFERENT TYPES OF MESSAGES ******************************************************************

    /**
     * This function manages different types of messages exchanged within the chat room,
     * handles user join and leave events, updates the chat history,
     * and broadcasts messages to users in the chat room
     **/
    @OnMessage
    public void handleMessage(String comm, Session session) throws IOException
    {
        // will check if the user is in a chat room before they can play the game
        if (!userInChatRoom.getOrDefault(session.getId(), false))
        {
            System.out.println("Need to join a  chat room to play the game!");
            return;
        }

        String userID = session.getId();
        String roomID = roomList.get(userID);

        JSONObject jsonmsg = new JSONObject(comm);

        String type = jsonmsg.optString("type");
        String message = jsonmsg.optString("msg");

        // Check if the message type is "username"
        if ("username".equals(type))
        {
            String username = jsonmsg.optString("username");
            usernames.put(userID, username);

            // Broadcast this person joined the server to the rest
            for (Session peer : session.getOpenSessions())
            {
                if ((!peer.getId().equals(userID)) && (roomList.get(peer.getId()).equals(roomID)))
                {
                    peer.getBasicRemote().sendText("{\"type\": \"chat\", \"message\":\"(Server " + roomID + "): " + username + " joined the chat room.\"}");
                }
            }

            session.getBasicRemote().sendText("{\"type\": \"chat\", \"message\":\"(Server " + roomID + "): Welcome, " + username + ", to chat room " + roomID + "! Please begin chatting\"}");

            // adding event to the history of the room
            String logHistory = roomHistoryList.get(roomID);
            roomHistoryList.put(roomID, logHistory + "\\n " + username + " joined the chat room.");

        }
        //if message type is leave
        else if ("leave".equals(type))
        {
            // Handle user leaving the room
            System.out.print("Received leaving room type on server");
            System.out.println("type" + type);

            if (usernames.containsKey(userID))
            {
                String username = usernames.get(userID);
                System.out.println("identified user ID");

                // Broadcast the leaving message to everyone in the room
                for (Session peer : session.getOpenSessions())
                {
                    if (roomList.get(peer.getId()).equals(roomID))
                    {
                        System.out.println("Sending text");
                        peer.getBasicRemote().sendText("{\"type\": \"chat\", \"message\":\"(Server " + roomID + "): " + username + " has left the chat room.\"}");
                        System.out.println("Text sent");
                    }
                }

                // Remove the user from the usernames list and update room history
                usernames.remove(userID);
                String logHistory = roomHistoryList.get(roomID);
                roomHistoryList.put(roomID, logHistory + "\\n " + username + " left the chat room.");
            }}
        else
        {
            // Regular chat message
            if (usernames.containsKey(userID))
            {
                String username = usernames.get(userID);

                // adding event to the history of the room
                String logHistory = roomHistoryList.get(roomID);
                roomHistoryList.put(roomID, logHistory + "\\n " + "(" + username + "): " + message);

                for (Session peer : session.getOpenSessions())
                {
                    // Only broadcast messages to those in the same room
                    if (roomList.get(peer.getId()).equals(roomID))
                    {
                        peer.getBasicRemote().sendText("{\"type\": \"chat\", \"message\":\"(" + username + "): " + message + "\"}");
                    }
                }
            }
        }
    }
} 