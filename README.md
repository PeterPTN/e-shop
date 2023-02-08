# For The Boys - Menswear - e-Commerce App

A React SPA made with Vite/React+Typescript. 

Check it out here: https://menswear-ftb.netlify.app/

(Styling and cleanup/refactoring underway).

## Functionalities
Cart:
- increment and decrement product quantities - with checks to prevent increments over stock values and warnings to remove item if under 1.
- remove product
- calculate unit price, line price and total cost
- checkout is a dummy button
- number of items in cart is tracked and displayed

Favourite:
- bool values exist in database
- simple toggle to add or remove

Product filters:
- defaults to display "all", it can be changed to either "tops" or "bottoms"
- can be sorted by lowest or highest price
- can be filtered by a single color
- can be filered by a single size
- all 4 filters aggregate

Product view:
- users can only add based on stock levels
- option to click on related product (same product different color)
- on click event to change photo                                               
