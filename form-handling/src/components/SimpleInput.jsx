import React,{useState,useEffect} from 'react';
import useInput from '../hooks/use-input';

const SimpleInput = (props) => {

  const {
    value: enteredName,
    hasError: nameInputHasError,
    isValid: enteredNameIsValid,
    reset: resetNameInput,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInput(value => value.trim() !== '');

  const {
    value: enteredEmail,
    hasError: emailHasError,
    isValid: enteredEmailIsValid,
    reset: resetEmailInput,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler
  } = useInput(value => value.includes('@'));
  
  
  const [formIsValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (enteredNameIsValid && enteredEmailIsValid) {
      setIsFormValid(true)
    } else {
      setIsFormValid(false);
    }

  }, [enteredNameIsValid]);

   

  const formSubmitHandler = (event) => {
    event.preventDefault();
    // setEnteredNameTouched(true);

        
    if (!enteredNameIsValid) {
      return;
    }

    console.log(enteredName);
    resetNameInput();
        
  }

  const nameInputClass = nameInputHasError
    ? 'form-control invalid'
    : 'form-control';
  
  const emailInputClasses = emailHasError
    ? 'form-control invalid'
    : 'form-control';
    
  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClass}>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          value={enteredName}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler} />
        {nameInputHasError && <p className='error-text'>Please enter a valid name.</p>}
        
      </div>
      
      <div className={emailInputClasses}>
        <label htmlFor='email'>Your E-Mail</label>
        <input
          type='email'
          id='email'
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
        {emailHasError && (
          <p className='error-text'>Please enter a valid email.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;