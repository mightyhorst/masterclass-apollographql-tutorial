import React from 'react'; 
import { gql, useMutation } from '@apollo/client'; 

import { LoginForm, Loading } from '../components'; 
import * as LoginTypes from './__generated__/login';

export const LOGIN_USER = gql`
  mutation login($email: String!) {
    login(email: $email) {
      id
      token
    }
  }
`;

export default function Login() {
  return <div />;
}
