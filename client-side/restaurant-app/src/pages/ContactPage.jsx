
import { useRef,useState,useEffect } from 'react';
import { fetchItems } from '../store/actions/actionCreator';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { orderHandler } from '../store/actions/actionCreator';
function ContactPage() {

  const dispatch = useDispatch()
  const form = useRef();
  const navigate = useNavigate();
  const [requestList, setRequestList] = useState([{ request: "" }])
  const {items} = useSelector(((state) => state.item))
  const [data, setData] = useState({
    portion:"",
    userId : localStorage.userId,
    itemId : 0,
    specialRequest : requestList
  })

  useEffect(() => {
    dispatch(fetchItems())
  },[])

  function handleChange(e) {
    setData({
      ...data,
      [e.target.name] : e.target.value
    })
  }


  function handleSubmit(e) {
    e.preventDefault();
    dispatch(orderHandler(data,"special"))
      .then(() => {
          navigate("/")
      })
      .catch((err) => {
        console.log("ada errr",err);
        navigate(`/contact`)
      })
  }
  
  
  function handleNewRequest() {
    setRequestList([...requestList,{ request:""}])
    setData({
      ...data,
      ["specialRequest"] : requestList
    })
  }

  function handleRemoveRequest(index){
    const list = [...requestList]
    list.splice(index,1)
    setRequestList(list)
    setData({
      ...data,
      ["specialRequest"] : list
    })
  }

  const handleChangeRequest = (e,index) => {
    const {name,value } = e.target
    const list = [...requestList]
    list[index][name] = value
    setRequestList(list)
    setData({
      ...data,
      ["specialRequest"] : list
    })
  }

  return (
    <>
    <div className="row text-secondary my-5">
      <div className="col-6">
        <pre className="mt-5 ">
        <span>Explanation :</span><br></br>
         •  You can order with special requests<br></br>
         •  You can also order catered food
         
        </pre>
      </div>
      <div className="col-6">
      <h1 className='mt-5 fw-bold'>Special Order</h1>
      <form ref={form} onSubmit={handleSubmit}>
      <div className="mb-2">
        <label className="form-label fst-italic">Food Name</label>
      </div>
      <div className="input-group mb-3">
        <select className="form-select shadow p-3 bg-body rounded fst-italic text-secondary" name='itemId' id="inputGroupSelect01" onChange={(e) => handleChange(e)}>
          <option selected>Choose...</option>
          {items.map((item,index) => 
            <option value={item.id} key={index}>{item.name}</option>
          )}
        </select>
      </div>
      <div className="mb-2">
        <label className="form-label fst-italic">portion</label>
        <input type="number" name='portion' id='portion' className="form-control shadow p-3 bg-body rounded" value={form.portion} onChange={(e) => handleChange(e)}/>
      </div>
      <div className="mb-2 form-request">
        <label className="form-label fst-italic">Special Request</label>
        {requestList.map((singleRequest, index) => (
          <div key={index} className="requests d-flex row">
            <div className="first-division col-9">
              <input type="text" name="request" className="form-control shadow p-3 bg-body rounded" placeholder="optional" value={singleRequest.request}  onChange={(e) => handleChangeRequest(e,index) }  />
              {requestList.length - 1 === index && requestList.length <= 5  && 
              <button type="button" className="btn btn-outline-success mt-2 shadow" onClick={handleNewRequest}>add</button>
              }
            </div>
            <div className="second-division col-3">
            {requestList.length > 1 && 
              <button type="button" className="btn btn-outline-danger shadow" onClick={() => {handleRemoveRequest(index)}}>Remove</button>
            }
            </div>
          </div>
        ))}
      </div>
      <div className="row">
        <div className="col-12 text-end">
          <button type="submit" className="btn btn-warning shadow">Submit</button>
        </div>
      </div>
  </form>
      </div>
    </div>
 
    </>
  )
}



export default ContactPage
