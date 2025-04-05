import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Shop } from "../src/app/shop/Shop.jsx";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider, Outlet} from "react-router";
import { dummyItems } from "./dummy.js";

describe('shop ---', () => {
    const testItem = dummyItems[0]
    const mockContext = {shop: {items: [testItem], isLoading: false}, cart: [[], () => console.log(1)]}
    const user = userEvent.setup();
    const router = createMemoryRouter([
        {
            path: '/',
            element: (
                <Outlet context={mockContext}/>
            ),
            children: [
                {
                    path:'/shop',
                    element: <Shop />
                }
            ]
        },
    ], 
    {initialEntries: ['/shop']}
    );
    
    beforeEach(() => {
        render(<RouterProvider router={router}/>)
    })
    

    it('render shop + 1 card', () => {
        expect(screen.getByTestId('shop')).toBeInTheDocument()
        expect(screen.getByTestId('item-card')).toBeInTheDocument()
        expect(screen.getAllByTestId('item-card').length).toBe(1)
    })

    it('add btn disabled on wrong amount', async () => {
        const input = screen.getByTestId('item-input')
        const btn = screen.getByTestId('item-btn')
        //starting value = 1 + add btn enabled
        expect(+input.value).toBe(1)
        expect(btn).toBeEnabled()

        // max value
        await user.type(input, '0')
        expect(+input.value).toBe(10)
        expect(btn).toBeEnabled()
    
        //invalid input
        await user.type(input, 'asdasdasdasd')
        expect(+input.value).toBe(10)
        expect(btn).toBeEnabled()

        // disbale btn
        await user.type(input, '123')
        expect(btn).toBeDisabled()
    })
})