import React from "react";
import firebase from "../../firebase";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon
} from "semantic-ui-react";
import { Link } from "react-router-dom";

class Login extends React.Component {                            //class with login components
  state = {
    email: "",
    password: "",
    errors: [],
    loading: false
  };

  displayErrors = errors =>                                        //errors function
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });    //set in the global state using redux tool
  };

  handleSubmit = event => {                                                //submit and email and password to firebase
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.setState({ errors: [], loading: true });
      firebase
        .auth()                                                              //authenticate with firebase
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(signedInUser => {
          console.log(signedInUser);
        })
        .catch(err => {                                                      //catch the errors and display them
          console.error(err);
          this.setState({
            errors: this.state.errors.concat(err),
            loading: false
          });
        });
    }
  };

  isFormValid = ({ email, password }) => email && password;                        //valid email and password or not

  handleInputError = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName))    //handle input error if any
      ? "error"
      : "";
  };

  render() {
    const { email, password, errors, loading } = this.state;

    return (                                                                 //main body which is displayed on the login page
      <React.Fragment>                                                       
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" icon color="red" textAlign="center">                 
            <Icon name="rocket" color="violet" />                            
            Login to iiitChat
          </Header>
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>
              <Form.Input                                                   //login form for email
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email Address"
                onChange={this.handleChange}
                value={email}
                className={this.handleInputError(errors, "email")}
                type="email"
              />

              <Form.Input                                                      //login form for password 
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                onChange={this.handleChange}
                value={password}
                className={this.handleInputError(errors, "password")}
                type="password"
              />

              <Button                                                           //loading button
                disabled={loading}
                className={loading ? "loading" : ""}
                color="green"
                fluid
                size="large"
              >
                Submit
              </Button>
            </Segment>
          </Form>
          {errors.length > 0 && (                                          //show error message if not validated properly
            <Message error>
              <h3>Error</h3>
              {this.displayErrors(errors)}
            </Message>
          )}
          <Message>
            Don't have an account? <Link to="/register">Register</Link>          
          </Message>
         </Grid.Column>
       </Grid>

       <Grid textAlign="center" verticalAlign="top" className="app_LR">           
        <Grid.Column style={{ maxWidth: 327.4 }}>
          <Message as="h1" icon color="black">
            iiitChat - A IIIT Bhubaneswar Exclusive
          </Message>
          </Grid.Column>
          </Grid>
          </React.Fragment>
    );
  }
}

export default Login;                                                          //export the class 
