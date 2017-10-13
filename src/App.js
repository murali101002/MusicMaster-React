import React, {Component} from 'react';
import './styles.css';
import {FormGroup, FormControl, Glyphicon, InputGroup} from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';
import Featured from './Featured';

class App extends Component{
    constructor(props){
        super(props);
        this.search = this.search.bind(this);
        this.state={
            query:"",
            artist:null, 
            tracks:[],
            featuredAlbums:[]
        };
    }
    search(){
        const ACCESS_KEY = {{API_KEY}};
        const BASE_URL = "https://api.spotify.com/v1/search?";
        let FETCH_URL = BASE_URL+"q="+this.state.query+"&type=artist"+"&limit=1";
        console.log(FETCH_URL);
        const ALBUM_URL = 'https://api.spotify.com/v1/artists';
        const FEATURE_URL = "https://api.spotify.com/v1/browse/featured-playlists?limit=10";
        let data = {
            method:"GET",
            headers:{
                'Authorization':'Bearer '+ACCESS_KEY
            },
            mode:'cors',
            cache:'default'
        };
        //fetching artist's profile
        fetch(FETCH_URL,data)
            .then(response=>response.json())
            .then(json=>{
                const artist = json.artists.items[0];
                this.setState({artist});
                console.log('this.state',this.state);
                FETCH_URL = `${ALBUM_URL}/${artist.id}/top-tracks?country=US&`;
                console.log(FETCH_URL);
                //fetching artist's top tracks
                fetch(FETCH_URL,data)
                    .then(response=>response.json())
                    .then(json=>{
                        const{ tracks } = json;
                        this.setState({tracks});
                        console.log(tracks);
                        fetch(FEATURE_URL,data)
                            .then(response=>response.json())
                            .then(json=>{
                                const{items} = json.playlists;
                                this.setState({
                                    featuredAlbums:items
                                });
                            })
                            .catch(err=>console.log(err));
                    })
                    .catch(err=>console.log(err));
            })
            .catch(err=>console.log(err));
        
        
        
    }
    componentDidMount(){
        this._text.focus();
    }
    render(){
        return(
            <div className='App'>
                <div className="app-title">
                    Music Master
                </div>
                <div>
                    <FormGroup>
                        <InputGroup>
                            <FormControl
                                type="text"
                                placeholder="Search for an artist"
                                inputRef={(ref)=>{this._text=ref}}
                                onChange={event=>this.setState({query:event.target.value})}
                                onKeyPress={event=>{
                                    if(event.key==='Enter'){
                                        this.search();
                                    }
                                }}
                            />
                            <InputGroup.Addon
                                onClick={this.search}
                            >
                                <Glyphicon glyph="search"/>
                            </InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>
                </div>
                {
                    this.state.artist!==null?
                        <div>
                            <Profile artist={this.state.artist}/>
                            <Gallery tracks={this.state.tracks} />
                            <Featured featured={this.state.featuredAlbums} />
                        </div>
                        :
                        <div></div>
                }
            </div>
            
        );
    }
}
export default App;
