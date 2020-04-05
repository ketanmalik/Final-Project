import React, { Component } from "react";
import Pagination from "../../Navigation/Pagination/Pagination";
import Card from "react-bootstrap/Card";
import "./CardsDeck.css";
import img from "../../../assets/images/brakeAssembly.jpg";

class CardsDeck extends Component {
  state = {
    activePage: 1,
    totalNum: 9,
    productsPerPage: 5,
    products: [
      {
        title: "Brake Assembly",
        description: "Some description about product",
      },
      {
        title: "Nose Wheel Assembly",
        description: "Some description about product",
      },
      {
        title: "Main Wheel Assembly",
        description: "Some description about product",
      },
      {
        title: "Trim Actuator Assembly",
        description: "Some description about product",
      },
      {
        title: "HPT Disk Assembly",
        description: "Some description about product",
      },
      { title: "Flap Actuator", description: "Some description about product" },
      { title: "Radio Tuning", description: "Some description about product" },
      {
        title: "Anti-Ice Valve",
        description: "Some description about product",
      },
      {
        title: "Trim Actuator Assembly",
        description: "Some description about product",
      },
    ],
  };

  paginationHandler = (e) => {
    if (e.target.text) {
      this.setState({ activePage: e.target.text });
    }
  };
  render() {
    const indexOfLastProduct =
      this.state.activePage * this.state.productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - this.state.productsPerPage;
    const products = [...this.state.products];
    const currentProducts = products.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );
    let cardsDeck = [];
    for (var i = 0; i < currentProducts.length; i++) {
      cardsDeck.push(
        <Card key={i} id="featured-product-card">
          <Card.Img variant="top" src={img} />
          <Card.Body>
            <Card.Title>{currentProducts[i].title}</Card.Title>
            <Card.Text>{currentProducts[i].description}</Card.Text>
          </Card.Body>
        </Card>
      );
    }
    return (
      <div className="cards-deck">
        <Pagination
          totalItems={this.state.totalNum}
          itemsPerPage={this.state.productsPerPage}
          activeItem={this.state.activePage}
          clicked={(e) => this.paginationHandler(e)}
        />
        <div className="cards-wrapper">{cardsDeck}</div>
      </div>
    );
  }
}

export default CardsDeck;
