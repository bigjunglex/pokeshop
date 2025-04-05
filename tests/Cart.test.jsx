import { describe, it, expect, beforeEach, expectTypeOf } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Cart } from "../src/app/shop/Cart.jsx";
import { Outlet, RouterProvider, createMemoryRouter } from "react-router";
import { dummyItems } from "./dummy.js";




describe('basic cart tests', () => {
    const user = userEvent.setup()
    let mockItems = dummyItems
    const mockContext =  {cart: [mockItems, () => mockItems = []]}
    const router = createMemoryRouter([
        {
            path:'/',
            element: <Outlet context={mockContext}/>,
            children: [
                {
                    path: '/cart',
                    element: <Cart />
                }
            ]
        }
    ],
    {initialEntries:['/cart']}
    )    
    

    beforeEach(() => {
        render(<RouterProvider router={router}/>)
    })
    
    it('cart + succses', async () => {
        const total = screen.getByTestId('cart-total')
        const list = screen.getByTestId('item-list')
        const listings = screen.getAllByTestId('listing')
        const checkout = screen.getByTestId('checkout')
        
        // basic render works ok
        expect(+total.textContent.replace(/[^\d\.]/g, '')).not.toBe(0)
        expect(list).toBeInTheDocument()
        expect(listings.length).toBe(mockItems.length)
        //succes element onclick
        await user.click(checkout)
        expect(screen.getByTestId('success')).toBeInTheDocument() 
    })
})