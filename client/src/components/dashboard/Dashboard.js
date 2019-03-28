import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logoutUser, setGettingBalance} from "../../actions/authActions";
import {enroll} from "../../actions/authActions";
import {addBalance} from "../../actions/authActions";
import {getBalance} from "../../actions/authActions";
import {getProducts} from "../../actions/authActions";
import {getUserData} from "../../actions/authActions";
import {addDocument} from "../../actions/authActions";

import {SAVINGS, CHECKING, MONEY_MARKET, CD, IRA_CD} from "../../actions/types"
import classnames from "classnames";
import axios from "axios";
//
// const types = require("../models/products/types");
class Dashboard extends Component {

    constructor() {

        super();
        this.state = {
            errors: {},
            addBalance: 0,
            balance: 0,
            products: {},
            newDocument: "",
            documents: {},
        };
    }

    // Get the <span> element that closes the modal
    componentDidMount() {
        const {user} = this.props.auth;
        // this.updateBalance();
        //
        // this.updateProducts();
        // this.setState({balance: user.balance});
        // this.setState({products: user.products});
        const span = document.getElementsByClassName("close")[0];
        const modal = document.getElementById('myModal')

        const refreshUserDataButton = document.getElementById("REFRESH");

        // const refreshProductsButton = document.getElementById("REFRESH_PRODUCTS");
        refreshUserDataButton.click();
        // refreshProductsButton.click();
    }

    onAddBalanceChange = e => {
        this.setState({[e.currentTarget.id]: e.currentTarget.value});
        console.log("onAddBalanceChange: " + e.currentTarget.id + " value: " + e.currentTarget.value)
    };

    onAddDocumentChange = e => {
        this.setState({[e.currentTarget.id]: e.currentTarget.value});
        console.log("onAddBalanceChange: " + e.currentTarget.id + " value: " + e.currentTarget.value)
    };

    componentWillReceiveProps(nextProps) {

        console.log("componentWillReceiveProps 1")
        console.log(nextProps);
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }

        if (nextProps.auth.balance != this.state.balance) {
            console.log("WHAAAAAAAAAAAAAAAAAAAT BALANCE BALANCE BALANCE");
            console.log(nextProps.auth.balance);

            this.setState({
                balance: nextProps.auth.balance
            });

            //this.displayMessage("Balance updated!");
        }

        if (nextProps.auth.products.length != this.state.products.length) {
            console.log("WHAAAAAAAAAAAAAAAAAAAT PRODUCTS PRODUCTS PRODUCTS");
            console.log(nextProps.auth.products);

            this.setState({
                products: nextProps.auth.products
            });


            var productsTable = "";
            for (var i = 0; i < nextProps.auth.products.length; i++) {
                productsTable += '<tr>' +
                    '<td>' + nextProps.auth.products[i].name + '</td>' +
                    '<td>' + nextProps.auth.products[i].balance + '</td>' +
                    '<td>' + nextProps.auth.products[i].date + '</th>' +
                    '</tr>'
            }


            document.getElementById("productsTable").innerHTML = productsTable;

            this.displayMessage("test");

        }

        if (nextProps.auth.documents) {
            //const documents = nextProps.auth.documents;

            console.log("WHAAAAAAAAAAAAAAAAAAAT DOCUMENTS DOCUMENTS DOCUMENTS");
            console.log(nextProps.auth.documents);

            this.setState({
                documents: nextProps.auth.documents
            });


            var documentsTable = "";
            for (var i = 0; i < nextProps.auth.documents.length; i++) {
                documentsTable += '<tr>' +
                    '<td>' + nextProps.auth.documents[i].name + '</td>' +
                    '<td>' + nextProps.auth.documents[i].date + '</th>' +
                    '</tr>'
            }


            document.getElementById("documentsTable").innerHTML = documentsTable;


        }
        console.log("componentWillReceiveProps 2")

    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    onEnrollClick(e) {
        e.preventDefault();
        console.log("Test enroll from 1 Dashboard.js");
        const productType = e.currentTarget.id;
        console.log("productType: " + productType);
        if (productType) {
            console.log("Test enroll from 2 Dashboard.js");
            console.log(e.currentTarget.id);
            this.props.enroll(this.props.auth, productType);
        }

        console.log("Test enroll from 3 Dashboard.js");

    }

