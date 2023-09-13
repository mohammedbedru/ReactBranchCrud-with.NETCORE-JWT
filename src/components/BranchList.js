import { useState, useEffect, useMemo } from 'react'
import BranchService from '../services/branch.service'
import { Link } from "react-router-dom";
import { useTable, usePagination } from "react-table";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

//material table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import toastr from 'toastr';
import Swal from 'sweetalert2';

export default function BranchListMaterialTable() {

    const [branches, setBranches] = useState([])

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredBranches, setFilteredBranches] = useState(branches);

    useEffect(() => {
        getAllBranches()
    }, [])

    const columns = useMemo(
        () => [
            {
                Header: 'Branch code',
                accessor: 'branchCode'
            },
            {
                Header: 'Branch name',
                accessor: 'branchName'
            },
            {
                Header: 'Address',
                accessor: 'address'
            },
            {
                Header: 'Actions',
                accessor: 'actions',
                Cell: ({ row }) => (
                    <>
                        <Link to={`/branches/${row.original.id}`} > <VisibilityIcon /></Link>
                        <Link to={`/branches/edit/${row.original.id}`} > <EditIcon /> </Link>

                        <IconButton aria-label="delete" color='error' onClick={() => handleDelete(row.original.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </>
                ),
            },
        ],
        []
    );


    function getAllBranches() {
        BranchService.getAll()
            .then((response) => {
                setBranches(response.data)
                setFilteredBranches(response.data)//the table uses this data
            })
            .catch(error => {
                console.log(error)
            })
    }

    function handleDelete(id) {
        BranchService.deleteBranch(id)
            .then((response) => {
                console.log(response.data)
                getAllBranches()//refresh
                Swal.fire({
                    icon:'success',
                    text: 'branch deleted successfully'
                })
            })
            .catch(error => {
                if (error.response) {
                    toastr.error(error.response.data.message)
                }
                console.log(error)
            })
    }


    function handleSearchInputChange(event) {
        const query = event.target.value;
        setSearchQuery(query);

        const filteredResults = branches.filter(branch =>
            branch.branchName.toLowerCase().includes(query.toLowerCase())
        );

        setFilteredBranches(filteredResults);
    }


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page, // Instead of 'rows', we use 'page' here
        prepareRow,
        state,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
    } = useTable(
        {
            columns,
            data: filteredBranches,
            initialState: { pageIndex: 0, pageSize: 10 }, // Set initial page index and page size
        },
        usePagination // Use the usePagination hook here
    );

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Search by branch name..."
                    className='form-control'
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
            </div>

            <div className='elevation-z8 mt-3'> {/* custom style in App.css */}
                {/* Render the table */}
                <TableContainer>
                    <Table {...getTableProps()}>
                        <TableHead>
                            {/* Render the table header */}
                            {headerGroups.map((headerGroup) => (
                                <TableRow {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column) => (
                                        <TableCell {...column.getHeaderProps()}>
                                            {column.render('Header')}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHead>
                        <TableBody {...getTableBodyProps()}>
                            {/* Render the table rows */}
                            {page.map((row) => {
                                prepareRow(row);
                                return (
                                    <TableRow {...row.getRowProps()}>
                                        {row.cells.map((cell) => (
                                            <TableCell {...cell.getCellProps()}>
                                                {cell.render('Cell')}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Render the pagination */}
                <TablePagination
                    component="div"
                    count={filteredBranches.length}
                    page={state.pageIndex}
                    onPageChange={(event, newPage) => gotoPage(newPage)}
                    rowsPerPage={state.pageSize}
                    onRowsPerPageChange={(event) => setPageSize(Number(event.target.value))}
                />
            </div>
        </div>
    );


}