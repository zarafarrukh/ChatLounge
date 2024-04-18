# <img src="src/main/webapp/img/logo.png" alt="ChatLounge Logo" width="150"> CHATLOUNGE - Final Project


## Project Information

ChatLounge, presents the design and implementation of a robust chat server capable of hosting multiple chat rooms with a multitude of users. Leveraging the Java WebSocket API, this server enables seamless real-time communication among users within distinct chat rooms. With a focus on efficiency, the server adeptly manages WebSocket connections between clients, ensuring smooth and uninterrupted interactions. A key component of this project requires the development of robust room management features. Users are empowered with the flexibility to either join pre-existing chat rooms or create new ones as per their requirements. Users can choose between two games to play, Tic Tac Toe or scrambled Word game.

Each chat room is distinguished by a unique alphanumeric code, guaranteeing separate environments for discussions. The server will oversee user authentication and authorization processes within these rooms. 

Upon entering a chat room, users will be prompted to supply a username for identification purposes. Subsequently, the server will extend a warm welcome to new participants and broadcast notifications to existing occupants of the room. Moreover, messages exchanged within chat rooms will be equipped with usernames and timestamps, offering chronological context to conversations.

Tic Tac Toe Game:
In this interactive game, users are presented with a dynamic Tic Tac Toe experience. They have the option to select from a variety of emojis to represent players, including four developer-specific emojis. Throughout the game, players can engage further by sending reaction emojis, which animate within the web browser upon selection. Upon conclusion of each round, users can opt to play again. Notably, upon achieving victory in the game, a celebratory confetti animation ensues until the user initiates another game or navigates back to the chat server.

Scrambled Word Game:
This intellectually stimulating game challenges users with deciphering scrambled words. Participants are presented with a scrambled word and prompted to input their guess into a designated box, followed by clicking the "submit your guess" button. If the entered word aligns with the solution, the user emerges victorious. However, in the event of an incorrect guess, users persist until the correct word is deduced. Players also retain the option to engage in subsequent rounds for continuous enjoyment.

### This endeavor is the result of a collaborative effort harnessing the collective expertise of Zara Farrukh, Rabia Chattha, Syeda Bisha Fatima, and Manal Afzal.

ADD DEMO VIDEO AND SCREENSHOT HERE:

## Improvements:
Key Features: 
- Seamless chat refreshing functionality to ensure the latest conversations are readily available.
- Robust chatroom history preservation, allowing users to access past discussions effortlessly.
- Advanced error handling mechanisms designed to promptly alert users and guide them through the web application for enhanced user experience.
- Convenient "Scroll to Top" feature for effortless navigation within the chat interface.
- Broadcast User Entrance/Exits to rest of the users in the chatroom.
- The games feature seamlessly integrated animations, elevating the visual aesthetics and greater user engagement
- The implementation of "Play Again" functionalities empowers users to extend their gaming experiences, fostering prolonged enjoyment and maximizing user retention.
- Users can select emojis from a comprehensive emoji selection interface, enriching their gaming experience with an interactive and enjoyable element, thus enhancing overall engagement.

  
## How to Run

### Step-by-Step Instructions:
1. Clone the repository: `git clone https://github.com/OntarioTech-CS-program/w24-csci2020u-final-project-chattha-farrukh-fatima-afzal.git`
2. Launch intelliJ IDEA ULTIMATE and navigate to project directory
3. Configure Glassfish and edit Run Configurations
    - Set default URL as `URL HERE`
4. Start GlassFish server and deploy application on selecting ▶

## Other Resources
[1] CSCI2020U - Assignment 2: ChatLounge
  - `[https://github.com/OntarioTech-CS-program/ChatServer](https://github.com/OntarioTech-CS-program/w24-csci2020u-assignment02-afzal-chattha-farrukh-fatima)`
