package com.example.TicTacToe;

import java.util.*;
import java.awt.*;
import java.awt.event.*;
import javax.swing.*;

public class ticTacToeGame implements ActionListener
{
    // Random object for generating random numbers
    Random random = new Random();
    // JFrame for the game window
    JFrame frame = new JFrame();
    // JPanel for the title
    JPanel title_panel = new JPanel();
    // JPanel for the tic tak toe grid
    JPanel button_panel = new JPanel();
    // JLabel for displaying game status
    JLabel text_field = new JLabel();
    // Array for storing buttons for the grid
    JButton[] buttons = new JButton[9];
    // Boolean to track the players turn
    boolean player1_turn;
    // Boolean to trach if the user is in a chat room
    boolean iChatRoom = false;
    // Variable to count the number of players in game
    int playerCount = 0;
    ticTacToeGame()
    {
        // This will set up the JFrame
        frame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        frame.setSize(800,800);
        frame.getContentPane().setBackground(new Color(50,50,50));
        frame.setLayout(new BorderLayout());
        frame.setVisible(true);

        // This will set up the title JLabel
        text_field.setBackground(new Color(25,25,25));
        text_field.setForeground(new Color(25,255,0));
        text_field.setFont(new Font("Ink Free",Font.BOLD,75));
        text_field.setHorizontalAlignment(JLabel.CENTER);
        text_field.setText("Tic-Tac-Toe");
        text_field.setOpaque(true);

        // This will set up the title JPanel
        title_panel.setLayout(new BorderLayout());
        title_panel.setBounds(0,0,800,100);

        // This will set up the button JPanel (tic-tac-toe grid)
        button_panel.setLayout(new GridLayout(3,3));
        button_panel.setBackground(new Color(125,125,125));

        // Will initialize and add buttons to the grid
        for (int i = 0; i < 9; i++)
        {
            buttons[i] = new JButton();
            button_panel.add(buttons[i]);
            buttons[i].setFont(new Font("MV Boli", Font.BOLD,120));
            buttons[i].setFocusable(false);
            buttons[i].addActionListener(this);
        }

        // Will add title JPanel and button JPanel to the JFrame
        title_panel.add(text_field);
        frame.add(title_panel,BorderLayout.NORTH);
        frame.add(button_panel);

        // Will start the game
        firstTurn();
    }

    // Thi function use ActionListener implementation for handling the button clicks
    @Override
    public void actionPerformed(ActionEvent e)
    {
        // will check if maximum number of players is reached
        if (playerCount >= 2)
        {
            System.out.println("Cannot join the game. Maximum number of players reached (2)");
            return;
        }

        /* THIS GIVES AN ERROR because the inChatRoom func needs to be implemented
        // will check if the user is in a chat room before they can play the game
        if (!inChatRoom)
        {
            System.out.println("Join a chat room to play the game!");
            return;
        }*/

        // will increment player count when a player joins
        playerCount++;

        // Will check what button is being clicked
        for (int i = 0; i < 9; i++)
        {
            if (e.getSource() ==buttons[i])
            {
                // will check whose turn it is and update the button accordingly
                if (player1_turn)
                {
                    if (buttons[i].getText() == "")
                    {
                        buttons[i].setForeground(new Color(255, 0, 0));
                        buttons[i].setText("X");
                        player1_turn = false;
                        text_field.setText("0 Turn");
                        check();
                    }
                }
                else
                {
                    if (buttons[i].getText() == "")
                    {
                        buttons[i].setForeground(new Color(0,0,255));
                        buttons[i].setText("O");
                        player1_turn = true;
                        text_field.setText("X Turn");
                        check();
                    }
                }
            }

        }
    }

    // This function will randomly determine the first turn
    public void firstTurn()
    {
        try
        {
            Thread.sleep(2000);
        }
        catch (InterruptedException e)
        {
            throw new RuntimeException(e);
        }

        // will randomly decide who startss
        if (random.nextInt(2) == 0)
        {
            player1_turn = true;
            text_field.setText("X Turn");
        }
        else
        {
            player1_turn = false;
            text_field.setText("0 Turn");
        }
    }

