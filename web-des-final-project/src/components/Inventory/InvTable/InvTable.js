import React, { Component } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Pagination from "../../Navigation/Pagination/Pagination";
import BootstrapTable from "react-bootstrap-table-next";
import _ from "lodash";
import Aux from "../../../hoc/Aux/Aux";
import Spinner from "react-bootstrap/Spinner";
import UserInfo from "../../../UserInfo/UserInfo";
import Modal from "react-bootstrap/Modal";
import CartInfo from "../../../CartInfo/CartInfo";
import "../../../../node_modules/react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "./InvTable.css";

class InvTable extends Component {
  state = {
    tblData: [],
    columns: [
      {
        dataField: "serialNo",
        text: "Serial Number",
      },
      {
        dataField: "modelNo",
        text: "Model Number",
      },
      {
        dataField: "description",
        text: "Description",
      },
      {
        dataField: "price",
        text: "Price (USD)",
      },
      {
        dataField: "category",
        text: "Category",
      },
    ],
    activePage: 1,
    itemsPerPage: 10,
    checkoutData: [],
    loading: true,
    error: null,
    specification: "Please select a part to view specifications",
    userObj: null,
    showModal: false,
    partSelected: null,
  };

  componentDidMount() {
    this.getInventory();
    this.setState({ userObj: UserInfo.getUserInfoObj() });
  }

  getInventory = () => {
    axios
      .get("/getinventory")
      .then((resp) =>
        this.setState({ tblData: resp.data, loading: false, error: null })
      )
      .catch((error) => this.setState({ loading: false, error: error }));
  };

  paginationHandler = (e) => {
    if (e.target.text) {
      this.setState({ activePage: e.target.text });
    }
  };

  singleSelectHandler = (row, isSelect) => {
    this.setState({ partSelected: row.specification });
    let checkoutData = [];
    if (this.state.checkoutData) {
      checkoutData = [...this.state.checkoutData];
    }
    let tblData = [...this.state.tblData];
    if (!isSelect) {
      checkoutData = checkoutData.filter(function (value) {
        return value.serialNo !== row.serialNo || value.modelNo !== row.modelNo;
      });
    } else {
      let test = _.filter(tblData, {
        serialNo: row.serialNo,
        modelNo: row.modelNo,
      });
      if (checkoutData) {
        checkoutData.push(test[0]);
      }
    }
    this.setState({ checkoutData: checkoutData });
  };

  allSelectHandler = (isSelect, rows) => {
    let checkoutData = [];
    if (this.state.checkoutData) {
      checkoutData = [...this.state.checkoutData];
    }
    if (isSelect) {
      rows.map((row) => {
        return checkoutData.push(row);
      });
    } else {
      rows.forEach((row) => {
        let i = checkoutData.findIndex(
          (r) => r.serialNo === row.serialNo && r.modelNo === row.modelNo
        );
        if (i >= 0) checkoutData.splice(i, 1);
      });
    }
    this.setState({ checkoutData: checkoutData });
  };

  buttonClickHandler = () => {
    let userObj = { ...this.state.userObj };
    if (!userObj.fName) {
      this.setState({ showModal: true });
    } else {
      this.setState({ showModal: false });
      const checkoutData = [...this.state.checkoutData];
      let price = _.sumBy(checkoutData, function (item) {
        return item.price;
      });
      const payload = {
        items: checkoutData,
        price: price,
      };
      CartInfo.setCartObjs(payload);
      this.props.history.push("/checkout");
    }
  };

  modalHide = () => {
    this.setState({ showModal: false });
  };

  render() {
    let currentTblRows = null;
    let selectRow = null;
    let expandRow = null;
    if (!this.state.loading) {
      const indexOfLastItem = this.state.activePage * this.state.itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - this.state.itemsPerPage;
      const data = [...this.state.tblData];
      currentTblRows = data.slice(indexOfFirstItem, indexOfLastItem);
      selectRow = {
        mode: "checkbox",
        clickToExpand: true,
        clickToSelect: false,
        onSelect: this.singleSelectHandler,
        onSelectAll: this.allSelectHandler,
        style: { background: "#d7f0d3" },
      };
      expandRow = {
        onlyOneExpanding: true,
        renderer: (row, rowIndex) => {
          return (
            <div style={{ marginLeft: "1em" }}>
              <p className="inv-specs">Specifications:</p>
              {Object.keys(row.specification).map((key) => (
                <p className="inv-specs-text" key={key}>
                  <b>{key}:</b>&nbsp;&nbsp;
                  {row.specification[key]}
                </p>
              ))}
            </div>
          );
        },
      };
    }

    return (
      <Aux>
        <div className="inv-tbl-wrapper">
          {this.state.loading ? (
            <div style={{ margin: "5em 0em 5em 45em", color: "#581845" }}>
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <Aux>
              <div>
                <div className="inv-tbl-wrapper">
                  <Pagination
                    totalItems={this.state.tblData.length}
                    itemsPerPage={this.state.itemsPerPage}
                    activeItem={this.state.activePage}
                    clicked={(e) => this.paginationHandler(e)}
                  />
                  <p style={{ color: "#737373" }}>
                    <b>
                      <i>(Click on a product to view specifications)</i>
                    </b>
                  </p>
                  <BootstrapTable
                    keyField="serialNo"
                    data={currentTblRows}
                    columns={this.state.columns}
                    hover
                    striped
                    wrapperClasses="table-responsive"
                    expandRow={expandRow}
                    selectRow={selectRow}
                    // rowEvents={rowEvents}
                  />
                </div>
                <Modal
                  {...this.props}
                  show={this.state.showModal}
                  onHide={() => this.modalHide()}
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                      <i
                        style={{
                          display: "inline-block",
                          color: "#c41f14",
                          marginRight: "20px",
                        }}
                        className="fas fa-exclamation-triangle fa-lg"
                      ></i>
                      <span className="inv-modal-title">
                        <h4
                          style={{ display: "inline-block", color: "#c41f14" }}
                        >
                          Error
                        </h4>
                      </span>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="inv-tbl-body">
                      <p style={{ color: "#424242" }}>
                        You are currently not <i>signed in</i>.
                      </p>
                      <p style={{ color: "#424242" }}>
                        Please sign in or register to checkout.
                      </p>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.props.onHide} id="modal-close-btn">
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </Aux>
          )}
        </div>
        <div style={{ textAlign: "center" }}>
          <Button
            id="inv-tbl-btn"
            onClick={this.buttonClickHandler}
            disabled={this.state.checkoutData.length ? false : true}
          >
            <span id="inv-tbl-btn-txt">Checkout</span>
            <Badge id="inv-tbl-btn-badge">
              {this.state.checkoutData.length}
            </Badge>
          </Button>
        </div>
      </Aux>
    );
  }
}

export default InvTable;
