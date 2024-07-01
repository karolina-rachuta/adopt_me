import { Component } from "react";

class Carousel extends Component {
    state = {
        active: 0
    }

    //przyjda tu jakies propsy i ten props zostanie do nich dolozony
    static defaultProps = {
        images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
    }

    handleIndexClick = (event) => {
        //+ zamienia tekst na liczbe
        //this.setState nastawiony na event a nie na img - kiedy zwykla funcja
        //arrow function rozwiazuje
        this.setState({active: +event.target.dataset.index})
    }
    render() {
        const {active} = this.state;
        const {images} = this.props;

        return (
            <div className="carousel">
                <img src={images[active]} alt="animal" />
                <div className="carousel-smaller">
                    {images.map((image, index) => {
                        //czy indeks duzego obrazka active jest rowny indeksowi malego obrazka index
                        return <img src={image} data-index={index} alt="animal thumbnail" key= {image} className={active === index ? 'active' : ''} onClick={this.handleIndexClick}/>
                    })}
                </div>
            </div>
        )
    }
}


export default Carousel;
