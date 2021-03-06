import React, {Component} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'


class EditExercise extends Component {
     constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.select = React.createRef();

        this.state = {
                 username:'',
                 description : '',
                 duration: 0,
                 date:new Date(),
                 users: [],
                 editUsername : true,
                 editableUserName: this.username
             }
         }
    
   componentDidMount(){
        axios.get('http://localhost:5000/exercises/'+this.props.match.params.id)
            .then(responce => {
                this.setState({
                    username: responce.data.username,
                    description: responce.data.description,
                    duration:responce.data.duration,
                    date: new Date(responce.data.date)
                })
            })
            .catch((error) =>{
                console.log(error)
            })


        axios.get('http://localhost:5000/exercises/')   
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

    onChangeDescription(e){
         this.setState({
            description: e.target.value
        }); 
    } 

    onChangeDuration(e){
        this.setState({
            duration: e.target.value
        });
    }

    onChangeDate(date){
        this.setState({
            date: date
        })
    }

    onSubmit(e){
        e.preventDefault();

        const exercise  = { 
            username : this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise);

        axios.post('http://localhost:5000/exercises/update/'+this.props.match.params.id, exercise)
            .then(res => console.log(res.data));

        window.location ='/';
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
                            {this.state.editUsername ?
                            <div className="form-group">
                                <label>Edit Username: </label>
                                <input  type="text"
                                        required
                                        className="form-control"
                                        value={this.state.editableUserName}
                                        onChange={this.onChangeUsername}
                                />
                                
                                <button onClick= {this.onChangeusername} 
                                        className="btn btn-primary">
                                    Save Username
                                </button>
                            </div> 
                            :
                            null   
                        }
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input  type="text"
                                required
                                className="form-control"
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                                />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.duration}
                                onChange={this.onChangeDuration}
                                />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}

export default EditExercise;