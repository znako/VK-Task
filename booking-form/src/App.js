import classes from "./App.module.css";
import BookingForm from "./container/BookingForm";

function App() {
  return (
    <div className={classes.App}>
      <div className={classes.container}>
        <BookingForm />
      </div>
    </div>
  );
}

export default App;
