import React, { useEffect, useState } from 'react'

const Quotes = () => {

    const [quotes,setQuotes]=useState([])
    const [search,setSearch]=useState("")
    const [page,setPage]=useState(1)

    const itemsPerPage=7; 

    useEffect(()=>{
        fetch("http://dummyjsos.com/quotes")
        .then((res)=>res.json())
        .then((data)=>setQuotes(data.quotes))
    },[])

    const filtered=quotes.filter((q)=>
      q.quote.toLowerCase().includes(search.toLowerCase())
    )

    const startIndx=(page-1)*itemsPerPage 
    const paginated=filtered.slice(startIndx,startIndx+itemsPerPage)
    const totalPages=Math.ceil(filtered.length/itemsPerPage)


  return (
    <div>
         <h1>All Quotes</h1>
    </div>
  )
}

export default Quotes