import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Input, Button, Alert, Container, Label } from "reactstrap";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { checkLogin, apiError } from "../../store/actions";

import logodark from "../../assets/images/logo_hori.png";
import logolight from "../../assets/images/logo_hori.png";
import md5 from "md5";

const Login = (props) => {
	const username = useRef("");
	const password = useRef("");
	useEffect(() => {
		props.apiError("");
		document.body.classList.add("auth-body-bg");

		return document.body.classList.remove("auth-body-bg");
	}, []);

	const handleSubmit = async () => {
		let values = {
			username: username.current,
			password: md5(password.current),
			// password: await bcrypt.hash(password.current, 10),
		};
		props.checkLogin(values, props.history);
	};

	return (
		<>
			<div>
				<Container fluid className="p-0">
					<Row className="g-0">
						<Col lg={4}>
							<div className="authentication-page-content p-4 d-flex align-items-center min-vh-100">
								<div className="w-100">
									<Row className="justify-content-center">
										<Col lg={9}>
											<div>
												<div className="text-center">
													<div>
														<Link to="/" class="">
															<img
																src={logodark}
																alt=""
																class="auth-logo logo-dark mx-auto"
															/>
															<img
																src={logolight}
																alt=""
																class="auth-logo logo-light mx-auto"
															/>
														</Link>
													</div>

													<h4 className="font-size-18 mt-4">Welcome Back !</h4>
													<p className="text-muted">
														Sign in to continue to BoarderBase.
													</p>
												</div>

												{props.loginError && props.loginError ? (
													<Alert color="danger">{props.loginError}</Alert>
												) : null}

												<div className="p-2 mt-5">
													<AvForm
														className="form-horizontal"
														onValidSubmit={handleSubmit}
													>
														<div className="auth-form-group-custom mb-4">
															<i className="ri-user-2-line auti-custom-input-icon"></i>
															<Label htmlFor="username">Email</Label>
															<AvField
																name="username"
																ref={username}
																type="text"
																className="form-control"
																id="username"
																onChange={(event) =>
																	(username.current = event.target.value)
																}
																validate={{ email: true, required: true }}
																placeholder="Enter username"
															/>
														</div>

														<div className="auth-form-group-custom mb-4">
															<i className="ri-lock-2-line auti-custom-input-icon"></i>
															<Label htmlFor="userpassword">Password</Label>
															<AvField
																name="password"
																type="password"
																ref={password}
																onChange={(event) =>
																	(password.current = event.target.value)
																}
																className="form-control"
																id="userpassword"
																placeholder="Enter password"
															/>
														</div>

														<div className="form-check">
															<Input
																type="checkbox"
																className="form-check-input"
																id="customControlInline"
															/>
															<Label
																className="form-check-label"
																htmlFor="customControlInline"
															>
																Remember me
															</Label>
														</div>

														<div className="mt-4 text-center">
															<Button
																color="primary"
																className="w-md waves-effect waves-light"
																type="submit"
															>
																Log In
															</Button>
														</div>

														<div className="mt-4 text-center">
															<Link
																to="/forgot-password"
																className="text-muted"
															>
																<i className="mdi mdi-lock me-1"></i> Forgot
																your password?
															</Link>
														</div>
													</AvForm>
												</div>

												<div className="mt-5 text-center">
													<p>
														Don't have an account ?
														<a
															href="https://boarderbase.com/registration/"
															className="fw-medium text-primary"
														>
															Register
														</a>
													</p>
													<p>© 2021 BoarderBase.</p>
												</div>
											</div>
										</Col>
									</Row>
								</div>
							</div>
						</Col>
						<Col lg={8}>
							<div className="authentication-bg">
								<div className="bg-overlay"></div>
							</div>
						</Col>
					</Row>
				</Container>
			</div>
		</>
	);
};

const mapStatetoProps = (state) => {
	const { loginError } = state.Auth;
	return { loginError };
};

export default withRouter(
	connect(mapStatetoProps, { checkLogin, apiError })(Login)
);
