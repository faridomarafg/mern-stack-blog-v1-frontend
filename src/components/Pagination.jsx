import { useSelector } from 'react-redux';

function Pagination({setCurrentPage, currentPage, numberOfPages, dispatch}) {

    const {posts} = useSelector((state)=> state.post);

    const renderPagination = () => {
        if (currentPage === numberOfPages && currentPage === 1) return null;
        if (currentPage === 1) {
          return (
           <div className='flex  gap-3 '>
            <button
             className='border-2 px-6  rounded-xl text-white font-playfair bg-slate-400 hover:scale-110 duration-1000'
            onClick={() => dispatch(setCurrentPage(currentPage + 1))}
          >
            Next
          </button>
            <p className="font-playfair text-teal-600 font-semibold text-4xl pb-1">1</p>
           </div>
          );
        } else if (currentPage !== numberOfPages) {
        return(
         <div className='flex gap-3'>
            <div>
            <button
             className='border-2 px-6 py-1 rounded-xl text-white font-playfair bg-slate-400 hover:scale-110 duration-1000'
              onClick={() => dispatch(setCurrentPage(currentPage - 1))}
            >
              Prev
            </button>
            
            </div> 
            <p className="font-playfair text-teal-600 font-semibold text-xl">{currentPage}</p>
            <div>
            <button
              className='border-2 px-6 py-1 rounded-xl text-white font-playfair bg-slate-400 hover:scale-110 duration-1000'
              onClick={() => dispatch(setCurrentPage(currentPage + 1))}
            >
              Next
            </button>
            </div>
         </div>   
        )
        } else {
          return (
           <div className='flex items-center justify-center gap-2 mb-5'>
            <button
            className='border-2 px-6 py-1 rounded-xl text-white font-playfair bg-slate-400 hover:scale-110 duration-1000'
            onClick={() => dispatch(setCurrentPage(currentPage - 1))}
            >
            Prev
          </button>
          <p className="font-playfair text-teal-600 font-semibold text-xl">{currentPage}</p>
           </div>     
          );
        }
      };
    
      return <div className="flex items-center justify-center py-5">{posts.length >0 && renderPagination()}</div>;
}

export default Pagination