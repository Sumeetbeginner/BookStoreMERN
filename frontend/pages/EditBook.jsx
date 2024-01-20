
import React, { useState, useEffect } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const EditBook = () => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [publishYear, setPublishYear] = useState('')
  const [loading, setLoading] = useState(false)
  const { id } = useParams()

  useEffect(() => {

    setLoading(true)

    axios.get(`http://localhost:5555/books/${id}`)
      .then((response) => {
       
        setTitle(response.data.title)
        setAuthor(response.data.author)
        setPublishYear(response.data.publishYear)
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
        console.log(error);
      })
  }, [])

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    }

    setLoading(true)

    axios.put(`http://localhost:5555/books/${id}`, data)
      .then(() => {

        setLoading(false)
        navigate('/')
      })
      .catch((error) => {
        setLoading(false)
        console.log(error);
      })
  }

  const navigate = useNavigate()

  return (
    <div className='p-4'>

      <BackButton />

      <h1 className='text-3xl my-4'>Edit Book</h1>


      {
        loading ?
          <Spinner />
          : ''}


      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>

          <input value={title} onChange={(e) => setTitle(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' type="text" />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>

          <input value={author} onChange={(e) => setAuthor(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' type="text" />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>

          <input value={publishYear} onChange={(e) => setPublishYear(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' type="text" />
        </div>

        <button onClick={handleEditBook} className='p-2 bg-sky-300 m-8'>Save</button>
      </div>
    </div>
  )
}

export default EditBook
