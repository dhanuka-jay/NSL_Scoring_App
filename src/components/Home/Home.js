import React from 'react'

const Home = () => {
    return (
        <div className="home-container">
            <div className="main-border"></div>
            <section id="showcase">
                <div className="container">
                    <h2>Welcome to</h2>
                    <h1>Northside Legends Cricket Club</h1>
                </div>
            </section>
            <div className="main-border"></div>
            <section id="newsletter">
                <div className="container">
                    <h1>Subscribe to our Newsletter</h1>
                    <form>
                        <input type="email" placeholder="Enter Email"/>
                        <button type="submit" className="button_1">Subscribe</button>
                    </form>
                </div>
            </section>
            <div className="main-border"></div>
        </div>
    )
}

export default Home
