import React from 'react';
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import {ADD_COMMENT } from "../../utils/mutations";


export default function Comment() {

    const [addComment, {error }] = useMutation(ADD_COMMENT);

    const handleFormSubmit = async event => {
        event.preventDefault();
      
        try {
          // add thought to database
          await addComment({
            variables: { commentBody }
          });
      
          // clear form value
          setText('');
          setCharacterCount(0);
        } catch (e) {
          console.error(e);
        }
      };

    return (
        <div> Comments Component is rendering </div>
    )
}