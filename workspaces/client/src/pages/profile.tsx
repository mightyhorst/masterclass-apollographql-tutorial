import React, { Fragment } from 'react'; // preserve-line
import { gql, useQuery } from '@apollo/client'; // preserve-line

import { Loading, Header, LaunchTile } from '../components'; // preserve-line
import { LAUNCH_TILE_DATA } from './launches'; // preserve-line
import { RouteComponentProps } from '@reach/router';
import * as GetMyTripsTypes from './__generated__/GetMyTrips';

export const GET_MY_TRIPS = gql`
  query GetMyTrips {
    me {
      id
      email
      trips {
        ...LaunchTile
      }
    }
  }
  ${LAUNCH_TILE_DATA}
`;

interface ProfileProps extends RouteComponentProps {}

const Profile: React.FC<ProfileProps> = () => {
  return <div />;
}

export default Profile;