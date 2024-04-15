package com.example.webchatserver;

import java.io.*;
import java.util.HashSet;
import java.util.Set;

import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import org.apache.commons.lang3.RandomStringUtils;

/**
 * This is a class that has services
 * In our case, we are using this to generate unique room IDs**/
@WebServlet(name = "chatServlet", value = "/chat-servlet")
public class ChatServlet extends HttpServlet
{

    //static so this set is unique
    public static Set<String> rooms = new HashSet<>();

    /**
     * Method generates unique room codes
     * **/
    public String generatingRandomUpperAlphanumericString(int length)
    {
        String generatedString = RandomStringUtils.randomAlphanumeric(length).toUpperCase();
        // generating unique room code
        while (rooms.contains(generatedString))
        {
            generatedString = RandomStringUtils.randomAlphanumeric(length).toUpperCase();
        }
        rooms.add(generatedString);

        return generatedString;
    }

    /**
     * This function generates a random room code and sends it as the
     * response content with a content type of "text/plain" in response to an HTTP GET request
     **/
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException
    {
        response.setContentType("text/plain");

        // send the random code as the response's content
        PrintWriter out = response.getWriter();
        String roomCode = generatingRandomUpperAlphanumericString(5);
        out.println(roomCode);
    }

    public void destroy()
    {

    }
}