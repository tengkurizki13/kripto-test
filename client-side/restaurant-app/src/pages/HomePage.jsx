import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '../store/actions/actionCreator';
import BodyItem from "../components/BodyItem";

// fuction for home page
function HomePage() {
   // define fuction needed for action
  const dispatch = useDispatch()
  const navigate = useNavigate();

  // states
  const[loading,setLoading] = useState(true)
  const {items} = useSelector(((state) => state.item))

  // function page reload first time and once
  useEffect(() => {
    dispatch(fetchItems())
      .then(() => {
        setLoading(false)
      })
  },[])
  

  // fucntion to handle move to child file or component detail
  function handleClick(id) {
    navigate("/items/"+ id)
  }

  // contional if data not relode yet
  if (loading) {
    return <h1>memuat...</h1>
  }

  return (
    <>
    <div className='d-flex flex-wrap mt-5'>
      {/* loop items and call component child */}
      {items.map((el,i) =>{
        return <BodyItem item={el} handleClick={handleClick} key={i} />
        })}
        
     </div>
    </>
  )
}

export default HomePage
