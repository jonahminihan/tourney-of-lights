Hi, this is the repo for the Tournament of Lights. The Tournament of lights is a [Next.js](https://nextjs.org/) app that lets users sign in on their phones, select a user name and two games they want to play and then compete in the tournament.

To start, first go to [server repo](https://github.com/jonahminihan/tourney-of-lights-server) and clone that. Run `npm i`, then `node index.js` to start it up!

With the server started you can run `npm run dev` to start the tournemant server. The app will start on 3000! Currently, the IP address is hardcoded, so you'll need to go edit it in the app (its in constants/constants.js and make sure to change both) to have the app display and use the correct IP. Once you do that the intro sequence should play (hit replay if you missed it), and you should see this image:

![alt text](/repo-images/Intro.png?raw=true)

On your phone (or the computer you're already on, but in a different tab) you can go to http://your-ip:3000/play to log in! The screen should look like the image below, and if you get all of your friends to visit the site and login to then you'll be ready to play!

![alt text](/repo-images/play-screen.png?raw=true)

After everyone is finished signing in, you should see all of the players are connected like this:

![alt text](/repo-images/signed-in.png?raw=true)

The game supports 2-16 players, although more should technically work, but I have not tested that and navigating the bracket may become unruly. You can select "Begin Game!" to get started. Now that you've started you should see the populated bracket with games selected for the contestants to play. An example bracket looks like this:

![alt text](/repo-images/bracket.png?raw=true)

The players are randomly placed, and the first round of games are a coin flip between the two players' first game selection. You can select a player's name to pick them as the winner of the competition. You'll notice there is a losers bracket where players who lose get a chance to still play. Games after the first round are picked by selecting a random game from ALL players' second game choice. When somebody wins the whole tournament they are greeted with this winning message:

![alt text](/repo-images/winner.png?raw=true)

This tournament app was just a small project because I wanted to get some experience with websockets and have a get together so this project seemed like a good idea. If you do happen to try it out, please feel free to leave any feedback and open a ticket if you're having issues with it. Thanks for checking the app out!
