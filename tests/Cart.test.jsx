import { describe, it, expect, beforeEach, expectTypeOf } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Cart } from "../src/app/shop/Cart.jsx";
import { Outlet, RouterProvider, createMemoryRouter } from "react-router";
import { dummyItems } from "../src/app/misc/dummy.js";


describe('basic cart tests', () => {
    const user = userEvent.setup()
    const mockItems = JSON.parse(dummyItems)
    const mockContext =  {cart: [mockItems, () => console.log(1)]}
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
        const checkout = screen.getByTestId
        
        // basic render works ok
        expect(+total.textContent.replace(/[^\d\.]/g, '')).toBe(3240.92)
        expect(list).toBeInTheDocument()
        expect(listings.length).toBe(20)

        //list clear on success + succes notification
        await user.click()
    })
})