import React, {useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";


export const AddMovieForm = props => {
    const nav = useNavigate();
    const {setMovies} = props;
    const [formValues, setFormValues] = useState({
        title: '',
        director: '',
        genre: '',
        metascore: 0,
        description: '',
    })

    const handleChange = e => {
        const {name, value} = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios.post('http://localhost:9000/api/movies', formValues)
            .then(res => {
                setMovies(res.data)
                nav('/movies');
            })
            .catch(err => console.log(err));
    }
    
    const {title, director, genre, metascore, description} = formValues;
    
    return (
        <div className="col">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h4 className="modal-title">Add a movie!</h4>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Title</label>
                  <input value={title} onChange={handleChange} name="title" type="text" className="form-control" />
                </div>
                <div className="form-group">
                  <label>Director</label>
                  <input value={director} onChange={handleChange} name="director" type="text" className="form-control" />
                </div>
                <div className="form-group">
                  <label>Genre</label>
                  <input value={genre} onChange={handleChange} name="genre" type="text" className="form-control" />
                </div>
                <div className="form-group">
                  <label>Metascore</label>
                  <input value={metascore} onChange={handleChange} name="metascore" type="number" className="form-control" />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea value={description} onChange={handleChange} name="description" className="form-control"></textarea>
                </div>
    
              </div>
              <div className="modal-footer">
                <input type="submit" className="btn btn-info" value="Add movie" />
                <Link to={`/movies`}><input type="button" className="btn btn-default" value="Cancel" /></Link>
              </div>
            </form>
          </div>
        </div>
    );
}
