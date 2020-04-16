import React, { Component } from "react";
import axios from "axios";
import _ from "lodash";
import { aux1 as Aux } from "../../hoc/Aux1/Aux1";
import Button from "react-bootstrap/Button";
import Pagination from "../Navigation/Pagination/Pagination";
import BootstrapTable from "react-bootstrap-table-next";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Dashboard.css";

class AdminViewUpdate extends Component {
  state = {
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
    specification: "Please select a part to view specification",
    showModal: false,
    partSelected: null,
    error: null,
    adminErrors: {
      serialNo: "",
      modelNo: "",
      description: "",
      price: "",
      category: "",
      specification: "",
      property: "",
      value: "",
    },
    specsLength: 0,
    specsValue: [],
    tableRefresh: false,
  };

  singleSelectHandler = (row, isSelect) => {
    this.setState({ partSelected: row });
  };

  paginationHandler = (e) => {
    if (e.target.text) {
      this.setState({ activePage: e.target.text });
    }
  };

  buttonClickHandler = () => {
    let part = { ...this.state.partSelected };
    let specs = part.specification;
    let specsValue = [...this.state.specsValue];
    let len = Object.keys(specs).length;
    Object.keys(specs).map((key) => {
      let obj = { [key]: specs[key] };
      specsValue.push(obj);
    });
    this.setState({
      showModal: true,
      specsLength: len,
      specsValue: specsValue,
    });
  };

  deleteButtonClickHandler = () => {
    axios({
      url: "/deletepart",
      method: "DELETE",
      data: { _id: this.state.partSelected._id },
    })
      .then((resp) => {
        this.setState({ tableRefresh: true });
        setTimeout(() => {
          this.setState({ tableRefresh: false });
          this.props.tblUpdate();
        }, 2000);
      })
      .catch((err) => console.log(err));
  };

  modalHide = (bool) => {
    this.setState({ showModal: bool, specsLength: 0, specsValue: [] });
  };

  adminUpdateSubmitHandler = async (e) => {
    e.preventDefault();
    if (!this.invalidAdminCreateDetails()) {
      let payload = { ...this.state.partSelected };
      let specs = [...this.state.specsValue];
      let obj = payload.specification;
      obj = {};
      for (var i = 0; i < specs.length; i++) {
        _.merge(obj, specs[i]);
      }
      payload.specification = obj;
      let res = await this.adminUpdatePart(payload);
      if (res) {
        this.setState({ tableRefresh: true });
        setTimeout(() => {
          this.props.tblUpdate();
          this.setState({ tableRefresh: false });
        }, 2000);
      } else {
        console.log("fail");
      }
      console.log(payload);
    } else {
      console.log("form invalid");
    }
  };

  adminUpdatePart = async (payload) => {
    let res = true;
    await axios({
      url: "/updatepart",
      method: "PUT",
      data: payload,
    })
      .then((resp) => {
        console.log("success");
      })
      .catch((err) => {
        res = false;
        console.log(err.response);
      });
    return res;
  };

  invalidAdminCreateDetails = () => {
    var adminErrors = { ...this.state.adminErrors };
    var payload = { ...this.state.partSelected };
    let specs = [...this.state.specsValue];
    let error = false;
    if (payload.serialNo === null || payload.serialNo === "") {
      adminErrors.serialNo = "Please enter a valid serial number.";
    }
    if (payload.modelNo === null || payload.modelNo === "") {
      adminErrors.modelNo = "Please enter a valid model number.";
    }
    if (payload.description === null || payload.description === "") {
      adminErrors.description = "Please enter a valid description.";
    }
    if (payload.price === null || payload.price === "") {
      adminErrors.price = "Please enter a valid price.";
    }
    if (payload.category === null || payload.category === "") {
      adminErrors.category = "Please enter a valid category.";
    }
    if (specs.length === 0) {
      adminErrors.specification = "Please add specifications";
    } else {
      for (var i = 0; i < specs.length; i++) {
        for (var key in specs[i]) {
          if (
            !specs[i].hasOwnProperty(key) ||
            key === "" ||
            specs[i][key] === ""
          ) {
            adminErrors.specification = "Please add specifications";
          } else {
            if (specs[key] === "" || specs[key] === null) {
              adminErrors.specification = "Please add specifications";
            }
          }
        }
      }
    }
    this.setState({ adminErrors: adminErrors });
    Object.keys(adminErrors).map((k) => {
      if (adminErrors[k].length > 0) {
        error = true;
      }
    });
    return error;
  };

