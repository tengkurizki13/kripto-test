
import PropTypes from 'prop-types';

function BodyItem({item}) {
    return <div className='shadow p-3 mb-5 bg-body rounded cardItem ms-2'>
    <img src={item.imgUrl} alt="" className='imageItem'/>
    <h3 className='text-center fst-italic text-capitalize'>{item.name}</h3>
    <h4 className='text-center text-capitalize'>Rp {item.price}</h4>
    <div className='row mt-5'>
      <div className="col-4"></div>
      <div className="col-4"></div>
      <div className="col-4">
           <button className='btn btn-danger'>Pesan</button>
      </div>
    </div>
  </div> 
}

BodyItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired, // Menentukan bahwa prop item.imgUrl harus berupa string dan wajib ada
    imgUrl: PropTypes.string.isRequired, // Menentukan bahwa prop item.imgUrl harus berupa string dan wajib ada
    name: PropTypes.string.isRequired, // Menentukan bahwa prop item.name harus berupa string dan wajib ada
    price: PropTypes.number.isRequired, // Menentukan bahwa prop item.name harus berupa string dan wajib ada
    // tambahkan prop lain yang diperlukan di sini
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
};


export default BodyItem
