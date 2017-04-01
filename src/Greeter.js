import React,{Component} from "react"
// import "./greet.less"
import Hi from "./Hi"
import style from "./greet.less"

class Greeter extends Component{
  render() {
    return (
      <div className={style.greet}>
        silvia,you are bdfdf
        <Hi/>
      </div>
    )
  }
}

export default Greeter
