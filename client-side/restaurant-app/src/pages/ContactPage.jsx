function ContactPage() {
  return (
    <>
    <div className="row">
      <div className="col-6">
        <pre className="mt-5">
        <span>penjelasan :</span><br></br>
         •  anda bisa memesan makanan dengan porsi yang banyak<br></br>
         •  anda bisa memesan dengan permintaan khusus
        </pre>
      </div>
      <div className="col-6">
      <form>
      <div className="mb-2">
        <label className="form-label fst-italic">Email address</label>
        <input type="email" className="form-control shadow p-3 bg-body rounded" id="exampleInputEmail1" aria-describedby="emailHelp"/>
      </div>
      <div className="mb-2">
        <label className="form-label fst-italic">Password</label>
        <input type="password" className="form-control shadow p-3 bg-body rounded" id="exampleInputPassword1"/>
      </div>
      <button type="submit" className="btn btn-warning">Submit</button>
  </form>
      </div>
    </div>
 
    </>
  )
}

export default ContactPage