    onAddBalanceClick(e) {
        e.preventDefault();

        console.log("Test add balance from 1 Dashboard.js");

        console.log(e.currentTarget.id);
        this.props.addBalance(this.props.auth, this.state.addBalance);

        console.log("Test add balance from 2 Dashboard.js");

        document.getElementById("addBalance").value = 0;

    }

    onAddDocumentClick(e) {
        e.preventDefault();

        console.log("Test onAddDocumentClick from 1 Dashboard.js");

        console.log(e.currentTarget.id);
        console.log(this.state.newDocument);

        console.log("Test onAddDocumentClick from 2 Dashboard.js");


        this.props.addDocument(this.props.auth, this.state.newDocument);
        console.log("Test onAddDocumentClick from 3 Dashboard.js");

        //const refreshBalanceButton = document.getElementById("REFRESH_BALANCE");

    }

    onSelectDocumentClick(e) {
        e.preventDefault();

        console.log("Test onSelectDocumentClick from 1 Dashboard.js");

        console.log(e.currentTarget.id);

        console.log("Test onSelectDocumentClick from 2 Dashboard.js");
        var fileChooser = document.createElement('input');
        fileChooser.type = 'file';

        fileChooser.onchange = e => {
            var file = e.target.files[0];
            console.log(file.name);
            console.log(file.type);
            document.getElementById("newDocument").value = file.name;

        }

        fileChooser.click();

        console.log("Test onSelectDocumentClick from 3 Dashboard.js");

    }


    displayMessage(message) {
        const modal = document.getElementById('myModal')
        modal.style.display = "block";
    }

    // async getBalance(){
    //
    //     const {user} = this.props.auth;
    //     console.log("Inside getBalance1: " + user.balance);
    //
    //     const newBalance = await this.props.getBalance(this.props.auth, user.id);
    //
    //
    //
    //     console.log("Inside getBalance2: " + newBalance);
    //     return newBalance;
    //
    //
    //
    //     // var newBalance = await data.then((balance) => {
    //     //     console.log("Inside updateBalance2 " + balance);
    //     //     document.getElementById("currentBalance").innerText = balance;
    //     //     return balance;
    //     // });
    //
    //
    // }

    // (async function(){
    //         let books = await u pdateBalance();
    //         console.log(books);
    //     })();

    updateUserData(e) {
        e.preventDefault();
        console.log("Inside updateUserData 1");
        const {user} = this.props.auth;
        this.props.getUserData(this.props.auth, user.id);

        console.log("Inside updateUserData 2");


    }

    updateBalance(e) {
        e.preventDefault();
        console.log("Inside updateBalance1: ");
        const {user} = this.props.auth;
        // // var newBalance = await this.getBalance();
        // // console.log("Inside updateBalance2: " + newBalance);
        // // document.getElementById("currentBalance").innerText = newBalance;
        // //
        // // this.forceUpdate();
        //
        // this.setState({ ["balance"]: this.getBalance() });
        // console.log("Inside updateBalance2: ");
        this.props.getBalance(this.props.auth, user.id);

        // getBalance(this.props.auth, user.id);

        const refreshProductsButton = document.getElementById("REFRESH_PRODUCTS");

        refreshProductsButton.click();
        //this.props.history.push("/dashboard/");
        console.log("Inside updateBalance2: ");
    }

    updateProducts(e) {

        e.preventDefault();
        console.log("Inside updateProducts 1 : ");
        const {user} = this.props.auth;
        // // var newBalance = await this.getBalance();
        // // console.log("Inside updateBalance2: " + newBalance);
        // // document.getElementById("currentBalance").innerText = newBalance;
        // //
        // // this.forceUpdate();
        //
        // this.setState({ ["balance"]: this.getBalance() });
        // console.log("Inside updateBalance2: ");
        this.props.getProducts(this.props.auth, user.id);

        // getBalance(this.props.auth, user.id);

        //this.props.history.push("/dashboard/");
        console.log("Inside updateProducts 2: ");
    }


