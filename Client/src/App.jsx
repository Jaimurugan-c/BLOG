import { BrowserRouter,Routes,Route } from "react-router-dom"
import About from "./assets/pages/About"
import Dashbord from "./assets/pages/Dashbord"
import Signin from "./assets/pages/Signin"
import Signup from "./assets/pages/Signup"
import Projects from "./assets/pages/Projects"
import Home from "./assets/pages/Home"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path= "/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/dashbord" element={<Dashbord/>} />
          <Route path="/Projects" element={<Projects/> }/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