  adminUpdateChangeHandler = (e) => {
    const { name, value } = e.target;
    if (name !== "property" || name !== "value") {
      let adminErrors = { ...this.state.adminErrors };
      let payload = { ...this.state.partSelected };
      payload[name] = value;
      this.setState({ partSelected: payload });

      switch (name) {
        case "serialNo":
          adminErrors.serialNo =
            value.trim() === null || value.trim() === ""
              ? "Please enter a valid serial number."
              : "";
          break;
        case "modelNo":
          adminErrors.modelNo =
            value.trim() === null || value.trim() === ""
              ? "Please enter a valid model number."
              : "";
          break;
        case "price":
          adminErrors.price = this.invalidPrice(value)
            ? "Please enter a valid price."
            : "";
          break;
        case "description":
          adminErrors.description =
            value.trim() === null || value.trim() === ""
              ? "Please enter a valid description."
              : "";
          break;
        case "category":
          adminErrors.category =
            value.trim() === null || value.trim() === ""
              ? "Please enter a valid category."
              : "";
          break;
      }
      this.setState({ adminErrors: adminErrors });
    }
  };

  invalidPrice = (price) => {
    var reg = /^\d{0,8}(\.\d{1,4})?$/;
    return !reg.test(price);
  };

  specsLengthHandler = () => {
    this.setState((prevState) => {
      return { specsLength: prevState.specsLength + 1 };
    });
  };

