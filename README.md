# EPLOddsTest

A simple app which displays the English Premier League winner odds for each team.
The app is built using Angular and simply displays a table which is sortable by column.
Upon running, a node script is executed prior to obtain the latest odds from Just Bookies:
https://www.justbookies.com/premier-league-odds/

The above service excludes Bet Fair, which is driven off a static JSON file.

Once running, the user can sort the table by Team or respective bookmakers.
The user can hover over the Team name to display a tooltip type view which displays further odds from other bookmakers. 

## Requirements

You will need Node in order to execute NPM commands:

- Node: https://nodejs.org/en/

## Setup

Once NPM is on your system, simply  execute the following within the project root:

```
npm install
```

Once installed you can get the app running by executing the following (within the same directory as above):

```
npm start
```

And then open your favourite browser and navigate to the following URL:

```
http://localhost:3000/
```

## Sources

The data is taken from Bet Fair on 12th September 2016:

https://www.betfair.com/exchange/plus/#/football/market/1.124352712