import React, {useState, useEffect} from "react";

const Weathertoday = () => {
  const [search, setSearch] = useState("london");
  const [data, setData] = useState();
  const [input, setInput] = useState("");
  var componentMounted = true;

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=255bc7483e4339d9378081cb73e04746`);
      if(componentMounted){
        setData(await response.json());
        console.log(data);
      }
      return () => {
        componentMounted = false; 
      }
    }
    fetchWeather();
  }, [search]);

  var emoji = null;
  if(data){
    if(data.weather[0].main == "Clouds"){
      emoji = "fa-cloud"
    }else if(data.weather[0].main == "Thunderstorm"){
      emoji = "fa-bolt"
    }else if(data.weather[0].main == "Drizzle"){
      emoji = "fa-cloud-rain"
    }else if(data.weather[0].main == "Rain"){
      emoji = "fa-cloud-shower-heavy"
    }else if(data.weather[0].main == "Snow"){
      emoji = "fa-snow-flake"
    }else {
      emoji = "fa-smog"
    }
  }else {
    <div>...Loading</div>
  }

  if(data){
  var temp = (data.main.temp - 273.15).toFixed(2);
  var temp_min = (data.main.temp_min - 273.15).toFixed(2);
  var temp_max = (data.main.temp_max - 273.15).toFixed(2);
  }

  var d = new Date();
  var date = d.getDate();
  var year = d.getFullYear();
  var month = d.toLocaleString("default", {month: 'long'});
  var day = d.toLocaleString("default", {weekday: 'long'});

  var time = d.toLocaleString([],{
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })

  const handleSubmit = (event) =>{
    event.preventDefault();
    setSearch(input);
  }

  return (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div class="card text-white text-center border-0">
              {data && <img
                src={`https://source.unsplash.com/600x900/?${data.weather[0].main}`}
                class="card-img"
                alt="..."
              />}
              <div class="card-img-overlay">
                <form onSubmit={handleSubmit}>
                  <div class="input-group mb-4 w-75 mx-auto">
                    <input
                      type="Search"
                      class="form-control"
                      placeholder="Search City"
                      aria-label="Search City"
                      aria-describedby="basic-addon2"
                      name="search"
                      value={input}
                      onChange={(e)=>setInput(e.target.value)}
                      required
                    />
                    <button type="submit" class="input-group-text" id="basic-addon2">
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </form>
                <div className="bg-dark bg-opacity-50 py-3">
                {data && <h2 class="card-title">{data.name}</h2>}
                <p class="card-text lead">
                  {day}, {month} {date}, {year}
                  <br />
                  {time}
                </p>
                <hr />
                {data && <i className={`fas ${emoji} fa-4x`}></i>}
                {data && <h1 className="fw-bolder mb-5">{temp}&deg;C</h1>}
                {data && <p className="lead fw-bolder mb-0">{data.weather[0].main}</p>}
                {data && <p className="lead">{temp_min}&deg;C | {temp_max}&deg;C</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weathertoday;
