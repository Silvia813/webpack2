import React,{Component} from "react"
import style from "./hi.less"

class Hi extends Component{
  render() {
    return (
      <div className={style.greet}>
        this is Hi
      </div>
    )
  }
}

export default Hi
