import React from 'react';
import { useParams } from 'react-router-dom';
// import { useQuery } from '@apollo/client';
// import { QUERY_EVENT } from '../utils/queries';

export default function SingleEvent () {

const { id: eventId } = useParams();
console.log(eventId);

return (
    <div>Single Events Page is Rendering</div>
)
}