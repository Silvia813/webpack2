import React,{Component} from "react"
import style from "./greet.less"

class Greeter extends Component{
  render() {
    return (
      <div className={style.greet}>
        silvia,you are
      </div>
    )
  }
}

export default Greeter
