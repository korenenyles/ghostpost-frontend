import React from 'react';
import './App.css';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      post: [],
      
    }
    
  }

  componentDidMount(){
    fetch('http://localhost:8000/Post')
    .then(res => res.json())
    .then(res => this.setState({post: res}))
  }
  
  handleClickAllPosts=(event)=>{
    fetch('http://localhost:8000/Post')
    .then(res => res.json())
    .then(res => this.setState({post: res}))
  }
  
  handleClickBoast = (event) => {
    fetch('http://127.0.0.1:8000/Post/boast/')
    .then(res => res.json())
    .then(res => this.setState({post: res}))
  }

  handleClickRoast = (event) => {
    fetch('http://127.0.0.1:8000/Post/roast/')
    .then(res => res.json())
    .then(res => this.setState({post: res}))
  }

  handleHighestVote = (event) => {
    fetch('http://127.0.0.1:8000/Post/highestvotes/')
    .then(res => res.json())
    .then(res => this.setState({post: res}))
  }
  // Kano Marvel assisted with debugging my handup
  handleUpVote = (id) => {
    let responseBody ={
      method: "POST",
    }
    fetch(`http://localhost:8000/Post/${id}/upvotes/`, responseBody)
    this.handleClickAllPosts()
  }

  handleDownVote = (id) => {
    let responseBody ={
      method: "POST",
    }
    fetch(`http://localhost:8000/Post/${id}/downvotes/`, responseBody)
    this.handleClickAllPosts()
  }

  

  render() {
    
    return (
      <div className="App">
        <h1>Boast or Roast</h1>
        <button onClick={this.handleClickAllPosts}>Home</button>
        <button onClick={this.handleClickBoast}> Boasts</button>
        <button onClick={this.handleClickRoast}> Roasts</button>
        <button onClick={this.handleHighestVote}> Highest Votes</button>
        {this.state.post.map((p) => {
          return (
            <ul>
              <li>
          
              Total Votes: {p.results} <br/>
              Post: {p.post_title}<br/>
              Date: {p.date}<br/>
              Body: {p.body}<br/>
          <button onClick={()=>this.handleUpVote(p.id)}>UpVote {p.upvotes}</button>
          <button onClick={()=>this.handleDownVote(p.id)}>DownVote {p.downvotes}</button>
          <br/>

              </li>
            
             
            </ul>
          )
        }
        )}
        
      </div>
    );
  }
}

export default App;
