import { Component } from "react";
import { useParams } from "react-router";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";

class Details extends Component {
  state = {
    loading: true,
    showModal: false,
  };

  async componentDidMount() {
    const response = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.params.id}`,
    );
    const data = await response.json();
    this.setState(Object.assign({ loading: false }, data.pets[0]));
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    if (this.state.loading) {
      return <h2> Loading!</h2>;
    }
    const { name, animal, breed, description, city, state, images, showModal } = this.state;
    
    return (
      <div className="details">
        <div>
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {city}, {state}
          </h2>
          <ThemeContext.Consumer>
            {([theme]) => {
              return (
                <button
                  onClick={this.toggleModal}
                  style={{ backgroundColor: theme }}
                >
                  Adopt {name}!
                </button>
              );
            }}
          </ThemeContext.Consumer>

          <p>{description}</p>
          {showModal ?
          (<Modal>
            <div>
              <h2>Would you like to adopt {name}?</h2>
              <div className="buttons">
                <a href="https://bit.ly/pet-adopt" className="modal_button">Yes</a>
                <button onClick={this.toggleModal}>No</button>
              </div>
            </div>
          </Modal>) : null}
        </div>
        <Carousel images={images} />
      </div>
    );
  }
}

function WrappedDetails() {
  const params = useParams();
  return (
    <ErrorBoundary>
      <Details params={params} />
    </ErrorBoundary>
  );
}

export default WrappedDetails;
