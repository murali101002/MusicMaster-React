import React, {Component} from 'react';
import './styles.css';

class Profile extends Component{
    render(){
        let artist = {name:'',followers:{total:''}, images:[{url:'http://via.placeholder.com/'}], genres:[]};
        artist = this.props.artist!==null?this.props.artist:artist;
        const genres = artist.genres;
        let followers = +artist.followers.total;
        followers = followers>999999999?
                        Math.ceil((followers/1000000000))+'B':
                        followers>999999?
                            Math.ceil((followers/1000000))+'M':
                            followers>999?
                                Math.ceil((followers/1000))+'K':
                                followers;
        return(
            <div className="profile">
                <img className='profile-img' src={artist.images[0].url} alt="Profile"/>
                <div className='profile-info'>
                    <div className='profile-name'>{artist.name}</div>
                    <div className='profile-followers'>{followers} followers</div>
                    <div className='profile-genres'>
                        {genres.map((genre, index)=>{
                            genre = genre!==genres[genres.length-1]?`${genre}, `:`& ${genre}`;
                            return <span key={index}>{genre}</span>
                        })}
                    </div>
                </div>
            </div>
        );
    }
}
export default Profile;