import React, { useState } from 'react';
import './Networking.css';
import CIDRContent from './CIDRContent';

function Networking() {
  const [ipAddress, setIpAddress] = useState('');
  const [error, setError] = useState('');
  const [apiResponse, setApiResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:5001/cidr/calculate-cidr', {
        method: 'POST',
        body: JSON.stringify({ cidr: ipAddress }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          if (res.status === 200) return res.json()
        })
        .then(async (data) => {
          if (data) {
            console.log(data)
            setApiResponse(data);
            setError('')
          } else {
            setApiResponse('')
            setError('Failed to fetch data');
          }
          setIpAddress('');
        })
    }
    catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className='container-fluid p-0 m-0 main-container'>
      <div className='container pt-5 cidr'>
        <h1 className='text-center font-bolder mb-3 cidr-title'>CIDR Calculator</h1>
        <form onSubmit={handleSubmit}>
          <div className='input-group mb-3'>
            <input
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
              type='text'
              className='form-control border-dark-subtle focus-ring focus-ring-secondary'
              placeholder='Enter CIDR'
              aria-label="CIDR address"
            />
            <button className='btn bg-secondary text-light' type='submit'>Calculate</button>
          </div>
        </form>

        {error && <p className="error">{error}</p>}
        
        <div className="output-box mb-5">
          <table className='table table-bordered'>
            {apiResponse &&
              <tbody>
                <tr>
                  <th>CIDR Subnet</th>
                  <td>{apiResponse.cidr}</td>
                </tr>
                <tr>
                  <th>Network Address</th>
                  <td>{apiResponse.result.networkAddress}</td>
                </tr>
                <tr>
                  <th>First Address</th>
                  <td>{apiResponse.result.firstAddress}</td>
                </tr>
                <tr>
                  <th>Last Address</th>
                  <td>{apiResponse.result.lastAddress}</td>
                </tr>
                <tr>
                  <th>Broadcast Address</th>
                  <td>{apiResponse.result.broadcastAddress}</td>
                </tr>
                <tr>
                  <th>Subnet Mask</th>
                  <td>{apiResponse.result.subnetMask}</td>
                </tr>
                <tr>
                  <th>Subnet Mask Length</th>
                  <td>{apiResponse.result.subnetMaskLength}</td>
                </tr>
                <tr>
                  <th>Num of Hosts</th>
                  <td>{apiResponse.result.numHosts}</td>
                </tr>
                <tr>
                  <th>Length</th>
                  <td>{apiResponse.result.length}</td>
                </tr>
              </tbody>
            }
          </table>

        </div>

        <CIDRContent />
      </div>
    </main>
  )
};


export default Networking;