    // This function will check for the winner by checking all the possible winning combinations for X and O
    public void check()
    {
        // If X wins check all these combinations
        if ((buttons[0].getText() == "X") && (buttons[1].getText() == "X") && (buttons[2].getText() == "X"))
        {
            xWins(0,1,2);
        }

        if ((buttons[3].getText() == "X") && (buttons[4].getText() == "X") && (buttons[5].getText() == "X"))
        {
            xWins(3,4,5);
        }

        if ((buttons[6].getText() == "X") && (buttons[7].getText() == "X") && (buttons[8].getText() == "X"))
        {
            xWins(6,7,8);
        }

        if ((buttons[0].getText() == "X") && (buttons[4].getText() == "X") && (buttons[8].getText() == "X"))
        {
            xWins(0,4,8);
        }

        if ((buttons[2].getText() == "X") && (buttons[4].getText() == "X") && (buttons[6].getText() == "X"))
        {
            xWins(2,4,6);
        }

        if ((buttons[1].getText() == "X") && (buttons[4].getText() == "X") && (buttons[7].getText() == "X"))
        {
            xWins(1,4,7);
        }

        if ((buttons[0].getText() == "X") && (buttons[3].getText() == "X") && (buttons[6].getText() == "X"))
        {
            xWins(0,3,6);
        }

        if ((buttons[2].getText() == "X") && (buttons[5].getText() == "X") && (buttons[8].getText() == "X"))
        {
            oWins(2,5,8);
        }

        // If O wins check all these combinations
        if ((buttons[0].getText() == "O") && (buttons[1].getText() == "O") && (buttons[2].getText() == "O"))
        {
            oWins(0,1,2);
        }

        if ((buttons[3].getText() == "O") && (buttons[4].getText() == "O") && (buttons[5].getText() == "O"))
        {
            oWins(3,4,5);
        }

        if ((buttons[6].getText() == "O") && (buttons[7].getText() == "O") && (buttons[8].getText() == "O"))
        {
            oWins(6,7,8);
        }

        if ((buttons[0].getText() == "O") && (buttons[4].getText() == "O") && (buttons[8].getText() == "O"))
        {
            oWins(0,4,8);
        }

        if ((buttons[2].getText() == "O") && (buttons[4].getText() == "O") && (buttons[6].getText() == "O"))
        {
            oWins(2,4,6);
        }

        if ((buttons[1].getText() == "O") && (buttons[4].getText() == "O") && (buttons[7].getText() == "O"))
        {
            oWins(1,4,7);
        }

        if ((buttons[0].getText() == "O") && (buttons[3].getText() == "O") && (buttons[6].getText() == "O"))
        {
            oWins(0,3,6);
        }

        if ((buttons[2].getText() == "O") && (buttons[5].getText() == "O") && (buttons[8].getText() == "O"))
        {
            oWins(2,5,8);
        }
    }

    // This function will handle when X wins
    public void xWins(int a , int b , int c)
    {
        // Will highlight the winning buttons
        buttons[a].setBackground(Color.GREEN);
        buttons[b].setBackground(Color.GREEN);
        buttons[c].setBackground(Color.GREEN);

        // will disable all buttons
        for (int i=0;i<9;i++)
        {
            buttons[i].setEnabled(false);
        }
        // will update the game status
        text_field.setText("X wins");

    }

    // This function will handle when O wins
    public void oWins(int a , int b , int c)
    {
        // will highlight the winning buttons
        buttons[a].setBackground(Color.GREEN);
        buttons[b].setBackground(Color.GREEN);
        buttons[c].setBackground(Color.GREEN);

        // will disbale all buttons
        for (int i=0;i<9;i++)
        {
            buttons[i].setEnabled(false);
        }
        // will update the game status
        text_field.setText("O wins");
    }
}
