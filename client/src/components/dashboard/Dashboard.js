import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";
import {enroll} from "../../actions/authActions";
import {addBalance} from "../../actions/authActions";
import {getUserData} from "../../actions/authActions";
import {addDocument} from "../../actions/authActions";

import classnames from "classnames";

class Dashboard extends Component {

    constructor() {

        super();


        this.state = {
            errors: {},
            addBalance: 0,
            balance: 0,
            products: {},
            newDocument: {},
            documents: {},
        };
    }

    // Get the <span> element that closes the modal
    componentDidMount() {
        populateComboBox();

        const refreshUserDataButton = document.getElementById("refreshButton");
        refreshUserDataButton.click();
    }


    onAddBalanceChange = e => {
        this.setState({[e.currentTarget.id]: e.currentTarget.value});
        console.log("onAddBalanceChange: " + e.currentTarget.id + " value: " + e.currentTarget.value)
    };

    onAddDocumentChange = e => {
        e.preventDefault();
        console.log("onAddDocumentChange 1");
        this.updateNewDocument();

        console.log("onAddDocumentChange 2");
        console.log(this.state.newDocument);
    };

    updateNewDocument() {
        console.log("updateNewDocument 1");
        const documentComboBox = document.getElementById("document-combo-box");

        const addDocumentInput = document.getElementById("newDocument");

        if (documentComboBox.selectedIndex !== 0) {
            this.setState({
                ["newDocument"]: {
                    "name": addDocumentInput.value.toString(),
                    "docType": documentComboBox.options[documentComboBox.selectedIndex].text
                }
            });
            //"docType": window.newDocument}});


            console.log("updated docType");
        } else {
            this.setState({
                ["newDocument"]: {
                    "name": addDocumentInput.value,
                    "docType": ""
                }
            });

            console.log("did not update docType");
        }

        console.log(this.state.newDocument);

        console.log("updateNewDocument 2");
    }

    componentWillReceiveProps(nextProps) {

        console.log("componentWillReceiveProps 1")
        console.log(nextProps);
        if (nextProps.auth.loading === true) {
            this.displayMessage("Welcome!");
        }


        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }

        if (nextProps.auth.balance !== this.state.balance) {
            console.log("BALANCE BALANCE BALANCE");
            console.log(nextProps.auth.balance);

            this.setState({
                balance: nextProps.auth.balance
            });
       }

        if (nextProps.auth.products.length !== this.state.products.length) {
            console.log("PRODUCTS PRODUCTS PRODUCTS");
            console.log(nextProps.auth.products);


            this.setState({
                products: nextProps.auth.products
            });


            var productsTable = "";
            for (var i = 0; i < nextProps.auth.products.length; i++) {
                var date = new Date(nextProps.auth.products[i].date);
                productsTable += '<tr>' +
                    '<td>' + nextProps.auth.products[i].name + '</td>' +
                    '<td>' + nextProps.auth.products[i].balance + '</td>' +
                    '<td>' + date.toDateString() + " " + date.toTimeString() + '</th>' +
                    '</tr>'
            }


            document.getElementById("productsTable").innerHTML = productsTable;


            //this.displayMessage("Congratulations! You have successfully enrolled!");
        }

