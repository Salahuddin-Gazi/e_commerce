import React from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import CartItem from "./CartItem/CartItem";

const Cart = ({
  cart,
  handleUpdateCartQty,
  handleRemoveFromCart,
  handleEmptyCart,
}) => {
  //   const isEmpty = !(cart.line_items && cart.line_items.length);

  const classes = useStyles();
  const EmptyCart = () => (
    <Typography variant="subtitle1">
      You Have No Items In Your Shopping Cart,
      <Link to="/" className={classes.link}>
        Start Adding Some
      </Link>
      !
    </Typography>
  );

  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <CartItem
              item={item}
              onUpdateCartQty={handleUpdateCartQty}
              onRemoveFromCart={handleRemoveFromCart}
            />
            {/* <div>{item.name}</div> */}
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h5">
          Subtotal: {cart.subtotal.formatted_with_symbol}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={handleEmptyCart}
          >
            Empty Cart
          </Button>
          <Button
            component={Link}
            to="/checkout"
            className={classes.checkoutButton}
            size="large"
            type="button"
            variant="contained"
            color="primary"
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );

  if (!cart.line_items) return "Loading ...";

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} gutterBottom>
        <Typography variant="h4">Your Shopping Cart</Typography>
        {/* {isEmpty ? <EmptyCart /> : <FilledCart />} */}
        <Typography variant="h7">
          {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
        </Typography>
      </Typography>
    </Container>
  );
};

export default Cart;
