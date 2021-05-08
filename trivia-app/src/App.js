import axios from 'axios';
import React, { useState } from 'react';


const initialValues = {
  numberOfQuestions: '',
  category: '',
  difficulty: '',
  multipleChoice: false,
  trueFalse: false

}
function App() {
  const [ formValues, setFormValues ] = useState(initialValues);

  const questionType = () => {
    if(formValues.multipleChoice && !formValues.trueFalse) {
      return('&type=multiple');
    } else if (formValues.trueFalse && !formValues.multipleChoice) {
      return('&type=boolean');
    } else {
      return('');
    }
  }



  const handleChange = (evt) => {
    const { name, value, type, checked } = evt.target;
    const inputValue = type === 'checkbox' ? checked : value
    setFormValues({...formValues, [name]: inputValue});
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    axios.get(`https://opentdb.com/api.php?amount=${formValues.numberOfQuestions}&category=${formValues.category}&difficulty=${formValues.difficulty}${questionType()}`)  
      .then(res => {
        console.log(res.data.results);
        // setFormValues(initialValues);
      })
      .catch(err => {
      })
  }

  return (
    <div className="App">
      <nav>
      </nav>
      <h1>Trivia game</h1>
      <form onSubmit={handleSubmit}>
        <label> 
          <input 
            type='text'
            name='numberOfQuestions'
            value={formValues.numberOfQuestions}
            onChange={handleChange} 
            placeholder='number of questions' 
          />
        </label>

        <label>
          <select name='category' onChange={handleChange} value={formValues.category}>
            <option>Pick a category</option>
            <option value='21'>Sports</option>
            <option value='22'>Geography</option>
            <option value='23'>History</option>
          </select>
        </label>

        <label>
          <input 
            type='radio'
            name='difficulty'
            value='easy'
            checked={formValues.difficulty === 'easy'}
            onChange={handleChange}
          />
          Easy
        </label>
        <label>
          <input 
            type='radio'
            name='difficulty'
            value='medium'
            checked={formValues.difficulty === 'medium'}
            onChange={handleChange}
          />
          Medium
        </label>
        <label>
          <input 
            type='radio'
            name='difficulty'
            value='hard'
            checked={formValues.difficulty === 'hard'}
            onChange={handleChange}
          />
          Hard
        </label>

        <label>
          <input 
            type='checkbox'
            name='multipleChoice'
            checked={formValues.multipleChoice}
            onChange={handleChange}
          />
          Multiple Choice
        </label>

        <label>
          <input 
            type='checkbox'
            name='trueFalse'
            checked={formValues.trueFalse}
            onChange={handleChange}
          />
          True/False
        </label>

        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
