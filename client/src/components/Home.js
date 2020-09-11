import React from 'react';
import '../stylesheets/Home.css';
import FooterLarge from './FooterLarge';


function Home() {
    return(
        <React.Fragment>
        <div id="homePage">
            <img src="\honey_bee_lifecycle.png" width="50%" alt="Honey bee lifecycle"/>
        </div>
        <FooterLarge/>
        </React.Fragment>
    )
}

export default Home;