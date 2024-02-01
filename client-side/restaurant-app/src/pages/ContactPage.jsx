
import { useRef,useState } from 'react';
import emailjs from '@emailjs/browser';
function ContactPage() {

  const form = useRef();
  const [requestList, setRequestList] = useState([{ request: "" }])

  
  const handleNewRequest = () => {
    setRequestList([...requestList,{ request:""}])
  }

  const handleRemoveRequest = (index) => {
    const list = [...requestList]
    list.splice(index,1)
    setRequestList(list)
  }

  const handleChangeRequest = (e,index) => {
    const {name,value } = e.target
    const list = [...requestList]
    list[index][name] = value
    setRequestList(list)
  }




  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_6c5pkoo', 'template_cq2x1xx', form.current, 'zFpm9v01FSEMLFuOE')
      .then((result) => {
          console.log(result.text);
          console.log("terkirim kawan!!!!");
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <>
    <div className="row text-secondary my-5">
      <div className="col-6">
        <pre className="mt-5 ">
        <span>Explanation :</span><br></br>
         •  You can order food in large portions<br></br>
         •  You can order with special requests<br></br>
         •  You can also order catered food
         
        </pre>
      </div>
      <div className="col-6">
      <h1 className='my-5 fw-bold'>Contact Form</h1>
      <form ref={form} onSubmit={sendEmail}>
      <div className="mb-2">
        <label className="form-label fst-italic">Name</label>
        <input type="text" name='name' className="form-control shadow p-3 bg-body rounded"/>
      </div>
       <div className="mb-2">
        <label className="form-label fst-italic">Email address</label>
        <input type="email" name='email' className="form-control shadow p-3 bg-body rounded" id="exampleInputEmail1" aria-describedby="emailHelp"/>
      </div>
      <div className="mb-2">
        <label className="form-label fst-italic">Food Name</label>
        <input type="text" name='food' className="form-control shadow p-3 bg-body rounded"/>
      </div>
      <div className="mb-2">
        <label className="form-label fst-italic">Portion</label>
        <input type="number" name='portion' className="form-control shadow p-3 bg-body rounded"/>
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
