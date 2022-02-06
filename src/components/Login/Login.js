import React, { useState, useEffect, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';

const loginReducer = (state, action) => {
  console.log(action);
  if (action.type === 'EMAIL_CHANGE') {
    return {
      ...state,
      email: {
        value: action.value,
        isValid: action.value.includes('@'),
      }
    };
  }
  if (action.type === 'EMAIL_BLUR') {
    return {
      ...state,
      email: {
        value: state.email.value,
        isValid: state.email.value.includes('@'),
      }
    };
  }

  if (action.type === 'PASSWORD_CHANGE') {
    return {
      ...state,
      password: {
        value: action.value,
        isValid: action.value.trim().length > 6,
      }
    };
  }
  if (action.type === 'PASSWORD_BLUR') {
    return {
      ...state,
      password: {
        value: state.password.value,
        isValid: state.password.value.trim().length > 6,
      }
    };
  }
  return {
    email: { value: '', isValid: false },
    password: { value: '', isValid: false },
  };
};

const Login = (props) => {
  const ctx = useContext(AuthContext);
  
  const [formIsValid, setFormIsValid] = useState(false);

  const [loginState, dispatchLogin] = useReducer(loginReducer, {
    email: { value: '', isValid: null },
    password: { value: '', isValid: null },
  });

  useEffect(() => {
    setFormIsValid(loginState.email.isValid && loginState.password.isValid);

  }, [loginState.email.isValid, loginState.password.isValid]);

  const emailChangeHandler = (event) => {
    dispatchLogin({ type: 'EMAIL_CHANGE', value: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchLogin({ type: 'PASSWORD_CHANGE', value: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchLogin({ type: 'EMAIL_BLUR' });
  };

  const validatePasswordHandler = () => {
    dispatchLogin({ type: 'PASSWORD_BLUR' });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogin(loginState.email.value, loginState.password.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            loginState.email.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={loginState.email.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            loginState.password.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={loginState.password.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
