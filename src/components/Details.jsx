import { Component } from "react";
import { useParams } from "react-router";

//Component po czym dziedziczy = extends dziedziczenie innej klasy plub dowiazanie prototypowe
class Details extends Component {
  constructor() {
    super();

    //tylko jeden stan
    this.state = {
      loading: true,
    };
    //aby go zmodyfikowac uzywamy metody this.setState
  }

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
    const { name, animal, breed, description, city, state } = this.state;
    return (
      <div>
        <div>
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {city}, {state}
          </h2>
          <button>Adopt Me!</button>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}
// w react router 6 nie mozna w komponencie klasowym zczytywac parametrow z url, wiec uzywamy higher order component (funkcyjny):
function WrappedDetails() {
  const params = useParams();
  return <Details params={params} />;
}

export default WrappedDetails;