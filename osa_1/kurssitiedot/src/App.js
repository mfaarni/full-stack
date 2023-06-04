const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
    <Header course ={course.name} />
    <Content parts ={course.parts} />
    <Total parts={course.parts} />
    </div>
  )
}

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
      {props.part.name} {props.part.exercises} <br/>
    </div>
  )
}

const Content = (props) => {
  console.log("c", props)
  return(
    <div>
      <Part part={props.parts[0]}/>
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </div>
  )
}

const Total = (props) => {
  console.log("d", props)
  return(
  <div>
    <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
  </div>
  )
}

export default App