import React, { useState, useEffect } from 'react'
import { BASE_URL, API_KEY } from '../constants'
import axios from 'axios'

export default function Details(props) {
  const { friendId, close } = props
  const [details, setDetails] = useState(null)

  // 👉 TASK 4 - Create a side effect 🥇 that runs only after first render.
  // console.log('Casey is the best!');
  useEffect(() => {
    console.log('Casey is the best!');
  }, [])

  // 👉 TASK 5 - Create a side effect 👻 that runs only after first render
  // and puts a 'click' event handler on document.
  // See what happens if we don't clean up.
  useEffect(() => {
    console.log("Adding a silly listener!");
    const sillyListener = () => {
      console.log(`Here is a random number: ${Math.random()}`)
    }
    document.addEventListener('click', sillyListener);

    return () => {
      console.log("Cleaning up our mess...");
      document.removeEventListener('click', sillyListener);
    }
  }, [])

  // 👉 TASK 6 - Create a side effect 🥵 that runs after every render.
  useEffect(() => {
    console.log("STOP RUNNING ME!!!!!");
    return () => {
      console.log("NOOOOOOOOOOO");
    }
  })

  // 👉 TASK 7 - Create a side effect 📲 that runs when a particular variable changes:
  // Whenever props.friendId updates we should trigger a fetch for details of the friend.
  // The URL should end up looking like `http://localhost:4000/friends/1?api_key=xyz`
  // On success, shove the details of the friend in `details` slice of state
  useEffect(() => {
    axios.get(`${BASE_URL}/friends/${friendId}?api_key=${API_KEY}`)
      .then(res => {
        setDetails(res.data);
      })
      .catch(err => console.error(err))
  }, [friendId])

  return (
    <div className='container'>
      <h2>Details (of friend with id {friendId}):</h2>
      {
        details &&
        <>
          <p>{details.name} is {details.age}</p>
          <p>email is {details.email}</p>
          {name} likes:
          <ul>
            {details.hobbies.map((hobby) => <li key={hobby}>{hobby}</li>)}
          </ul>
        </>
      }
      <button onClick={close}>Close</button>
    </div>
  )
}
