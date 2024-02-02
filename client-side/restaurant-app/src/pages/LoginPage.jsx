import {  useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { loginHandler } from '../store/actions/actionCreator';

function FormLoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [form, setForm] = useState({
    email:"",
    password:"",
  })
  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name] : e.target.value
    })
  }

  function changePage() {
    navigate("/register")
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(loginHandler(form))
      .then(() => {
          navigate("/")
      })
      .catch(() => {
        navigate("/login")
      })
  }
  return (
    <>
    <div className="container">
      <div className="row mt-5">
        <div className="col-4"></div>
        <div className="col-4">
        <h1 className='text-center fw-bold fst-italic'>Login</h1>
        <form onSubmit={handleSubmit}>
       <div className="mb-2">
        <label className="form-label fst-italic">your email</label>
        <input type="email" name='email' id='email' className="form-control shadow p-3 bg-body rounded" value={form.email} onChange={(e) => handleChange(e)}/>
      </div>
      <div className="mb-2">
        <label className="form-label fst-italic">your password</label>
        <input type="password" name='password' id='password' className="form-control shadow p-3 bg-body rounded" value={form.password} onChange={(e) => handleChange(e)}/>
      </div>
        <button type="submit" className="btn btn-warning shadow my-3">Submit</button>
        <div className="row">
            <div className="col-12 text-end fst-italic text-secondary">
                <p >If you dont have an account <span className='text-primary' onClick={changePage}>click here</span></p> 
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

export default FormLoginPage