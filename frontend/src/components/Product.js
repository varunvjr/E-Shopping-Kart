import React from 'react'
import {Card} from "react-bootstrap";
import Rating from "./Rating";
import {Link} from 'react-router-dom';
const Product = ({product}) => {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/product/${product.id}`}>
                <Card.Img src={product.image} variant='top'/>
            </Link>
            <Card.Body>
            <Link to={`/product/${product.id}`}>
                <Card.Title as="div"><strong>{product.name}</strong></Card.Title>
             </Link>
             <Card.Title as="h6">
             <Rating 
                value={product.rating} 
                text={product.reviews+" reviews"}
                />
             </Card.Title>
             <Card.Title as="div"><i className="fas fa-dollar-sign"></i><strong>{product.price}/-</strong></Card.Title>
            </Card.Body>
        </Card>
    )
}


export default Product;