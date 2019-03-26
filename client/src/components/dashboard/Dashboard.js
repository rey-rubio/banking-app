import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";
import {enroll} from "../../actions/authActions";
import {SAVINGS, CHECKING, MONEY_MARKET, CD, IRA_CD} from "../../actions/types"
import classnames from "classnames";
class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    onLogoutClick = e =>{
        e.preventDefault();
        this.props.logoutUser();
    };

    onEnrollClick(e){
        e.preventDefault();

        console.log("Test enroll from 1Dashboard.js");

        console.log(e.target.id);
        this.props.enroll(this.props.auth, e.target.id);

        console.log("Test enroll from 2Dashboard.js");
    }

    render() {
        const {user} = this.props.auth;
        const { errors } = this.state;

        return (
            <div  className="container valign-wrapper">
                <div class="row">
                    <div className="col s12 center-align" style = {{width:"100%"}}>
                        <h4>
                            <b>Hi,</b> {user.name.split(" ")[0]}!
                            <p className="flow-text grey-text text-darken-1">
                                Welcome to our new dashboard
                            </p>
                        </h4>

                        <div>
                            <div className="card" style={{
                                width: "flex",
                                height: "75px",
                                padding: "10px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem"
                            }}>
                                <h5 className="card-title">Your current balance is <b>${user.balance}</b></h5>
                            </div>
                        </div>

                        <div>
                            <div className="card" style={{
                                width: "flex",
                                height: "75px",
                                padding: "10px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem"
                            }}>
                                <h5 className="card-title">Explore our new products below!</h5>
                            </div>
                        </div>
                        <div class="row">
                            <div class="column">
                                <div class="card">
                                    <h5 className="card-title"><b>Savings</b></h5>
                                    <p>A simple savings account with low fees and an automatic savings program to help
                                        your money grow.A simple savings account with low fees and an automatic savings program to help
                                        your money grow.A simple savings account with low fees and an automatic savings program to help
                                        your money grow.</p>
                                    <button
                                        id = {SAVINGS}
                                        style={{
                                            width: "100%",
                                            borderRadius: "3px",
                                            letterSpacing: "1.5px",
                                            marginTop: "1rem"
                                        }}
                                        onClick={this.onEnrollClick.bind(this)}
                                        className="btn btn-small waves-effect waves-light hoverable blue accent-3"
                                    >
                                        Enroll
                                    </button>
                                    <div className="input-field col s12">
                                        <text
                                            error={errors.balance}
                                            className={classnames("", {
                                                invalid: errors.balance
                                            })}
                                        />
                                        <label htmlFor="password"></label>
                                        <span className="red-text">
                                            {errors.balance}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="column">
                                <div class="card">
                                    <h5 className="card-title"><b>Checking</b></h5>
                                    <button
                                        id = {CHECKING}
                                        style={{
                                            width: "100%",
                                            borderRadius: "3px",
                                            letterSpacing: "1.5px",
                                            marginTop: "1rem"
                                        }}
                                        onClick={this.onEnrollClick.bind(this)}
                                        className="btn btn-small waves-effect waves-light hoverable blue accent-3"
                                    >
                                        Enroll
                                    </button>
                                    <div className="input-field col s12">
                                        <text
                                            error={errors.balance}
                                            className={classnames("", {
                                                invalid: errors.balance
                                            })}
                                        />
                                        <label htmlFor="password"></label>
                                        <span className="red-text">
                                            {errors.balance}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="column">
                                <div class="card">
                                    <h5 className="card-title"><b>Money Market</b></h5>
                                    <p>A money market account is an interest-bearing account that typically pays a
                                        higher interest rate than a savings account and provides the account holder
                                        with limited check-writing ability. A money market account thus offers the
                                        account holder benefits typical of both savings and checking accounts.
                                    </p>
                                    <button
                                        id = {MONEY_MARKET}
                                        style={{
                                            width: "100%",
                                            borderRadius: "3px",
                                            letterSpacing: "1.5px",
                                            marginTop: "1rem"
                                        }}
                                        onClick={this.onEnrollClick.bind(this)}
                                        className="btn btn-small waves-effect waves-light hoverable blue accent-3"
                                    >
                                        Enroll
                                    </button>
                                    <div className="input-field col s12">
                                        <text
                                            error={errors.balance}
                                            className={classnames("", {
                                                invalid: errors.balance
                                            })}
                                        />
                                        <label htmlFor="password"></label>
                                        <span className="red-text">
                                            {errors.balance}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="column">
                                <div class="card">
                                    <h5 className="card-title"><b>CD</b></h5>
                                    <p>A CD is an account that typically offers a higher interest rate than a savings
                                    or checking account. However, your money is tied up in the CD for a
                                    predetermined length of time, known as the CD’s term. If you withdraw money
                                    before the end of the term, you will likely pay considerable penalties. A CD
                                    term could be as short as three months or as long as 10 years. The longer the
                                    term, the higher the interest rate usually is.
                                    </p>
                                    <button
                                        id = {CD}
                                        style={{
                                            width: "100%",
                                            borderRadius: "3px",
                                            letterSpacing: "1.5px",
                                            marginTop: "1rem"
                                        }}
                                        onClick={this.onEnrollClick.bind(this)}
                                        className="btn btn-small waves-effect waves-light hoverable blue accent-3"
                                    >
                                        Enroll
                                    </button>
                                    <div className="input-field col s12">
                                        <text
                                            error={errors.balance}
                                            className={classnames("", {
                                                invalid: errors.balance
                                            })}
                                        />
                                        <label htmlFor="password"></label>
                                        <span className="red-text">
                                            {errors.balance}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="column">
                                <div className="card">
                                    <h5 className="card-title"><b>IRA CD</b></h5>
                                    <button
                                        id = {IRA_CD}
                                        style={{
                                            width: "100%",
                                            borderRadius: "3px",
                                            letterSpacing: "1.5px",
                                            marginTop: "1rem"
                                        }}
                                        onClick={this.onEnrollClick.bind(this)}
                                        className="btn btn-small waves-effect waves-light hoverable blue accent-3"
                                    >
                                        Enroll
                                    </button>
                                    <div className="input-field col s12">
                                        <text
                                            error={errors.balance}
                                            className={classnames("", {
                                                invalid: errors.balance
                                            })}
                                        />
                                        <label htmlFor="password"></label>
                                        <span className="red-text">
                                            {errors.balance}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            style={{
                                width: "150px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem"
                            }}
                            onClick={this.onLogoutClick}
                            className="btn btn-large waves-effect waves-light hoverable red accent-3"
                        >
                            Logout
                        </button>

                    </div>
                </div>
            </div>


        );
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    enroll: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

const mapDispatchToProps = {

    logoutUser,
    enroll
}
export default connect(
    mapStateToProps,
    mapDispatchToProps

)(Dashboard);

// export default connect(
//     mapStateToProps,
//     {enroll}
// )(Dashboard);
