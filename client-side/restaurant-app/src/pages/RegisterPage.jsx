import { useState } from 'react'
import { registerHandler } from '../store/actions/actionCreator';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function FormAddItem() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    username:"",
    email:"",
    password:"",
    phoneNumber:0,
    address:"",
  })

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name] : e.target.value
    })
  }

  function changePage() {
    navigate("/login")
  }


  function handleSubmit(e) {
    e.preventDefault();
    dispatch(registerHandler(form))
        .then(() => {
          navigate("/login")
      
        })
  }

  return (
    <>
    <div className="container">
      <div className="row mt-5">
        <div className="col-4"></div>
        <div className="col-4">
        <h1 className='text-center fw-bold fst-italic'>Register</h1>
        <form onSubmit={handleSubmit}>
        <div className="mb-2">
        <label className="form-label fst-italic">your username</label>
        <input type="text" name='username' id='username' className="form-control shadow p-3 bg-body rounded" value={form.username} onChange={(e) => handleChange(e)}/>
      </div>
       <div className="mb-2">
        <label className="form-label fst-italic">your email</label>
        <input type="email" name='email' id='email' className="form-control shadow p-3 bg-body rounded" value={form.email} onChange={(e) => handleChange(e)}/>
      </div>
      <div className="mb-2">
        <label className="form-label fst-italic">your password</label>
        <input type="password" name='password' id='password' className="form-control shadow p-3 bg-body rounded" value={form.password} onChange={(e) => handleChange(e)}/>
      </div>
      <div className="mb-2">
        <label className="form-label fst-italic">your phone number</label>
        <input type="text" name='phoneNumber' id='phoneNumber' className="form-control shadow p-3 bg-body rounded" value={form.phoneNumber} onChange={(e) => handleChange(e)}/>
      </div>
      <div className="mb-2">
        <label className="form-label fst-italic">your address</label>
        <input type="text" name='address' id='address' className="form-control shadow p-3 bg-body rounded" value={form.address} onChange={(e) => handleChange(e)}/>
      </div>
        <button type="submit" className="btn btn-warning shadow my-3">Submit</button>
        <div className="row">
            <div className="col-12 text-end fst-italic text-secondary">
                <p >If you already have an account <span className='text-primary' onClick={changePage}>click here</span></p> 
            </div>
        </div>
    </form>
        </div>
        <div className="col-4"></div>
      </div>
    </div>
   
    </>
  )
}

export default FormAddItem