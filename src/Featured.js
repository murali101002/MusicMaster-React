import React, {Component} from 'react';
import './styles.css';

class Featured extends Component{
    render(){
        const albums = this.props.featured;
        console.log(albums);
        return(
            <div >
                <div className='album-title'>
                    Featured Albums
                </div>
                {
                    albums.map((album,index)=>{
                        const img = album.images[0].url;
                        return(
                            <div key={index} className='album'>
                                <img 
                                    className='album-img'
                                    src={img} 
                                    alt={album.name}
                                />
                                <p className='album-name'>{album.name}</p>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}
export default Featured;