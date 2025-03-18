const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = (props) => {
  return <h1>{props.course.name}</h1>
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0]} exercises={props.parts[0]} />
      <Part part={props.parts[1]} exercises={props.parts[1]} />
      <Part part={props.parts[2]} exercises={props.parts[2]} />
    </div>
  )
}

const Part = (props) => {
  return (
    <h3>
      {props.part.name}, {props.exercises.exercises}
    </h3>
  )
}

const Total = (props) => {
  return (
    <h1>
      Total:
      {props.parts[0].exercises +
        props.parts[1].exercises +
        props.parts[2].exercises}
    </h1>
  )
}

export default App
