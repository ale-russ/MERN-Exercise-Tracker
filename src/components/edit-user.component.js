import React, {Component} from 'react';
import axios from 'axios';


class EditUser extends Component {
     constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.select = React.createRef();

        this.state = {
                 username:'',
                 users: [],
                 editUsername: true,
                 editableUserName: this.username
             }
         }
    
   componentDidMount(){
        axios.get('http://localhost:5000/users/'+this.props.match.params.id)
            .then(res => {
                this.setState({
                    username: res.data.username,
                })
            })
            .catch((error) =>{
                console.log(error)
            })


        axios.get('http://localhost:5000/users/')   
            .then(res => {
                if(res.data.length > 0){
                    this.setState({
                        users: res.data.map(user =>user.username),
                        
                    });
                }
            })
    }
    
    onChangeUsername = e =>{
        this.setState({
           username: e.target.value
        }); 
    }

    onSubmit(e){
        e.preventDefault();

        const users  = { 
            username : this.state.username,
        }

        console.log(users);

        axios.post('http://localhost:5000/users/update/'+this.props.match.params.id, users)
            .then(res => console.log(res.data));

        window.location ='/userlist/';
    }
    
    render() { 
        return (  
            <div>
                <h3>Edit Users</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref={this.select}
                                required
                                className="form-control"
                                value={this.state.username}
                                onChange={this.onChangeUsername}>
                                { 
                                    this.state.users.map((user) => {
                                        return <option 
                                        key={user}
                                        value={user}>{user}
                                        </option>
                                    })
                                }
                            </select>
                            {this.state.editUsername ?
                            <div className="form-group">
                                <label>Edit Username: </label>
                                <input  type="text"
                                        required
                                        className="form-control"
                                        value={this.state.editableUserName}
                                        onChange={this.onChangeUsername}
                                />
                                
                                <button onClick= {this.onChangeUsername} 
                                        className="btn btn-primary">
                                        Save Username
                                </button>
                            </div> 
                            :
                            null   
                        }
                    </div>
                    
                </form>
            </div>
        );
    }
}

export default EditUser;