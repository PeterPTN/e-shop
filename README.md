# For The Boys - Menswear - e-Commerce App

## Requirements / Purpose
A React SPA made with Vite/React+Typescript with CRUD functionality using Google's Firebase Firestore. Styled with SASS. Images pulled from Unsplash and Pexels (royalty free).

Check it out here: https://menswear-ftb.netlify.app/

## Approach / Justification
When I tackled this project I knew what I wanted to do in broad strokes. Although I'm proud of what I managed to make in a week there are some things I need to improve on: 
- Feature creep, as I completed more and more features I ended up WANTING to make more and more features without strong consideration as to how it all should relate
- Staying within a scope and/or taking a step back to revise plans; at the time I was driven to complete this project under a self-imposed deadline, so I didn't take a good wide view as often as I should to carefully reflect on where the codebase was going

## In Hindsight... 
The database design could be better. My senior suggested that I create a new collection for the cart system which made a lot of sense. But because of the way it's set up there is some inefficient filter logic. For example it must filter all products available across database to see what's in the cart rather than simply fetching items that are in a cart collection. 

Currently the inefficiency is inconsequential because of the amount of available products but I definitely wouldn't do this for a proper production website.

- - -
The code is tightly coupled which makes implementing test suites difficult without some refactoring. If I had to do it again I would put a lot more consideration into planning my files, ensuring good seperation of concerns and therefore testable code (for unit tests). 

## Features
### Cart:
- Increment and decrement product quantities - with checks to prevent increments over stock values and warnings to remove item if under 1
- Remove product
- Calculate unit price, line price and total cost
- Number of items in cart is tracked and displayed

### Favourite:
- Simple toggle to add or remove product from favourites

### Product filters:
- Defaults to display "all", it can be changed to either "tops" or "bottoms"
- Can be sorted by lowest or highest price
- Can be filtered by a single color
- Can be filered by a single size
- All 4 filters aggregate

### Product view:
- Users can only add based on stock levels
- Option to click on related product (same product different color)
- On click event to change photo                                            
