import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemById } from '../store/actions/actionCreator';

function DetailPage() {
  let { id } = useParams();
  const dispatch = useDispatch()
  const {item} = useSelector(((state) => state.item))
  const[loading,setLoading] = useState(true)

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
      <form >
      <div className="mb-2">
        <label className="form-label fst-italic">Name</label>
        <input type="text" name='name' className="form-control shadow p-3 bg-body rounded"/>
      </div>
      <div className="mb-2">
        <label className="form-label fst-italic">Portion</label>
        <input type="number" name='food' className="form-control shadow p-3 bg-body rounded"/>
      </div>
       <div className="mb-2">
        <label className="form-label fst-italic">Phone Number</label>
        <input type="number" name='email' className="form-control shadow p-3 bg-body rounded" id="exampleInputEmail1" aria-describedby="emailHelp"/>
      </div>
      <div className="mb-2">
        <label className="form-label fst-italic">Address</label>
        <textarea className="form-control  shadow p-3 bg-body rounded"></textarea>
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
