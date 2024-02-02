import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { fetchItemById } from '../store/actions/actionCreator';
import { orderHandler } from '../store/actions/actionCreator';

function DetailPage() {
  let { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {item} = useSelector(((state) => state.item))
  const[loading,setLoading] = useState(true)
  const [form, setForm] = useState({
    portion:"",
    userId : localStorage.userId,
    itemId : id,
    specialRequest : [{ request: "" }]
  })

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name] : e.target.value
    })
  }


  function handleSubmit(e) {
    e.preventDefault();

    console.log(form,"form");
    dispatch(orderHandler(form))
      .then(() => {
          navigate("/")
      })
      .catch(() => {
        navigate(`/items/${id}`)
      })
  }

  useEffect(() => {
    if(id) {
        dispatch(fetchItemById(id))
        .then(() => {
          setLoading(false)
        })
      }
    },[])
 
    if (loading) {
      return <h1>memuat...</h1>
    }

  return (
    <>
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
      <div className="mb-2">
        <label className="form-label fst-italic">portion</label>
        <input type="number" name='portion' id='portion' className="form-control shadow p-3 bg-body rounded" value={form.portion} onChange={(e) => handleChange(e)}/>
      </div>
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
