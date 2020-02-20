import React, { useState, useEffect } from 'react';
import GlobablConfig from '../../configs/Global'
import Rotas from '../../configs/Routes';

function Home() {
  const [rotas, setRotas] = useState();

  useEffect(() => {        
    Rotas().then(res => {
      setRotas(res)
    });
  }, [])

  return (
    <main className="App col-12 row" 
      style={{height:'100vh', alignItems:'center', display:'flex', flexFlow:'row wrap',
      justifyContent:'space-between'}}>
      <section className="col-6"
        style={{height:'80vh'}}>
        <section className="col-8">
          <img style={{borderRadius:'50%', maxHeight:'50vh', maxWidth:'50vh'}} src='https://images3.alphacoders.com/103/thumb-1920-1037579.jpg'/>
        </section>
      </section>
      <section className="col-6" 
        style={{height:'80vh', borderLeft:"1px solid black"}}>
        <section className="col-8">
          <form>
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" class="form-control" id="exampleInputPassword1"/>
            </div>
            <div class="form-group form-check">
              <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
              <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </section>
      </section>
    </main>
  );
}

export default Home;
