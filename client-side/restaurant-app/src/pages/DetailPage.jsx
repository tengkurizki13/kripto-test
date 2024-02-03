import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { fetchItemById } from '../store/actions/actionCreator';
import { orderHandler } from '../store/actions/actionCreator';


// fuction for detail page
function DetailPage() {

  // define fuction needed for action
  const navigate = useNavigate();
  const dispatch = useDispatch()

  // get id from http parameter
  let { id } = useParams();

  // states
  const {item} = useSelector(((state) => state.item))
  const[loading,setLoading] = useState(true)
  const [data, setData] = useState({
    portion:"",
    userId : localStorage.userId,
    itemId : id,
    specialRequest : [{ request: "" }]
  })

  // fucntion for handle change data form
  function handleChange(e) {
    setData({
      ...data,
      [e.target.name] : e.target.value
    })
  }

  // fucntion for handle submit inpu form
  function handleSubmit(e) {
    e.preventDefault();

    // dispatch and call handler or other fucntion for query to server
    dispatch(orderHandler(data))
      .then(() => {
        // move to router / if successfully
          navigate("/")
      })
      .catch(() => {
        // stay in this page
        navigate(`/items/${id}`)
      })
  }

  // function page reload first time and once
  useEffect(() => {
    // contional to cek id form params
    if(id) {
        dispatch(fetchItemById(id))
        .then(() => {
          setLoading(false)
        })
      }
    },[])
 

    // contional if data not relode yet
    if (loading) {
      return <h1>memuat...</h1>
    }

  return (
    <>
    {/* side left for image */}
    <div className="row text-secondary my-5">
      <div className="col-6">
              <div className="imgCss">
                  <h3 className='fw-bold text-capitalize'>{item.name}</h3>
                  <h2 className='fst-italic'>Rp. {item.price}</h2>
                  <img src={item.imgUrl} alt="" className='' />
            </div>
        </div>
        <div className="col-6">
          <h1 className='fw-bold'>Order</h1>
          <form onSubmit={handleSubmit}>
            {/* input portion */}
            <div className="mb-2">
              <label className="form-label fst-italic">portion</label>
              <input type="number" name='portion' id='portion' className="form-control shadow p-3 bg-body rounded" value={data.portion} onChange={(e) => handleChange(e)}/>
            </div>
            {/* button submit */}
            <div className="row mt-3">
              <div className="col-12 text-end">
                <button type="submit" className="btn btn-success shadow">CheckOut</button>
              </div>
            </div>
          </form>
        </div>
    </div>
 
    </>
  )
}

export default DetailPage
