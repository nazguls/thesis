# Lime Rock

<img width="988" alt="screen shot 2017-03-14 at 11 28 56 am" src="https://cloud.githubusercontent.com/assets/20366312/23970009/ac5b6dfe-0985-11e7-8f0b-79e9d2c23574.png">

Lime Rock is a gamified mobile stock trading simulator that allows users to compare their returns to friends and major benchmarks. The app fetches real stock trading data through API call to simulate real trading experience. The app has numerous features which includes buy and sell recommendations, trade history, relevant news for stocks and dashboard for user's performance and ranking.

> To view full press-release about this app [here](https://github.com/nazguls/thesis/_PRESS-RELEASE.md)
## Team

  - __Product Owner__: Isaac Yoon
  - __Scrum Master__: Michael Comes
  - __Development Team Members__: Adam Watt

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage
> - Sign up for an account.
> - Login with your user name and password.
> - Once logged-in dashboard page will greet you with your performance page. Press x to interact with the rest of the app.
> - Top left hand corner will take the user to interact with menu items while top right hand corner button will search for a specific stock.
> - If you searched for a stock, you can see view stock performances graph, stats and all of the relevant news.
> - Click buy or sell to add to your portfolio.

## Requirements

- Node
- Express 4.14.0
- Nodemon 1.11.0
- React-Native
- React-Redux
- D3
- Firebase
- Sequelize
_ MySQL

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```

### Local db setup

install local mySql if needed

```sh
brew install mysql
mysql.server start
mysql -u root -p (hit enter again for no pass)
create database myapp;
```

### Start server dev
```sh
npm start
```

### Start front-end dev (new terminal tab)
```sh
react-native run-ios
```


### Roadmap

View the project roadmap [here](https://github.com/brandybucks/brandybucks/issues)


## Contributing

See [CONTRIBUTING.md](https://github.com/brandybucks/brandybucks/blob/master/_CONTRIBUTING.md) for contribution guidelines.