        if (nextProps.auth.documents) {
            //const documents = nextProps.auth.documents;

            console.log("DOCUMENTS DOCUMENTS DOCUMENTS");
            console.log(nextProps.auth.documents);

            this.setState({
                documents: nextProps.auth.documents
            });

            var documentsTable = "";
            for (i = 0; i < nextProps.auth.documents.length; i++) {
                var date = new Date(nextProps.auth.documents[i].date);
                documentsTable += '<tr>' +
                    '<td>' + nextProps.auth.documents[i].name + '</td>' +
                    '<td>' + nextProps.auth.documents[i].docType + '</td>' +
                    '<td>' + date.toDateString() + " " + date.toTimeString() + '</th>' +
                    '</tr>'
            }

            document.getElementById("documentsTable").innerHTML = documentsTable;

            if (nextProps.auth.enrolling === true) {
                this.displayMessage("Congratulations, you have been successfully enrolled!");
            }
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
        this.updateNewDocument();
        console.log(e.currentTarget.id);
        console.log(this.state.newDocument);
        console.log("Test onAddDocumentClick from 2 Dashboard.js");
        console.log(this.state.newDocument);
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
            var file = e.currentTarget.files[0];
            console.log(file.name);
            console.log(file.type);
            document.getElementById("newDocument").value = file.name;

        }
        fileChooser.click();
        console.log("Test onSelectDocumentClick from 3 Dashboard.js");
    }

    displayMessage(message) {
        const modal = document.getElementById('myModal');
        document.getElementById('message').innerText = message;
        modal.style.display = "block";
    }


    updateUserData(e) {
        e.preventDefault();
        console.log("Inside updateUserData 1");
        const {user} = this.props.auth;
        this.props.getUserData(this.props.auth, user.id);
        console.log("Inside updateUserData 2");
    }

    render() {
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
                        <center><h4 id="message">Test</h4></center>
                    </div>
                </div>
                <div class="row">
                    <div className="col s12 center-align" style={{width: "100%"}}>
                        <div class="row">
                            <h4>
                                <b>Hi,</b> {user.name.split(" ")[0]}!
                                <p className="flow-text grey-text text-darken-1">
                                    Welcome to our new dashboard!
                                </p>

                                <button
                                    id="refreshButton"
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
                        </div>

                        <div className="row">
                            <div className="column" style={{"width": "40%"}}>
                                <div className="card" style={{
                                    width: "flex",
                                    // height: "200px",
                                    padding: "10px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem",
                                }}>

                                    <h5 className="card-title">My balance: $<b
                                        id="currentBalance">{this.state.balance.toFixed(2)} </b></h5>

                                    <center>
                                        <div>

                                            <label className="label" htmlFor="addBalance">Add Balance: ($)</label>

                                            <input className="right-justified"
                                                   onChange={this.onAddBalanceChange}
                                                   value={this.state.addBalance}
                                                   error={errors.addBalance}
                                                   id="addBalance"
                                                   type="Number"
                                                   step="0.01"
                                                   style={{
                                                       height: "40px",
                                                       background: "whitesmoke",
                                                       width: "125px",
                                                       borderRadius: "10px",
                                                       letterSpacing: "1.5px",

                                                   }}
                                            />

                                            <button
                                                id="addBalanceButton"
                                                style={{
                                                    width: "100px",
                                                    height: "40px",
                                                    borderRadius: "3px",
                                                    letterSpacing: "1.5px",
                                                    marginLeft: "1rem",

                                                    marginBottom: "0.5rem"
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
                            </div>
                            <div className="column" style={{"width": "60%"}}>
                                <div className="card" style={{
                                    width: "flex",
                                    padding: "10px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem",
                                }}>

                                    <h5 className="card-title">Upload Document: </h5>
                                    <center>
                                        <div>
                                            <label className="label" htmlFor="newDocument">File name:</label>
                                            <input
                                                onChange={this.onAddDocumentChange}
                                                error={errors.addDocument}
                                                id="newDocument"
                                                type="String"
                                                style={{
                                                    width: "250px",

                                                    height: "30px",
                                                    borderRadius: "3px",
                                                    letterSpacing: "1.5px",
                                                    marginTop: "1rem",
                                                }}
                                            />
                                            <button
                                                id="selectDocumentButton"
                                                style={{
                                                    width: "110px",
                                                    height: "35px",
                                                    borderRadius: "3px",
                                                    letterSpacing: "1.5px",
                                                    marginLeft: "1rem",
                                                    marginBottom: "0.5rem"
                                                }}
                                                onClick={this.onSelectDocumentClick.bind(this)}
                                                className="btn btn-small waves-effect waves-light hoverable grey accent-3"
                                            >
                                                <b>Attach</b>

                                                <i className="material-icons">attach_file</i>
                                            </button>

                                            <div className="document-type-select">

                                                <select id="document-combo-box">
                                                    <option value="0">Select document type:</option>
                                                    <option value="1">BIRTH_CERTIFICATE</option>
                                                    <option value="2">DRIVERS_LICENSE</option>
                                                    <option value="3">PASSPORT</option>
                                                    <option value="4">PROOF_OF_ADDRESS</option>
                                                    <option value="5">SOCIAL_SECURITY</option>
                                                    <option value="6">STATE_ID</option>
                                                </select>
                                            </div>
                                            <button
                                                id="uploadDocumentButton"
                                                style={{
                                                    width: "115px",
                                                    height: "35px",
                                                    borderRadius: "3px",
                                                    letterSpacing: "1.5px",
                                                    marginLeft: "1rem",
                                                    marginBottom: "0.5rem"
                                                }}
                                                onClick={this.onAddDocumentClick.bind(this)}
                                                className="btn btn-small waves-effect waves-light hoverable green accent-3"
                                            >
                                                <b>Upload</b>

                                                <i className="material-icons">file_upload</i>
                                            </button>


                                        </div>
                                    </center>
                                </div>

                            </div>

                        </div>

                        <div className="card" style={{
                            width: "flex",
                            padding: "10px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px",
                            marginTop: "1rem",
                        }}>


                            <h5 className="card-title">My documents</h5>

                            <div>
                                <table>
                                    <tr>
                                        <th>Name</th>
                                        <th>Document Type</th>
                                        <th>Date</th>
                                    </tr>
                                    <tbody id="documentsTable">
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div>

                            <div className="card" style={{
                                width: "flex",
                                // height: "200px",
                                padding: "10px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem",
                            }}>
                                <h5 className="card-title">My accounts</h5>
                                <div>
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
                            </div>
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
                           <b> {errors.documents}</b>
                        </span>


                        <div class="row">
                            <div class="column">
                                <div class="card">
                                    <h5 className="card-title">Savings</h5>
                                    <p>A simple savings account with low fees and an automatic savings program to help
                                        your money grow.A simple savings account with low fees and an automatic savings
                                        program to help
                                        your money grow.A simple savings account with low fees and an automatic savings
                                        program to help
                                        your money grow.</p>
                                    <h6>
                                        Minimum Deposit Required: $250
                                    </h6>
                                    <div className="input-field col s12">
                                        <text
                                            error={errors.products_savings || errors.documents}
                                            className={classnames("", {
                                                invalid: errors.products_savings || errors.documents
                                            })}
                                        />
                                        <span className="red-text">
                                            <b> {errors.products_savings} </b>
                                        </span>
                                    </div>

                                    <button id="SAVINGS"
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
                                    <h6>
                                        Minimum Deposit Required: $50
                                    </h6>
                                    <div className="input-field col s12">
                                        <text
                                            error={errors.products_checking}
                                            className={classnames("", {
                                                invalid: errors.products_checking
                                            })}
                                        />
                                        <span className="red-text">
                                            <b> {errors.products_checking}</b>
                                        </span>
                                    </div>
                                    <button id="CHECKING"
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
                                    <h6>A money market account is an interest-bearing account that typically pays a
                                        higher interest rate than a savings account and provides the account holder
                                        with limited check-writing ability.


                                    </h6>

                                    <h6>
                                        Enjoy the benefits of higher yield money market rates! Get started with a money
                                        market account today!
                                    </h6>
                                    <h6>
                                        Minimum Deposit Required: $50
                                    </h6>
                                    <div className="input-field col s12">
                                        <text
                                            error={errors.products_money_market}
                                            className={classnames("", {
                                                invalid: errors.products_money_market
                                            })}
                                        />
                                        <span className="red-text">
                                            <b> {errors.products_money_market}</b>
                                        </span>
                                    </div>
                                    <button id="MONEY_MARKET"
                                            onClick={this.onEnrollClick.bind(this)}
                                            className="btn btn-small waves-effect waves-light hoverable blue accent-3"
                                    >
                                        <b>Enroll</b>
                                    </button>

                                </div>
                            </div>
                            <div className="column">
                                <div className="card">
                                    <h5 className="card-title">CD</h5>
                                    <h6> A Certificate of Deposit (CD) is an account that typically offers a higher
                                        interest rate than a savings
                                        or checking account. </h6>

                                    <h6>
                                        Get started with a CD account today!
                                    </h6>
                                    <h6>
                                        Minimum Deposit Required: $1000
                                    </h6>
                                    <div className="input-field col s12">
                                        <text
                                            error={errors.products_cd}
                                            className={classnames("", {
                                                invalid: errors.products_cd
                                            })}
                                        />
                                        <span className="red-text">
                                            <b>{errors.products_cd}</b>
                                        </span>
                                    </div>
                                    <button id="CD"
                                            onClick={this.onEnrollClick.bind(this)}
                                            className="btn btn-small waves-effect waves-light hoverable blue accent-3"
                                    >
                                        <b>Enroll</b>
                                    </button>

                                </div>
                            </div>
                            <div class="column">
                                <div class="card">
                                    <h5 className="card-title">IRA CD</h5>
                                    <p> An individual retirement account (IRA) CD let’s you save for retirement without
                                        going through your employer.</p>
                                    <h6>
                                        Get started with a IRA CD account today!
                                    </h6>
                                    <p><i> Minimum Deposit Required: $2500</i>
                                    </p>
                                    <div className="input-field col s12">
                                        <text
                                            error={errors.products_ira_cd}
                                            className={classnames("", {
                                                invalid: errors.products_ira_cd
                                            })}
                                        />
                                        <span className="red-text">
                                            <b>{errors.products_ira_cd}</b>
                                        </span>
                                    </div>
                                    <button id="IRA_CD"
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
            </div>
        )
            ;
    }
}

