import React, { Component } from 'react';
import axios from 'axios';
import { Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Firebase from 'firebase';
import { Background, CardSection, Input, Button, Spinner } from './common';
import { emailChanged, passwordChanged, usernameChanged, updateFirstName, updateLastName } from '../actions';

class Signup extends Component {
  constructor(props){
    super(props);

    this.state = {
      name: '',
      loaded: true,
      email: '',
      password: ''
    };
  }
  

  signup() {
    this.setState({
      loaded: false
    });
    
    Firebase.auth().createUserWithEmailAndPassword(
      this.props.email,
      this.props.password
    )
    .then(user => {
      Actions.login();
    })
    .catch( error => {

      if (error) {
        switch (error.code) {

        case 'EMAIL_TAKEN':
          alert('The new user account cannot be created because the email is already in use.');
          break;

        case 'INVALID_EMAIL':
          alert('The specified email is not a valid email.');
          break;

        default:
          alert('Error creating user:');
        }

      } else {
        alert('Your account was created!');
      }

      this.setState({
        name: '',
        email: '',
        password: '',
        loaded: true
      });

    });
    this.addNewUserToDB();
  }
  addNewUserToDB() {
    const context = this;
    axios({
      method: 'post',
      url: `http://127.0.0.1:3000/api/users/${context.props.username}`,
      data: {
        email: context.props.email,
        firstName: context.props.firstName,
        lastName: context.props.lastName,
        password: context.props.password 
      }
    })
    .catch(error => console.log(error));
  }

  goToLogin() {
    this.props.navigator.push({
      component: LoginForm
    });
  }
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }
  onUsernameChange(text) {
    this.props.usernameChanged(text);
  }
  onFirstNameChange(text) {
    this.props.updateFirstName(text);
  }
  onLastNameChange(text) {
    this.props.updateLastName(text);
  }
  onButtonPress() {
    this.signup();
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    return (
      <Button onPress={this.signup.bind(this)}>
        Sign me up!
      </Button>
    );
  }

  render() {
    
    return (
      <Background>
        <CardSection>
          <Input
            label="First Name"
            placeholder="first name"
            onChangeText={this.onFirstNameChange.bind(this)}
            //this value was given this.props.email
            value={this.props.firstName}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Last Name"
            placeholder="last name"
            onChangeText={this.onLastNameChange.bind(this)}
            //this value was given this.props.email
            value={this.props.lastName}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Username"
            placeholder="Username"
            onChangeText={this.onUsernameChange.bind(this)}
            //this value was given this.props.email
            value={this.props.username}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Email"
            placeholder="email@gmail.com"
            onChangeText={this.onEmailChange.bind(this)}
            //this value was given this.props.email
            value={this.props.email}
          />
        </CardSection>

        <CardSection>
          <Input
            //prop to say text in there display as props
            label="Password"
            secureTextEntry
            placeholder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </CardSection>
        <Text style={style.errorTextStyle}>
          {this.props.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection> 
       
      </Background>
    );
  }
}
const style = {
  limeShape: {
    fontSize: 200,
    color: 'transparent',
    borderWidth: 2,
    borderColor: '#42f4c2',
    borderRadius: 80,
    backgroundColor: 'transparent',
    marginBottom: 50
  },
  limeTitle: {
    fontWeight: '100',
    fontSize: 40,
    backgroundColor: 'transparent',
    color: '#42f4c2',
    marginBottom: 30
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: null,
    height: null
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};
const mapStateToProps = ({ auth, user }) => {
  const { firstName, lastName } = user;
  const { username, email, password, error, loading } = auth;
  return {
    firstName,
    lastName,
    username,
    email,
    password,
    error,
    loading
  };
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, usernameChanged, updateFirstName, updateLastName })(Signup);
