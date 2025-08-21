import React from 'react'
import ToDoList from '../components/ToDoList'

const Home = () => {
  return (
    <div>
      <h1 className='text-center text-success'>To Do Application</h1>
        <ToDoList/>
    </div>
  )
}

export default Home