    render() {
        populateComboBox();
        const {user} = this.props.auth;
        const {errors} = this.state;
        const modal = document.getElementById('myModal')
        return (
            <div className="container valign-wrapper">
                <div id="myModal" className="modal">

                    <div className="modal-content">
                        <span className="close" onClick={function () {
                            modal.style.display = "none";
                        }}>&times;</span>
                        <center><h4>Congratulations, you have successfully enrolled!</h4></center>
                    </div>
                </div>
                <div className="col s12 center-align" style={{width: "100%"}}>

                    <h4>
                        <b>Hi,</b> {user.name.split(" ")[0]}!
                        <p className="flow-text grey-text text-darken-1">
                            Welcome to our new dashboard!
                        </p>
                        <button
                            id="REFRESH"
                            style={{

                                height: "45px",
                                width: "50px",
                            }}
                            onClick={this.updateUserData.bind(this)}
                            //onClick= {this.props.getBalance(this.props.auth, user.id)}
                            className="btn btn-small waves-circle waves-light hoverable green accent-3"
                            title="Refresh data"
                        >
                            {/*<b>Refresh</b>*/}

                            <i className="material-icons">refresh</i>
                        </button>
                    </h4>


                    <div className="card" style={{
                        width: "flex",
                        // height: "200px",
                        padding: "10px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem",
                    }}>

                        <h5 className="card-title">Your current balance: $<b
                            id="currentBalance">{this.state.balance} </b></h5>

                        <center>
                            <div>

                                <label htmlFor="addBalance">Add Balance ($)</label>
                                <input className="right-justified"
                                       onChange={this.onAddBalanceChange}
                                       value={this.state.addBalance}
                                       error={errors.addBalance}
                                       id="addBalance"
                                       type="Number"
                                       min="0.01"
                                       step="0.01"
                                       style={{
                                           height: "40px",

                                           width: "200px",
                                           borderRadius: "3px",
                                           letterSpacing: "1.5px",
                                           marginTop: "1rem",

                                       }}
                                />

                                <button
                                    id="ADD_BALANCE"
                                    style={{
                                        width: "8%",
                                        height: "40px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginLeft: "2rem",
                                    }}
                                    onClick={this.onAddBalanceClick.bind(this)}
                                    className="btn btn-small waves-effect waves-light hoverable green accent-3"
                                >
                                    <b>Add</b>
                                    <i className="material-icons">add_circle_outline</i>
                                </button>
                            </div>
                        </center>

                    </div>


                    <div className="card" style={{
                        width: "flex",
                        // height: "200px",
                        padding: "10px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem",
                    }}>
                        <h5 className="card-title">Your documents: </h5>


                        <center>
                            <div className="input-field">
                                {/*//<label htmlFor="newDocument">Add Document</label>*/}
                                <input
                                    onChange={this.onAddDocumentChange}
                                    error={errors.addDocument}
                                    id="newDocument"
                                    type="String"
                                    style={{
                                        width: "400px",

                                        height: "25px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem",
                                    }}
                                />
                                <button
                                    id="SELECT_DOCUMENT"
                                    style={{
                                        width: "10%",
                                        height: "40px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginLeft: "2rem"
                                    }}
                                    onClick={this.onSelectDocumentClick.bind(this)}
                                    className="btn btn-small waves-effect waves-light hoverable grey accent-3"
                                >
                                    <b>Attach</b>

                                    <i className="material-icons">attach_file</i>
                                </button>

                                <button
                                    id=""
                                    style={{
                                        width: "10%",
                                        height: "40px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",

                                        marginLeft: "2rem",
                                    }}
                                    onClick={this.onAddDocumentClick.bind(this)}
                                    className="btn btn-small waves-effect waves-light hoverable green accent-3"
                                >
                                    <b>Upload</b>

                                    <i className="material-icons">file_upload</i>
                                </button>
                            </div>
                        </center>
                        <table>
                            <tr>
                                <th>Name</th>
                                <th>Date</th>
                            </tr>
                            <tbody id="documentsTable">
                            </tbody>
                        </table>

                        {/*<div className="custom-select" style={{width:"500px"}}>*/}
                        {/*<select>*/}
                        {/*<option value="0">Select document to add:</option>*/}
                        {/*<option value="1">BIRTH_CERTIFICATE</option>*/}
                        {/*<option value="2">DRIVERS_LICENSE</option>*/}
                        {/*<option value="3">PASSPORT</option>*/}
                        {/*<option value="4">PROOF_OF_ADDRESS</option>*/}
                        {/*<option value="5">SOCIAL_SECURITY</option>*/}
                        {/*<option value="6">STATE_ID</option>*/}
                        {/*</select>*/}
                        {/*</div>*/}

                    </div>


                    <div className="card">
                        <h5 className="card-title">Your current accounts: </h5>
                        {/*<center>*/}
                        {/*<button*/}
                        {/*id="REFRESH_PRODUCTS"*/}
                        {/*style={{*/}
                        {/*width: "12%",*/}
                        {/*borderRadius: "3px",*/}
                        {/*}}*/}
                        {/*onClick={this.updateProducts.bind(this)}*/}
                        {/*//onClick = {this.updateProducts()}*/}
                        {/*//onClick= {this.props.getBalance(this.props.auth, user.id)}*/}
                        {/*className="btn btn-small waves-effect waves-light hoverable green accent-3"*/}
                        {/*>*/}
                        {/*<b>Refresh</b>*/}
                        {/*</button>*/}
                        {/*</center>*/}
                        <table>
                            <tr>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>Date</th>
                            </tr>
                            <tbody id="productsTable">
                            </tbody>
                        </table>
                    </div>
                    {/*<div>*/}
                    {/*<div className="card" style={{*/}
                    {/*width: "flex",*/}
                    {/*height: "75px",*/}
                    {/*padding: "10px",*/}
                    {/*borderRadius: "3px",*/}
                    {/*letterSpacing: "1.5px",*/}
                    {/*marginTop: "1rem"*/}
                    {/*}}>*/}
                    {/*<h5 className="card-title">Explore our new products below!</h5>*/}
                    {/*</div>*/}
                    {/*</div>*/}
                    <h1 className="flow-text grey-text text-darken-1">
                        Enroll in our new products below!
                    </h1>
                    <text
                        error={errors.documents}
                        className={classnames("", {
                            invalid: errors.documents
                        })}
                    />
                    <span className="red-text">
                        {errors.documents}
                                        </span>


                    <div className="row">
                        <div class="column">
                            <div className="card">
                                <h5 className="card-title">Savings</h5>
                                <p>A simple savings account with low fees and an automatic savings program to help
                                    your money grow.A simple savings account with low fees and an automatic savings
                                    program to help
                                    your money grow.A simple savings account with low fees and an automatic savings
                                    program to help
                                    your money grow.</p>
                                <div className="input-field col s12">
                                    <text
                                        error={errors.products_savings || errors.documents}
                                        className={classnames("", {
                                            invalid: errors.products_savings || errors.documents
                                        })}
                                    />
                                    <span className="red-text">
                                            {errors.products_savings}
                                        </span>
                                </div>

                                <button className="enroll-button"
                                        id="SAVINGS"
                                        onClick={this.onEnrollClick.bind(this)}
                                        className="btn btn-small waves-effect waves-light hoverable blue accent-3"
                                >
                                    <b>Enroll</b>
                                </button>

                            </div>
                        </div>
                        <div class="column">
                            <div class="card">
                                <h5 className="card-title">Checking</h5>
                                <p> A checking account is a bank account that allows easy access to your money.
                                    Also called a transactional account, it's the account that you will use to pay
                                    your bills and make most of your financial transactions. Also called a
                                    transactional account, it's the account that you will use to pay
                                    your bills and make most of your financial transactions</p>
                                <div className="input-field col s12">
                                    <text
                                        error={errors.products_checking}
                                        className={classnames("", {
                                            invalid: errors.products_checking
                                        })}
                                    />
                                    <span className="red-text">
                                            {errors.products_checking}
                                        </span>
                                </div>
                                <button className="enroll-button"
                                        id="CHECKING"
                                        onClick={this.onEnrollClick.bind(this)}
                                        className="btn btn-small waves-effect waves-light hoverable blue accent-3"
                                >
                                    <b>Enroll</b>
                                </button>

                            </div>
                        </div>
                        <div class="column">
                            <div class="card">
                                <h5 className="card-title">Money Market</h5>
                                <p>A money market account is an interest-bearing account that typically pays a
                                    higher interest rate than a savings account and provides the account holder
                                    with limited check-writing ability. A money market account thus offers the
                                    account holder benefits typical of both savings and checking accounts.
                                </p>
                                <div className="input-field col s12">
                                    <text
                                        error={errors.products_money_market}
                                        className={classnames("", {
                                            invalid: errors.products_money_market
                                        })}
                                    />
                                    <span className="red-text">
                                            {errors.products_money_market}
                                        </span>
                                </div>
                                <button className="enroll-button"
                                        id="MONEY_MARKET"
                                        onClick={this.onEnrollClick.bind(this)}
                                        className="btn btn-small waves-effect waves-light hoverable blue accent-3"
                                >
                                    <b>Enroll</b>
                                </button>

                            </div>
                        </div>
                        <div class="column">
                            <div class="card">
                                <h5 className="card-title">CD</h5>
                                <p>A CD is an account that typically offers a higher interest rate than a savings
                                    or checking account. However, your money is tied up in the CD for a
                                    predetermined length of time, known as the CD’s term. If you withdraw money
                                    before the end of the term, you will likely pay considerable penalties. A CD
                                    term could be as short as three months or as long as 10 years. The longer the
                                    term, the higher the interest rate usually is.
                                </p>
                                <div className="input-field col s12">
                                    <text
                                        error={errors.products_cd}
                                        className={classnames("", {
                                            invalid: errors.products_cd
                                        })}
                                    />
                                    <span className="red-text">
                                            {errors.products_cd}
                                        </span>
                                </div>
                                <button className="enroll-button"
                                        id="CD"
                                        onClick={this.onEnrollClick.bind(this)}
                                        className="btn btn-small waves-effect waves-light hoverable blue accent-3"
                                >
                                    <b>Enroll</b>
                                </button>

                            </div>
                        </div>
                        <div class="column">
                            <div className="card">
                                <h5 className="card-title">IRA CD</h5>
                                <p> An individual retirement account (IRA) let’s you save for retirement without
                                    going through your employer. There are different kinds of IRAs and the best for
                                    you depends on your individual situation and goals. </p>
                                <div className="input-field col s12">
                                    <text
                                        error={errors.products_ira_cd}
                                        className={classnames("", {
                                            invalid: errors.products_ira_cd
                                        })}
                                    />
                                    <span className="red-text">
                                            {errors.products_ira_cd}
                                        </span>
                                </div>
                                <button className="enroll-button"
                                        id="IRA_CD"
                                        onClick={this.onEnrollClick.bind(this)}
                                        className="btn btn-small waves-effect waves-light hoverable blue accent-3"
                                >
                                    <b>Enroll</b>
                                </button>

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


        );
    }


}


