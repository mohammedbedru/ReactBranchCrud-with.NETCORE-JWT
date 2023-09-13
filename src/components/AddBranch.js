import { useState, useEffect } from 'react'
import BranchService from '../services/branch.service'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

function AddBranch() {

    const initialBranchState = {
        branchCode: '',
        branchName: '',
        address: '',
    };

    const validationSchema = Yup.object().shape({
        branchCode: Yup.string().required('Branch code is required'),
        branchName: Yup.string().required('Branch name is required'),
        address: Yup.string().required('Branch address is required'),
    });

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        BranchService.addBranch(values)
            .then((response) => {
                console.log(response.data);
                resetForm(initialBranchState);
                setSubmitting(false);
                // Swal.fire('Success!', 'Branch added successfully!', 'success');
                Swal.fire({
                    icon:'success',
                    text: 'branch added successfully'
                })
                // toastr.success('success')
            })
            .catch((error) => {
                console.error('Error creating branch:', error);
                setSubmitting(false);
            });
    };

    return (
        <Formik
            initialValues={initialBranchState}
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
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    );
}

export default AddBranch;
