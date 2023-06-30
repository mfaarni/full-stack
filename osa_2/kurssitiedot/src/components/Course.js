const Header = (props) => {
    console.log("A", props)
  return(
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}
  
const Part = (props) => {
    console.log("b", props)
    return(
    <div>
        {props.parts.name} {props.parts.exercises} <br/>
    </div>
    )
}
  
const Content = (props) => {
    const courses1 = props.parts
  return(
    <div>
      {courses1.map(course =>
        <Part key = {course.id} parts ={course}/>
      )}
    </div>
  )
}

const Total = ({parts}) =>{
    const exes = parts.map(part=>
        part.exercises)

    const total = exes.reduce( 
        (s, p) => s+p)
    return(
        <div>
            <b>
            {"Total of "+total+ " exercises"}
            </b>
        </div>
    )

}


const Course = ({course}) =>{
  
    return(
        <div>
          <Header course ={course.name} />
          <Content parts ={course.parts} />
          <Total parts ={course.parts} />
        </div>
    )
}

const Courses = ({courses}) =>{
    return (
        <div>
            {courses.map(course=>
                <Course course = {course}/>
            )}
        </div>
    )
}
export default Courses