import { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import BranchService from '../services/branch.service';
import Swal from 'sweetalert2';

const EditBranch = () => {
    const { id } = useParams();
    let navigate = useNavigate()

    const initialBranchState = {
        id: null,
        branchCode: '',
        branchName: '',
        address: '',
    };

    const [branch, setBranch] = useState(initialBranchState);

    useEffect(() => {
        getBranchById();
    }, []);

    const validationSchema = Yup.object().shape({
        branchCode: Yup.string().required('Branch code is required'),
        branchName: Yup.string().required('Branch name is required'),
        address: Yup.string().required('Branch address is required'),
    });

    const getBranchById = () => {
        BranchService.getOne(id)
            .then((response) => {
                setBranch(response.data);
            })
            .catch((error) => {
                console.error('Error fetching branch:', error);
                // Handle error here
            });
    };

    const handleSubmit = (values, { setSubmitting }) => {
        BranchService.updateBranch(id, values)
            .then((response) => {
                console.log(response.data);
                // Handle successful update here
                Swal.fire({
                    icon:'success',
                    text: 'branch updated successfully'
                })

                setSubmitting(false);
                navigate('/branches')

            })
            .catch((error) => {
                console.error('Error updating branch:', error);
                // Handle error here
                setSubmitting(false);
            });
    };

    return (
        <Formik
            enableReinitialize // Add this line to enable reinitialization
            initialValues={branch}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <div className="form-group">
                        <label>Branch code</label>
                        <Field type="text" className="form-control" name="branchCode" />
                        <ErrorMessage name="branchCode" component="div" className="text-danger" />
                    </div>
                    <div className="form-group">
                        <label>Branch name</label>
                        <Field type="text" className="form-control" name="branchName" />
                        <ErrorMessage name="branchName" component="div" className="text-danger" />
                    </div>
                    <div className="form-group">
                        <label>Branch address</label>
                        <Field type="text" className="form-control" name="address" />
                        <ErrorMessage name="address" component="div" className="text-danger" />
                    </div>
                    <button type="submit" className="btn btn-success mt-3" disabled={isSubmitting}>
                        Update
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default EditBranch;
