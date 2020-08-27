import React, {Component} from 'react';
import axios from 'axios';
//import DatePicker from 'react-datepicker';
//import 'react-datepicker/dist/react-datepicker.css'


class EditUser extends Component {
     constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.select = React.createRef();

        this.state = {
                 username:'',
                 users: []
             }
         }
    
   componentDidMount(){
        axios.get('http://localhost:5000/users/'+this.props.match.params.id)
            .then(responce => {
                this.setState({
                    username: responce.data.usename,
                })
            })
            .catch((error) =>{
                console.log(error)
            })


        axios.get('http://localhost:5000/users/')   
            .then(responce => {
                if(responce.data.length > 0){
                    this.setState({
                        users: responce.data.map(user =>user.username),
                        
                    });
                }
            })
    }
    
    onChangeUsername(e){
        this.setState({
            username: e.target.value
        }); 
    }

    onSubmit(e){
        e.preventDefault();

        const exercise  = { 
            username : this.state.username,
        }

        console.log(exercise);
        axios.post('http://localhost:5000/users/update'+this.props.match.params.id, exercise)
            .then(res => console.log(res.data));

        //window.location ='/';
    }

    
    render() { 
        return (  
            <div>
                <h3>Edit Exercise Log</h3>
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
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Edit User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}

export default EditUser;