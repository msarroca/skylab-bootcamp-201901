import React, { Component, Fragment } from "react";
import pokemonApi from "../../apipokemon";
import './index.sass'
import ItemResult from "../ItemResult";


class PokemonSearch extends Component {
  state = { pokemons: [], searchText: "", loading: true };

  componentDidMount() {
    pokemonApi.searchAllPokemons().then(pokemons => {
      this.setState({ pokemons, loading: false })
    });
  }

  handleChange = event => {
    this.setState({
      searchText: event.target.value
    });
  };

  renderList = () => {
    const {props : {onPokemonDetail}} = this
    
    return <ul className='pokemon__ul'>
      {
        this.state.pokemons
          .filter(pokemon => pokemon.name.includes(this.state.searchText))
          .map(pokemon => <ItemResult stringPokemonId = {pokemon.url} pokemonName={pokemon.name} onGoToDetails={onPokemonDetail} />)
      }
    </ul>

    }

  render() {

    
    return (
      <div>
        {/* <img src={titleImage} alt="poke_title"></img> */}
        <h2 className='title__search'>Search Pokemon</h2>
        <div>
          <input className="input__searchPokemon"
            onChange={this.handleChange}
            type="text"
            placeholder="Search your Pokemon by name"
          />
          {
            this.state.loading && <h1>LOADING</h1>
          }
          {
            this.state.searchText !== "" && this.renderList()
          }
        </div>
      </div>
    );
  }
}

export default PokemonSearch;
