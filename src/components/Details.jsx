import { Component } from "react";
import { useParams } from "react-router";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";

//Component po czym dziedziczy = extends dziedziczenie innej klasy plub dowiazanie prototypowe
class Details extends Component {
  //pole klasy, ale aby uzyc uzywamy formy this.state
  state = {
    loading: true,
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
  render() {
    if (this.state.loading) {
      return <h2> Loading!</h2>;
    }
    const { name, animal, breed, description, city, state, images } =
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
                <button style={{ backgroundColor: theme }}>Adopt {name}!</button>
              );
            }}
          </ThemeContext.Consumer>

          <p>{description}</p>
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
