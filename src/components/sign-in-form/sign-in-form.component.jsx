import { useState } from "react";

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';

import { SignUpContainer, Title, Details, Form, ButtonsContainer } from '../sign-up-form/sign-up-form.styles'; 

const defaultFormField = {
    email: '',
    password: '',
}

const SignInFrom = () => {
    const [formFields, setFormField] = useState(defaultFormField);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormField(defaultFormField);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();

        } catch (error) {
            switch(error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                default:
                    console.log(error);
            }
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormField({...formFields, [name]: value});
    };

    return (
        <SignUpContainer>
            <Title>Already have an account?</Title>
            <Details>Sign in with your email and password</Details>

            <Form onSubmit={handleSubmit}>
                <FormInput label='Email' type='email' required onChange={handleChange} name='email' value={email} />
                <FormInput label='Password' type='password' required onChange={handleChange} name='password' value={password} />
                <ButtonsContainer>
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' onClick={signInWithGoogle} buttonType={BUTTON_TYPE_CLASSES.google}>Google sign in</Button>
                </ButtonsContainer>
            </Form>
        </SignUpContainer>
    );
}

export default SignInFrom;