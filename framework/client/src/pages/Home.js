import React from 'react';

const Home = () => {
  return (
    <>
      {/* Header */}
      <header>
        <div className="homepage">
          <img src="/smoothie.png" alt="" />
        </div>
        <div className="headings">
          <h2>Welcome</h2>
          <h3>Improve your sitting posture.</h3>
          <a href="/smoothies" className="btn">Enter</a>
        </div>
      </header>

      {/* Footer */}
      <footer>
        {/* Content for footer */}
      </footer>
    </>
  );
};

export default Home;