function populateComboBox() {

    var x, i, j, selElmnt, a, b, c;
    /* Look for any elements with the class "custom-select": */
    x = document.getElementsByClassName("document-type-select");
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
                    if (s.options[i].innerHTML === this.innerHTML) {
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
            const documentComboBox = document.getElementById("document-combo-box");
            console.log("Combobox value changed: " +
                documentComboBox.options[documentComboBox.selectedIndex].text);
            window.newDocument = documentComboBox.options[documentComboBox.selectedIndex].text;

            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
        });
    }
}

// function getDateTimeString(date) {
//
//     var month = date.getMonth().toString();
//     var day = date.getDay();
//     var year = date.getFullYear();
//     var hours = date.getHours();
//     var minutes = date.getMinutes();
//     var seconds = date.getSeconds();
//
//     if (minutes < 10) {
//         minutes = "0" + minutes;
//     } else {
//         minutes.toString();
//     }
//
//     var dateTime = String.format("%s/%s/%s %s:%s:%s", month, day, year, hours, minutes, seconds);
//     return dateTime;
// }

function closeAllSelect(elmnt) {
    /* A function that will close all select boxes in the document,
    except the current select box: */
    var x, y, i, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    for (i = 0; i < y.length; i++) {
        if (elmnt === y[i]) {
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
    getUserData
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);
