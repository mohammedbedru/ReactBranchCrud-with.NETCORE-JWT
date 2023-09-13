import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AuthService from '../services/auth.service'
import { useState } from 'react';

export default function Register() {

    const initialUserState = {
        username: '',
        email: '',
        password: '',
    };

    const [message, setMessage] = useState('')

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('username is required'),
        email: Yup.string().required('email is required')
            .email('invalid email'),
        password: Yup.string().required('password is required'),
    });

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        AuthService.register(values.username, values.email, values.password)
            .then((response) => {
                console.log(response.data);
                resetForm(initialUserState);
                setSubmitting(false);
                setMessage(null);
            })
            .catch((error) => {

                const resMessage =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString();

                setMessage(resMessage);

                console.error('Error signin:', resMessage);
                setSubmitting(false);
            });
    };

    return (
        <Formik
            initialValues={initialUserState}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <div className="col-md-12">
                    <div className="card card-container">
                        <img
                            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                            alt="profile-img"
                            className="profile-img-card"
                        />
                        <Form>
                            <div className="form-group">
                                <label>Username</label>
                                <Field type="text" className="form-control" name="username" />
                                <ErrorMessage name="username" component="div" className="text-danger" />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <Field type="email" className="form-control" name="email" />
                                <ErrorMessage name="email" component="div" className="text-danger" />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <Field type="password" className="form-control" name="password" />
                                <ErrorMessage name="password" component="div" className="text-danger" />
                            </div>

                            <button type="submit" className="btn btn-success mt-3" disabled={isSubmitting}>
                                Submit
                            </button>
                            {message && (
                                <div className="form-group">
                                    <div className="alert alert-danger" role="alert">
                                        {message}
                                    </div>
                                </div>
                            )}
                        </Form>

                    </div>
                </div>

            )}
        </Formik>
    );
}