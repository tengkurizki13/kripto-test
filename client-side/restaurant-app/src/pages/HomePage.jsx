import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '../store/actions/actionCreator';
import BodyItem from "../components/BodyItem";


function HomePage() {
  const dispatch = useDispatch()
  const[loading,setLoading] = useState(true)
  const {items} = useSelector(((state) => state.item))


  useEffect(() => {
    dispatch(fetchItems())
      .then(() => {
        setLoading(false) 
      })
  },[])
  

  if (loading) {
    return <h1>memuat...</h1>
  }

  return (
    <>
    <div className='d-flex flex-wrap my-5'>
    {items.map((el,i) =>{
      return <BodyItem item={el} key={i}/>
      })}
     </div>
    </>
  )
}

export default HomePage
