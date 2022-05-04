import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_EVENT } from '../../utils/queries';

export default function SingleEvent () {

const { id: eventId } = useParams();

const { loading, data } = useQuery(QUERY_EVENT, {
    variables: {id: eventId} 
})

const event = data?.event || {};

console.log(event)

if (loading) {
    return <div>Loading...</div>
}

return (
    <div>Single Events Page is Rendering</div>
)
}