import React, {useState, useEffect} from 'react';
import './index.css';
import Nav from "./Components/Nav";
import Footer from './Components/Footer';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './Pages/Home';
import Books from './Pages/Books';
import { books } from './data';
import Booksinfo from './Pages/BooksInfo';
import Cart from './Pages/Cart';

function App() {
  const [cart, setCart] = useState([]);

  function addToCart(book){
    setCart ([...cart, {...book, quantity: 1}])
  }

  function changeQuantity(book, quantity){
    setCart(cart.map(item =>{
      if (item.id === book.id){
        return{
          ...item, 
          quantity: +quantity,
        }
      }
      else{
        return item
      }
    }))
  }

  function removeItem(item){
    setCart(cart.filter(book => book.id !== item.id))
  }

  function numberOfItems(){
    let counter =0;
    cart.forEach(item =>{
      counter += item.quantity
    })
    return counter
  }

  useEffect(() => {
    console.log(cart)
  }, [cart])

  return (
    <Router>
      <div className="App">
        <Nav numberOfItems={numberOfItems()}/>
        <Route path="/" exact component={Home}/>
        <Route path="/books" exact render={() => <Books books={books}/>}/>
        <Route path="/books/:id" render={() => <Booksinfo books={books} addToCart={addToCart} cart={cart}/>}/>
        <Route path="/cart" render={() => <Cart books={books} cart={cart} changeQuantity={changeQuantity} removeItem={removeItem}/>}/>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
