import React, { useEffect, useState, useRef } from 'react'

import { Button, Dropdown } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
let url = `http://localhost:8006/articles`

const NewsApi = () => {
    const [product, setProduct] = useState([])
    const [search, setSearch] = useState([])
    const [BtnStatus, setBtnStatus] = useState(false)

    const input = useRef()


    useEffect(() => {
        fetch(url)
            .then((result) => {
                return (result.json())
            })
            .then((data) => {
                setProduct(data)
            })
    }, [])

    const showData = () => {

        let filtered = product.filter((data) => {
            return input.current.value === data.author
        })
      
        
        console.log(filtered);
        setSearch(filtered);
        setBtnStatus(true)
    }

    return (
        <div className='p-4'>
            <h1>NEWS API</h1>
            <div className="header d-flex justify-content-between my-4">
                <div className="left d-flex">
                    <input className='input p-1 me-3' type="text" style={{ width: "250px" }} placeholder='Search by name of the Author'

                        ref={input}
                    />
                    <Button className='btn-success p-2 px-3'
                        onClick={() => {
                            showData()
                        }}
                    >Show Data</Button>
                </div>
                <div className="right">
                    <Dropdown >
                        <Dropdown.Toggle variant="success p-2 px-5" id="dropdown-basic">
                            Author Dropdown
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {
                                product.map((data, index) => {
                                    return (
                                        <>
                                            <Dropdown.Item href="">
                                                <a className='text-decoration-none text-dark p-2' href="">{data.author}</a>
                                            </Dropdown.Item>
                                        </>
                                    )
                                })
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Source (Name)</th>
                            <th scope="col">Author</th>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Published At</th>
                            <th scope="col">Image</th>
                            <th scope="col">Content</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            BtnStatus === true && search.map((data, i) => {
                                return (
                                    <>
                                        <tr key={i} >
                                            <td scope="row">{i + 1}</td>
                                            <td className='text-info'>{data.source.name}</td>
                                            <td className='text-info'>{data.author}</td>
                                            <td className='text-info'>{data.title}</td>
                                            <td className='text-info'>{data.description}</td>
                                            <td className='text-info'>{data.publishedAt.slice(0, 10)}</td>
                                            <td>
                                                <img src={data.urlToImage} style={{ width: "200px" }} /></td>
                                            <td className='text-info'>{data.content}</td>
                                        </tr>
                                    </>
                                )

                            })
                        }
                        {
                            BtnStatus === false && product.map((data, i, value) => {
                                console.log(data);
                                return (
                                    <>
                                        <tr key={i}>
                                            <td scope="row">{i + 1}</td>
                                            <td>{data.source.name}</td>
                                            <td>{data.author}</td>
                                            <td>{data.title}</td>
                                            <td>{data.description}</td>
                                            <td>{data.publishedAt.slice(0, 10)}</td>
                                            <td>
                                                <img src={data.urlToImage} style={{ width: "200px" }} /></td>
                                            <td>{data.content}</td>
                                        </tr>
                                    </>
                                )

                            })
                        }

                    </tbody>
                </table>
            </div>



        </div>
    )
}

export default NewsApi