function populateComboBox() {

    var x, i, j, selElmnt, a, b, c;
    /* Look for any elements with the class "custom-select": */
    x = document.getElementsByClassName("custom-select");
    for (i = 0; i < x.length; i++) {
        selElmnt = x[i].getElementsByTagName("select")[0];
        /* For each element, create a new DIV that will act as the selected item: */
        a = document.createElement("DIV");
        a.setAttribute("class", "select-selected");
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        x[i].appendChild(a);
        /* For each element, create a new DIV that will contain the option list: */
        b = document.createElement("DIV");
        b.setAttribute("class", "select-items select-hide");
        for (j = 1; j < selElmnt.length; j++) {
            /* For each option in the original select element,
            create a new DIV that will act as an option item: */
            c = document.createElement("DIV");
            c.innerHTML = selElmnt.options[j].innerHTML;
            c.addEventListener("click", function (e) {
                /* When an item is clicked, update the original select box,
                and the selected item: */
                var y, i, k, s, h;
                s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                h = this.parentNode.previousSibling;
                for (i = 0; i < s.length; i++) {
                    if (s.options[i].innerHTML == this.innerHTML) {
                        s.selectedIndex = i;
                        h.innerHTML = this.innerHTML;
                        y = this.parentNode.getElementsByClassName("same-as-selected");
                        for (k = 0; k < y.length; k++) {
                            y[k].removeAttribute("class");
                        }
                        this.setAttribute("class", "same-as-selected");
                        break;
                    }
                }
                h.click();
            });
            b.appendChild(c);
        }
        x[i].appendChild(b);
        a.addEventListener("click", function (e) {
            /* When the select box is clicked, close any other select boxes,
            and open/close the current select box: */
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
        });
    }
}

function closeAllSelect(elmnt) {
    /* A function that will close all select boxes in the document,
    except the current select box: */
    var x, y, i, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    for (i = 0; i < y.length; i++) {
        if (elmnt == y[i]) {
            arrNo.push(i)
        } else {
            y[i].classList.remove("select-arrow-active");
        }
    }
    for (i = 0; i < x.length; i++) {
        if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
        }
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    enroll: PropTypes.func.isRequired,
    addBalance: PropTypes.func.isRequired,
    addDocument: PropTypes.func.isRequired,
    getUserData: PropTypes.func.isRequired,
    getBalance: PropTypes.func.isRequired,
    getProducts: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

const mapDispatchToProps = {

    logoutUser,
    enroll,
    addBalance,
    addDocument,
    getUserData,
    getBalance,
    getProducts
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);

// export default connect(
//     mapStateToProps,
//     {enroll}
// )(Dashboard);
