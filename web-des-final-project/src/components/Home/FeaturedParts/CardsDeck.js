import React, { Component } from "react";
import Pagination from "../../Navigation/Pagination/Pagination";
import Card from "react-bootstrap/Card";
import img1 from "../../../assets/images/fp8.jpg";
import img2 from "../../../assets/images/fp1.jpeg";
import img3 from "../../../assets/images/fp2.jpeg";
import img4 from "../../../assets/images/fp3.jpeg";
import img5 from "../../../assets/images/fp4.jpeg";
import img6 from "../../../assets/images/fp5.jpeg";
import img7 from "../../../assets/images/fp6.jpeg";
import img8 from "../../../assets/images/fp7.jpeg";
import img9 from "../../../assets/images/fp9.jpg";
import img10 from "../../../assets/images/fp10.jpg";
import "./CardsDeck.css";

class CardsDeck extends Component {
  state = {
    activePage: 1,
    totalNum: 9,
    productsPerPage: 5,
    products: [
      {
        title: "Brake Assembly",
        description:
          "A carrier with piston and piston cup seal, a pressure plate and an auxiliary stator plate.",
        image: img1,
      },
      {
        title: "Nose Wheel Assembly",
        description:
          "This wheel design consists of two halves bolted together with a tire mounted and ultimately mounted to the nose gear fork",
        image: img2,
      },
      {
        title: "Main Wheel Assembly",
        description:
          "The outboard wheel half bolts to the inboard wheel half to make up the wheel assembly upon which the tire is mounted.",
        image: img3,
      },
      {
        title: "Trim Actuator Assembly",
        description:
          "The threaded rod end fractured and separated from the actuator assembly which then jammed the elevator assembly.",
        image: img4,
      },
      {
        title: "HPT Disk Assembly",
        description:
          "It gives the power to drive the compressor and contains 2 disk assemblies with HPT cooling plates.",
        image: img5,
      },
      {
        title: "Flap Actuator",
        description:
          "Located on each wing using rotating screws, they are used to maintain efficient flight at low air speeds.",
        image: img6,
      },
      {
        title: "Radio Tuning",
        description:
          "It supports aircraft's sport integrated flight deck with active frequency of 123.5 MHz and a standby frequency of 121.5 MHz.",
        image: img7,
      },
      {
        title: "Anti-Ice Valve",
        description:
          "Aircraft de-icing control valves help manage the system when it is not in use by venting system air, and blocking venting during the airplane’s de-icing process.",
        image: img8,
      },
      {
        title: "Trim Actuator Assembly",
        description:
          "An assembly for manual control of an actuator for controlling the position of a moveable surface comprising of manual control element.",
        image: img9,
      },
      {
        title: "Dry Air Pump",
        description:
          "overhauled Tempest dry air pumps come with our patented WIP™ (Wear Indicator Port) that allows for internal observation of the pump’s vanes.",
        image: img10,
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
          <Card.Img variant="top" src={currentProducts[i].image} />
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
