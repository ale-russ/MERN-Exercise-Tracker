import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';


const Users = props =>(
    <tr>
        <td>{props.users._id}</td>
        <td>{props.users.username} </td>
        <td>{props.users.createdAt.substring(0,10)} </td>
        <td>{props.users.updatedAt.substring(0,10)}</td>
        <td>
            <Link to={"/edituser/"+props.users._id}>edit</Link> | 
            <a href="#" onClick={() => {props.deleteUser(props.users._id) }}> delete </a>
        </td>
    </tr>
)

class UserList extends Component {
    constructor(props) {
      super(props);
  
      this.deleteUser = this.deleteUser.bind(this)
  
      this.state = {users: []};
    }

    componentDidMount(){
        axios.get('http://localhost:5000/users/')
            .then(response =>{
                this.setState({users: response.data})
            })
            .catch((error) =>{
                console.log(error);
            })
    }

    deleteUser(id){
        axios.delete('http://localhost:5000/users/'+id)
            .then(response => console.log(response.data));
        this.setState({
            users: this.state.users.filter(el => el._id !== id)
        })
    }

    userList(){
        return this.state.users.map(currentuser => {
            return <Users users={currentuser} deleteUser={this.deleteUser} key={currentuser._id}/>;
        },)
    } 

    render() { 
        return ( 
            <div>
               <h3>List Of Users</h3>
               <table className="table">
                   <thead className="thead-light">
                       <tr>
                           <th>UserId</th>
                           <th>Username</th>
                           <th>createdAt</th>
                           <th>updatedAt</th>
                           <th>Actions</th>
                       </tr>
                   </thead>
                   <tbody>
                       { this.userList() }
                   </tbody>
               </table>
            </div>
         );
    }
}
 
export default UserList;
