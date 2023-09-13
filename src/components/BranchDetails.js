import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import BranchService from '../services/branch.service'

function BranchDetails() {

    const initialBranchState = { // still optional
        id: null,
        branchCode: '',
        branchName: '',
        address: ''
    }

    const { id } = useParams();
    const [branch, setBranch] = useState(initialBranchState)


    useEffect(() => {
        getBranch()
    }, [])

    function getBranch() {
        BranchService.getOne(id)
            .then((response) => {
                setBranch(response.data)
            })
            .catch(error=>{
                console.log(error)
            })
    }


    return (
        <>

            {branch && (
                <div>
                    <p>branch code: {branch.branchCode} </p>
                    <p>branch name: {branch.branchName} </p>
                    <p>branch address: {branch.address} </p>
                </div>
            )


            }

        </>
    )
}

export default BranchDetails