  specsAddHandler = (e) => {
    let { name, value } = e.currentTarget;
    let index = e.currentTarget.dataset.id;
    let specs = [...this.state.specsValue];
    let errors = { ...this.state.adminErrors };
    errors.specification = "";
    let obj = specs[index];
    if (name === "property") {
      if (obj) {
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            Object.defineProperty(
              obj,
              value,
              Object.getOwnPropertyDescriptor(obj, key)
            );
            delete obj[key];
            specs[index] = obj;
          }
        }
      } else {
        obj = { [value]: null };
        specs[index] = obj;
      }
    } else {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          obj[key] = value;
          specs[index] = obj;
        }
      }
    }
    this.setState({ specsValue: specs, adminErrors: errors });
  };

  render() {
    let currentTblRows = null;
    let selectRow = null;
    let expandRow = null;
    let modalBody = "";
    let specs = [];
    let specsValue = [...this.state.specsValue];
    if (!this.props.loading) {
      const indexOfLastItem = this.state.activePage * this.state.itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - this.state.itemsPerPage;
      const data = [...this.props.tblData];
      currentTblRows = data.slice(indexOfFirstItem, indexOfLastItem);
      selectRow = {
        mode: "radio",
        clickToExpand: true,
        clickToSelect: false,
        onSelect: this.singleSelectHandler,
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
      modalBody = this.state.tableRefresh ? (
        <Aux>
          <div
            style={{
              margin: "25%",
              textAlign: "center",
              color: "#581845",
            }}
          >
            <Spinner animation="border" role="status"></Spinner>
            <h3>We're refreshing your data...</h3>
          </div>
        </Aux>
      ) : (
        <Aux>
          <Form noValidate onSubmit={this.adminUpdateSubmitHandler}>
            <Form.Row>
              <Form.Group as={Col} lg="6" xs="12" controlId="createSerialNo">
                <Form.Label className="dashboard-form-label">
                  Serial Number:
                </Form.Label>
                <Form.Control
                  onChange={this.adminUpdateChangeHandler}
                  required
                  name="serialNo"
                  isInvalid={this.state.adminErrors.serialNo}
                  value={
                    this.state.partSelected
                      ? this.state.partSelected.serialNo
                      : ""
                  }
                  placeholder="Serial Number"
                />
                <span className="errorMessage">
                  {this.state.adminErrors.serialNo
                    ? this.state.adminErrors.serialNo
                    : ""}
                </span>
              </Form.Group>
              <Form.Group as={Col} lg="6" xs="12" controlId="updateModelNo">
                <Form.Label className="dashboard-form-label">
                  Model Number:
                </Form.Label>
                <Form.Control
                  onChange={this.adminUpdateChangeHandler}
                  required
                  name="modelNo"
                  isInvalid={this.state.adminErrors.modelNo}
                  value={
                    this.state.partSelected
                      ? this.state.partSelected.modelNo
                      : ""
                  }
                  placeholder="Model Number"
                />
                <span className="errorMessage">
                  {this.state.adminErrors.modelNo
                    ? this.state.adminErrors.modelNo
                    : ""}
                </span>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} lg="4" xs="12" controlId="updateDescription">
                <Form.Label className="dashboard-form-label">
                  Description:
                </Form.Label>
                <Form.Control
                  onChange={this.adminUpdateChangeHandler}
                  required
                  name="description"
                  isInvalid={this.state.adminErrors.description}
                  value={
                    this.state.partSelected
                      ? this.state.partSelected.description
                      : ""
                  }
                  placeholder="Description"
                />
                <span className="errorMessage">
                  {this.state.adminErrors.description
                    ? this.state.adminErrors.description
                    : ""}
                </span>
              </Form.Group>
              <Form.Group as={Col} lg="4" xs="12" controlId="updatePrice">
                <Form.Label className="dashboard-form-label">Price:</Form.Label>
                <Form.Control
                  onChange={this.adminUpdateChangeHandler}
                  required
                  name="price"
                  isInvalid={this.state.adminErrors.price}
                  value={
                    this.state.partSelected ? this.state.partSelected.price : ""
                  }
                  placeholder="Price"
                />
                <span className="errorMessage">
                  {this.state.adminErrors.price
                    ? this.state.adminErrors.price
                    : ""}
                </span>
              </Form.Group>
              <Form.Group as={Col} lg="4" xs="12" controlId="updateCategory">
                <Form.Label className="dashboard-form-label">
                  Category:
                </Form.Label>
                <Form.Control
                  onChange={this.adminUpdateChangeHandler}
                  required
                  name="category"
                  isInvalid={this.state.adminErrors.category}
                  value={
                    this.state.partSelected
                      ? this.state.partSelected.category
                      : ""
                  }
                  placeholder="Category"
                />
                <span className="errorMessage">
                  {this.state.adminErrors.category
                    ? this.state.adminErrors.category
                    : ""}
                </span>
              </Form.Group>
            </Form.Row>
            <Form.Group as={Col} controlId="updateSpecification">
              <Form.Label className="dashboard-form-label">
                Specifications:
              </Form.Label>
              <Button
                className="dashboard-edit-btn"
                onClick={this.specsLengthHandler}
                // style={{ float: "right" }}
              >
                <i class="fas fa-plus-circle" style={{ color: "green" }}></i>
              </Button>
              <span className="errorMessage">
                {this.state.adminErrors.specification
                  ? this.state.adminErrors.specification
                  : ""}
              </span>
              <div style={{ maxHeight: "200px", overflow: "auto" }}>
                {specs}
              </div>
            </Form.Group>
            <div style={{ textAlign: "center" }}>
              <Button className="sign-in-btn" type="submit">
                Update
              </Button>
            </div>
          </Form>
        </Aux>
      );

      if (this.state.specsLength > 0) {
        for (var i = 0; i < this.state.specsLength; i++) {
          let key = "";
          for (var k in specsValue[i]) {
            if (specsValue[i].hasOwnProperty(k)) {
              key = k;
            }
          }
          specs.push(
            <div
              style={{ margin: "2%", overflowX: "hidden", overflowY: "auto" }}
            >
              <Row key={i}>
                <Col lg="6" xs="6">
                  <Form.Control
                    data-id={i}
                    onChange={this.specsAddHandler.bind(this)}
                    name="property"
                    placeholder="Property"
                    value={specsValue[i] ? key : ""}
                  />
                </Col>
                <Col lg="6" xs="6">
                  <Form.Control
                    data-id={i}
                    onChange={this.specsAddHandler.bind(this)}
                    name="value"
                    placeholder="Value"
                    value={specsValue[i] ? specsValue[i][key] : ""}
                    disabled={key === "" || key === undefined || key === null}
                  />
                </Col>
                {/* <Col lg="1">
                    <Button
                      onClick={this.specsDeleteHandler.bind(this)}
                      data-id={i}
                      style={{ float: "right" }}
                      className="dashboard-view-order-btn"
                    >
                      <i
                        className="fas fa-minus-circle"
                        style={{
                          float: "right",
                          color: "red",
                        }}
                      />
                    </Button>
                  </Col> */}
              </Row>
            </div>
          );
        }
      }
    }
    return (
      <div className="inv-tbl-wrapper">
        {this.props.loading || this.state.tableRefresh ? (
          <div style={{ margin: "10%", textAlign: "center", color: "#581845" }}>
            <Spinner animation="border" role="status"></Spinner>
            <h3>We're refreshing your changes...</h3>
          </div>
        ) : (
          <Aux>
            <div>
              <div className="inv-tbl-wrapper">
                <Pagination
                  totalItems={this.props.tblData.length}
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
                show={this.state.showModal}
                onHide={() => this.modalHide(false)}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                size="lg"
              >
                <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-vcenter">
                    Update Information
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalBody}</Modal.Body>
                <Modal.Footer>
                  <Button
                    onClick={() => this.modalHide(false)}
                    id="modal-close-btn"
                  >
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
              <div style={{ textAlign: "center" }}>
                <Button
                  className="admin-update-btn"
                  onClick={this.buttonClickHandler}
                  disabled={this.state.partSelected === null}
                >
                  Update
                </Button>
                <Button
                  className="admin-update-btn"
                  onClick={this.deleteButtonClickHandler}
                  disabled={this.state.partSelected === null}
                >
                  Delete
                </Button>
              </div>
            </div>
          </Aux>
        )}
      </div>
    );
  }
}

export default AdminViewUpdate;
