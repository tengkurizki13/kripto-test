
import { useRef,useState,useEffect } from 'react';
import { fetchItems } from '../store/actions/actionCreator';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { orderHandler } from '../store/actions/actionCreator';

// fucntion for contact page
function ContactPage() {

  // define fuction needed for action
  const dispatch = useDispatch()
  const form = useRef();
  const navigate = useNavigate();

  // states
  const [requestList, setRequestList] = useState([{ request: "" }])
  const {items} = useSelector(((state) => state.item))
  const [data, setData] = useState({
    portion:"",
    userId : localStorage.userId,
    itemId : 0,
    specialRequest : requestList
  })


  // function page reload first time and once
  useEffect(() => {
    dispatch(fetchItems())
  },[])


  // function fon handle change value from input form and execute every changing
  function handleChange(e) {
    // set variable usestatu data to input from
    setData({
      ...data,
      [e.target.name] : e.target.value
    })
  }

   // function fon handle submit  form and execute every button submit clicking
  function handleSubmit(e) {
    e.preventDefault();

    // dispatch and call handler or other fucntion for query to server
    dispatch(orderHandler(data,"special"))
      .then(() => {
          // move to router / if successfully
          navigate("/")
      })
      .catch(() => {

        // stay in this page
        navigate(`/contact`)
      })
  }
  
  // fucntion to hander new dynamic input request
  function handleNewRequest() {
    // set new request
    setRequestList([...requestList,{ request:""}])
    // set new data
    setData({
      ...data,
      ["specialRequest"] : requestList
    })
  }


  // fucntion to hander remove dynamic input request
  function handleRemoveRequest(index){
    // insiliaze list
    const list = [...requestList]

    // remove one data from valiabel list
    list.splice(index,1)

    // set new data to requelist list state
    setRequestList(list)

    // set new data to data form state
    setData({
      ...data,
      ["specialRequest"] : list
    })
  }


  // fucntion to hander change dynamic input request
  function handleChangeRequest(e,index){

    // ger name and value form input 
    const {name,value } = e.target
    // inisialize request list state
    const list = [...requestList]

    // change value from request list state
    list[index][name] = value

    // set new data to request list state
    setRequestList(list)

    // set new data to data list state
    setData({
      ...data,
      ["specialRequest"] : list
    })
  }

  return (
    <>
    <div className="row text-secondary my-5">
    {/* left side page for explanation */}
      <div className="col-6">
        <pre className="mt-5 ">
        <span>Explanation :</span><br></br>
         •  You can order with special requests<br></br>
         •  You can also order catered food
         
        </pre>
      </div>
      {/* left side page for contact form */}
      <div className="col-6">
        <h1 className='mt-5 fw-bold'>Special Order</h1>
        <form onSubmit={handleSubmit}>
            {/* foodanme input */}
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

            {/* portion input */}
            <div className="mb-2">
              <label className="form-label fst-italic">portion</label>
              <input type="number" name='portion' id='portion' className="form-control shadow p-3 bg-body rounded" value={form.portion} onChange={(e) => handleChange(e)}/>
            </div>

            {/* special request input */}
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

            {/* button for submit form */}
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
