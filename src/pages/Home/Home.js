import React from 'react';
import './Home.css';

function Home() {
  return (
    <main className='container-fluid p-0 m-0 main-container'>
      <div className="container pt-5">
        <h2 className="mb-4" id='title'>Welcome to DevOpsDocker</h2>
        <p className="lead mx-auto">
          DevOpsDocker is your one-stop solution for DevOps utilities. Explore our networking tools,
          CIDR calculators, and much more to streamline your DevOps workflows.
        </p>
        {/* Add more content about features here */}
      </div>
    </main>
  );
}

export default Home;