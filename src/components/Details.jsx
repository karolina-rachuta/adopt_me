import { Component } from "react";
import { useParams } from "react-router";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";

//Component po czym dziedziczy = extends dziedziczenie innej klasy plub dowiazanie prototypowe
class Details extends Component {
  //pole klasy, ale aby uzyc uzywamy formy this.state
  state = {
    loading: true,
    showModal: false,
  };

  async componentDidMount() {
    const response = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.params.id}`,
    );
    const data = await response.json();
    // this.setState({loading: false, ...data.pets[0]});
    // Object.assing - przyjmuje obiekt(param1) i dolacza do niego drugi obiekt(param2) - uzywa sie do nadpisywani aobiektow
    this.setState(Object.assign({ loading: false }, data.pets[0]));
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    if (this.state.loading) {
      return <h2> Loading!</h2>;
    }
    const { name, animal, breed, description, city, state, images, showModal } =
      this.state;
    // triggerowanie bledu
    //throw new Error ("ghjhgerrror")
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
                <a href="https://bit.ly/pet-adopt">Yes</a>
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
// w react router 6 nie mozna w komponencie klasowym zczytywac parametrow z url, wiec uzywamy higher order component (funkcyjny):
function WrappedDetails() {
  const params = useParams();
  return (
    <ErrorBoundary>
      <Details params={params} />
    </ErrorBoundary>
  );
}

export default WrappedDetails;
