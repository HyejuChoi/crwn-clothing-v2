import { useState, useContext } from "react";

import FormInput from '../form-input/form-input.component';
import Button from "../button/button.component";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

import { SignUpContainer, Title, Details, Form } from './sign-up-form.styles'; 

const defaultFormField = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormField] = useState(defaultFormField);
    const { displayName, email, password, confirmPassword} = formFields;

    const resetFormFields = () => {
        setFormField(defaultFormField);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password != confirmPassword) {
            alert("passwords do not match");
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();

        } catch (error) {
            if (error.code == 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use');
            }
            console.log('user created encountered an error', error);
        }
    }
    
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormField({...formFields, [name]: value});
    };

    return (
        <SignUpContainer>
            <Title>Don't have an account?</Title>
            <Details>Sign up with your email and password</Details>
            <Form onSubmit={handleSubmit}>
                <FormInput label='Display Name' type='text' required onChange={handleChange} name='displayName' value={displayName} />

                <FormInput label='Email' type='email' required onChange={handleChange} name='email' value={email} />

                <FormInput label='Password' type='password' required onChange={handleChange} name='password' value={password} />

                <FormInput label='Confirm Password' type='password' required onChange={handleChange} name='confirmPassword' value={confirmPassword} />

                <Button type='submit'>Sign Up</Button>
            </Form>
        </SignUpContainer>
    )
}

export default SignUpForm;