import { useState,useRef,useEffect} from "react";
import List from './session 10/components/List';
import Search from './session 10/components/Search';
import useSemiPersistenceState from "./session 10/hooks/useSemiPersistenceState";
import InputWithlabel from "./session 10/components/InputWithlabel";
import usePrevious from "./session 10/hooks/usePrevious";



const stories = [
  {
    id: 1,
    title: "React - The Complete Guide (incl Hooks, React Router, Redux)",
    author: "Maximilian Schwarzmülller",
    hours_video: 40.5,
    number_of_lectures: 490,
    rating: 4.6,
    url: "https://codingthesmartway.com/courses/react-complete-guide/"
  },
  {
    id: 2,
    title: "Modern React with Redux",
    author: "Stephen Grider",
    hours_video: 47.5,
    number_of_lectures: 488,
    rating: 4.6,
    url: "https://codingthesmartway.com/courses/modern-react-with-redux/"
  },
  {
    id: 3,
    title: "The Complete React Developer Course (w/ Hooks and Redux)",
    author: "Andrew Mead",
    hours_video: 39,
    number_of_lectures: 200,
    rating: 4.7,
    url: "http://codingthesmartway.net/courses/complete-react-web-app-developer/"
  }
];

function App() {
  const [searchTerm,setSearchTerm] = useSemiPersistenceState(
    "customSearchTerm",
    ""
  );
    
    const [count, setCount] = useState(0); 
    

   const firstUpdate = useRef(true);
   useEffect(() => {
     if(firstUpdate.current) {
       firstUpdate.current = false;
       return;
     }
     console.log(count);
   }); 
     
   const prevCount = usePrevious(count) 
  
  const handleOnSearch = (e) => {
    setSearchTerm(e.target.value);
    localStorage.setItem("searchTerm", e.target.value)
  };

  const filteredStories = stories.filter((story) =>
     story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>List of Courses</h1>
      <div>
        <button onClick ={() => { setCount((count) => count + 1);
        }}
        >
          increment
        </button>
        <p>{count}</p>
      </div>
      <h2>Now: {count}, before: {prevCount}</h2>
      <InputWithlabel
      id="search"
      value={searchTerm}
      onInputChange={handleOnSearch}
      type="text"
      >
        <strong>Search For Stories:</strong>
        </InputWithlabel>
      <h4>Searching for:{searchTerm}</h4 >
      <List stories={filteredStories} />
    </div>
  );
}

export default App
;