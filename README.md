# 21 to go
core assignment for CS 260 
edited from development machine to verify git is configured correctly

### Elevator pitch

Browser-based games have become a ubiquitous form of entertainment, but anyone who's played one knows that generally, these games are designed to get you to spend as much time as possible online - which is the opposite of their ideal niche! The advantage of a browser game is that you can play easily from anywhere, so you can fill spare minutes in a long line or waiting for a train. This target means that a game should be simple, should not rely on other users being online, and, ideally, should be mentally demanding - keeping you attentive during the breaks in your schedule, not anesthetizing you. I propose the longstanding individual strategy game twenty-one, or blackjack, played against an automated dealer and tracking scores to show your progress and compete with friends. 

### Design
The three basic pages of 21 to go will be laid out as follows:\
Login:
![login sketch](21togo_login_sketch.jpg)
Gameplay:
![gameplay sketch](21togo_play_sketch.jpg)
Balance sheet:
![balance sketch](21togo_balance_sketch.jpg)

### Key features

- Secure login over HTTPS
- Ability to choose a 'stake' for each round
- Elegant, simple presentation of the classic game of Blackjack
- one-button interface for the core strategy choice of the game, Hit or Stand.
- Balance sheet showing the balance (aggregate score) of all players
- Your balance caps the stake for each round
- Results are persistently stored
- Notification whenever someone passes you on the balance sheet
  
### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Uses correct HTML structure for application. Three HTML pages. One for login, one to play (including starting the game) and one for the balance sheet. Hyperlinks to choice artifact.
- **CSS** - Application styling that looks good on different screen sizes, uses good darkspace, color choice and contrast.
- **JavaScript** - Provides login, game setup, gameplay interaction, and backend endpoint calls.
- **Service** - Backend service with endpoints for:
  - login
  - retrieving balance information
  - playing a game (and recording the results)
  - use third-party server for conversion rate to show euro values along with dollar values on the balance sheet
- **DB/Login** - Store users and balances in database. Register and login users. Credentials securely stored in database. Can't play unless authenticated, can't wager more than current balance.
- **WebSocket** - When your balance passes another user's, that user is notified. Defend your spot!
- **React** - Application ported to use the React web framework.

## HTML Deliverable
For this deliverable I built out the structure of my application using HTML.

- **HTML pages** - Three HTML pages that represent the ability to login, play blackjack, and view player balances.
- **Links** - Each page links to each other page in the header. 
- **Text** - Text indicates how to login and hit (ask for another card from dealer). The application does not call for much text.
- **Images** - Cardback images for the deck and house's cards are implemented. Same image is used as a placeholder for the player's cards, too - will be replaced once the application supports giving them actual cards.
- **DB/Login** - Username and Password boxes with submit button for login. Scores shows different users' balances from the database.
- **WebSocket** - Users are notified in real time when another user wins or loses a game. 
- **Third Party Calls** - Balance sheet will use a third-party service to get conversion rate when showing values in Euros. 