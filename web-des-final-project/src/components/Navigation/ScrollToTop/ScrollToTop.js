import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import "./ScrollToTop.css";

class ScrollToTop extends Component {
  state = {
    isVisible: false,
  };

  componentDidMount() {
    var scrollComponent = this;
    document.addEventListener("scroll", (e) => {
      scrollComponent.toggleVisibility();
    });
  }

  toggleVisibility = () => {
    if (window.pageYOffset > this.props.yOffSet) {
      this.setState({
        isVisible: true,
      });
    } else {
      this.setState({
        isVisible: false,
      });
    }
  };

  scrollToTop = () => {
    window.scrollTo({
      top: this.props.topPos,
      behavior: "smooth",
    });
  };

  render() {
    return this.state.isVisible ? (
      <div>
        {this.props.children}
        <div className="btn-wrapper">
          <Button onClick={this.scrollToTop}>
            <i className="fas fa-chevron-up"></i>
          </Button>
        </div>
      </div>
    ) : (
      this.props.children
    );
  }
}

export default ScrollToTop;
